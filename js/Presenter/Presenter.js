"use strict";
class Presenter {
  constructor() {
    this.currentTaskType = null;
    this.currentTask = null;
    this.start();
  }

  setModelAndView(m, v) {
    this.m = m;
    this.v = v;
  }

  getTaskType() {
    return this.currentTaskType;
  }

  start() {
    this.currentTaskType = "teil-mathe";
    this.currentTask = this.getNextTask();
    //TODO displaying task in the view
  }

  //TODO evaluating the answer and changing progress
  evaluate(answer) {
    console.log("Presenter -> Antwort: " + answer);
  }

  //returns a random task from the current type
  getNextTask() {
    console.log("Presenter -> nächste Aufgabe: " + this.currentTaskType);

    let taskCount = this.m.getTaskCount(this.currentTaskType);
    let randTask = this.getRandomInt(taskCount);
    return this.m.getTask(this.currentTaskType,randTask);
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * (max + 1));
  }

  //TODO keeping track of progress and statistics

  //TODO making AJAX-Request to Server and get a task

}
