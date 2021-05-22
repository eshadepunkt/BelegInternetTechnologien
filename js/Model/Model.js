"use strict";
class Model {
  constructor() {
    this.loadTasks();
    this.currentTask = null;
    this.currentTaskType = null;
    this.serverTaskCount = 0;
  }

  loadTasks() {
    this.tasks = {
      "teil-mathe": [
        {t:"x^2+x^2\\enspace=\\enspace?", a:["2x^2","x^4","x^8","2x^4"]},
        {t:"x^2*x^2\\enspace=\\enspace?", a:["x^4","x^2","2x^2","4x"]},
        {t:"\\frac{d}{dx} x^2\\enspace=\\enspace?", a:["2x", "2", "4", "x^3"]},

      ],

      "teil-internettechnologien": [
        {t:"Welche Authentifizierung bietet HTTP?", a:["Digest Access Authentication","OTP","OAuth","2-Faktor-Authentifizierung"]},
        {t:"Welches Transportprotokoll eignet sich für zeitkritische Übertragungen?", a:["UDP","TCP","HTTP","Fast Retransmit"]},
        {t:"Wie kann man zu einer gegebenen IP-Adresse den Domainnamen ermitteln?", a:["Reverse DNS", "DNS", "HTML", "CSS"]},

      ],

      "teil-allgemein": [
        {t:"Karl der Große, Geburtsjahr", a:["747","828","650","1150"]},

      ]
    };
  }

  getTotalTaskCount() {
    return this.tasks["teil-mathe"].length + this.tasks["teil-internettechnologien"].length + this.tasks["teil-allgemein"].length;
  }

  getTaskCount(taskType) {
    if(taskType === "server") {
      return this.serverTaskCount;
    }
    else {
      return this.tasks[taskType].length;
    }

  }

  //returns the task and removes it from the task array
  getTask(taskType, number) {
    if(taskType === "server") {
      //TODO make AJAX request to get task
    }
    else {
      let retTask = this.tasks[taskType][number];
      this.currentTask = retTask;
      this.currentTaskType = taskType;
      return retTask;
    }
  }

  checkAnswer(taskType, idx) {
    if(taskType === "server") {
      //TODO Make AJAX request to check answer
    }
    else {
      this.removeCurrentTask();
      if(idx === 0) {
        return true;
      }
      else {
        return false;
      }
    }
  }

  removeCurrentTask() {
    let idx = this.tasks[this.currentTaskType].indexOf(this.currentTask);
    this.tasks[this.currentTaskType].splice(idx,1);
  }

}
