"use strict";
class Presenter {
  constructor() {
    this.currentTaskType = null;
    this.currentTask = null;
  }

  setModelAndView(m, v) {
    this.m = m;
    this.v = v;
  }

  start() {
    this.currentTaskType = "teil-mathe";
    this.loadTask();
    this.v.setup();
  }

  getTaskType() {
    return this.currentTaskType;
  }

  loadTask() {
    let task = this.getNextTask();
    this.currentTask = task;

    let answers = [0,1,2,3];
    let a1 = task["a"][answers.splice(this.getRandomInt(3),1)];
    let a2 = task["a"][answers.splice(this.getRandomInt(2),1)];
    let a3 = task["a"][answers.splice(this.getRandomInt(1),1)];
    let a4 = task["a"][answers[0]];

    this.v.displayTask(task["t"], a1, a2, a3, a4);
  }

  //TODO evaluating the answer and changing progress
  evaluate(answer) {
    console.log("Presenter -> Antwort: " + answer);
    let answerIdx = this.currentTask["a"].indexOf(answer);
    if(this.m.checkAnswer(this.currentTaskType, answerIdx)) {
      console.log("correct");
      this.v.displayResultScreen("Richtig! :)");
    }
    else {
      console.log("wrong");
      this.v.displayResultScreen("Falsch! :(");
    }
  }

  changeTaskType (taskType) {
    this.currentTaskType = taskType;
    this.loadTask();
  }


  //returns a random task from the current type
  getNextTask() {
    console.log("Presenter -> nächste Aufgabe: " + this.currentTaskType);

    let taskCount = this.m.getTaskCount(this.currentTaskType);
    let randTask = this.getRandomInt(taskCount - 1);
    return this.m.getTask(this.currentTaskType, randTask);
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * (max + 1));
  }

  //TODO keeping track of progress and statistics

  //TODO making AJAX-Request to Server and get a task

}
