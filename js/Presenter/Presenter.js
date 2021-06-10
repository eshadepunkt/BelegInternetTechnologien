"use strict";

class Presenter {
  constructor() {
    this.currentTaskType = null;
    this.currentTask = null;
    this.tasksSolved = 0;
    this.tasksCorrect = 0;
    this.prevTasks = [];
    this.selectedElement = null;
  }

  getTaskType() {
    return this.currentTaskType;
  }

  getSelectedListElement() {
    return this.selectedElement;
  }

  setModelAndView(m, v) {
    this.m = m;
    this.v = v;
  }

  //sets up the quiz and loads the first task
  start() {
    this.currentTaskType = "teil-mathe";
    this.v.setup();
    this.loadTask();
  }

  async loadTask() {
    let task = await this.getNextTask();
    this.currentTask = task;

    //shuffle the answers to show them in random order
    let answers = [0, 1, 2, 3];
    let a1 = task["a"][answers.splice(this.getRandomInt(3), 1)];
    let a2 = task["a"][answers.splice(this.getRandomInt(2), 1)];
    let a3 = task["a"][answers.splice(this.getRandomInt(1), 1)];
    let a4 = task["a"][answers[0]];

    this.selectedElement = this.tasksSolved;

    let title = "Frage " + (this.tasksSolved + 1) + ": " + task["title"];
    this.v.displayTask(title, this.tasksSolved, task["t"], a1, a2, a3, a4);
  }

  loadPrevTask(event) {
    let num = parseInt(event.target.attributes.getNamedItem("number").value);
    this.selectedElement = num;
    this.v.displayPrevTask(this.prevTasks[num]);
  }

  async evaluate(answer) {
    //check, whether the task solved was the last task in that category
    let finalTask = false;
    if (this.m.getTaskCount(this.currentTaskType) === 1)
      finalTask = true;

    this.tasksSolved++;
    this.prevTasks.push({task: this.currentTask, answer: answer, type: this.currentTaskType});

    let answerIdx = this.currentTask["a"].indexOf(answer);  //this is the index at which the given answer is in the original task

    if (await this.m.checkAnswer(this.currentTaskType, answerIdx)) {
      this.tasksCorrect++;
      this.v.displayResultScreen("Richtig! ", true, finalTask);
    } else {
      this.v.displayResultScreen("Falsch! ", false, finalTask);
    }

    //if there are no more tasks in this category, we disable this category
    if (finalTask) {
      this.v.closeTaskType(this.currentTaskType);
    }

  }

  endQuiz() {
    this.v.displayEndScreen(this.tasksSolved, this.tasksCorrect, Math.round(this.tasksCorrect / this.tasksSolved * 100 * 100) / 100);
  }

  restartQuiz() {
    this.m.loadTasks();
    this.currentTaskType = null;
    this.currentTask = null;
    this.tasksSolved = 0;
    this.tasksCorrect = 0;
    this.prevTasks = [];
    this.selectedElement = null;
    p.start();
  }


  changeTaskType(taskType) {
    this.currentTaskType = taskType;
    this.loadTask();
  }

  //returns a random task from the current type
  async getNextTask() {
    let taskCount = this.m.getTaskCount(this.currentTaskType);
    let randTask = this.getRandomInt(taskCount - 1);
    return await this.m.getTask(this.currentTaskType, randTask);
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * (max + 1));
  }

}
