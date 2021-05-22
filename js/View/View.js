"use strict";
class View {
  constructor(p) {
    this.p = p;
    this.setHandler();
  }

  setHandler() {
    document.getElementById("buttons").addEventListener("click", this.evaluate.bind(this), false);
    document.getElementById("next").addEventListener("click", this.p.loadTask.bind(this.p), false);
    document.getElementById("end").addEventListener("click", this.p.endQuiz.bind(this.p), false);

    let taskSel = document.querySelectorAll("div#taskSelection > nav > *");
    for (let i = 0; i < taskSel.length; i++) {
      taskSel[i].addEventListener("click", this.taskTypeSelection.bind(this));
    }

  }

  setup() {
    document.getElementById("result").setAttribute("style","display:none");
    document.getElementById(this.p.getTaskType()).classList.add("selectCategory");
  }

  displayTask (task, a1, a2, a3, a4) {
    let taskString, a1String, a2String, a3String, a4String;
    if(this.p.getTaskType() === "teil-mathe") {
      taskString = katex.renderToString(task);
      a1String = katex.renderToString(a1);
      a2String = katex.renderToString(a2);
      a3String = katex.renderToString(a3);
      a4String = katex.renderToString(a4);
    }
    else {
      taskString = task;
      a1String = a1;
      a2String = a2;
      a3String = a3;
      a4String = a4;
    }

    document.getElementById("result").setAttribute("style","display:none");
    document.getElementById("buttons").setAttribute("style","display:inline");

    document.getElementById("button1").setAttribute("answer", a1);
    document.getElementById("button2").setAttribute("answer", a2);
    document.getElementById("button3").setAttribute("answer", a3);
    document.getElementById("button4").setAttribute("answer", a4);

    document.getElementById("tasks").innerHTML = taskString;
    document.getElementById("button1").innerHTML = a1String;
    document.getElementById("button2").innerHTML = a2String;
    document.getElementById("button3").innerHTML = a3String;
    document.getElementById("button4").innerHTML = a4String;

    let elems = document.querySelectorAll("div#buttons > button > *");
    for(let i = 0; i < elems.length; i++) {
      elems[i].setAttribute("style", "pointer-events: none");
    }
  }

  evaluate(event) {
    console.log("View -> Evaluate: " + event.type + " " + event.target.nodeName);
    if (event.target.nodeName.toLowerCase() === "button") {
      this.p.evaluate(event.target.attributes.getNamedItem("answer").value);
    }
  }

  displayResultScreen(result, finalTask) {
    document.getElementById("buttons").setAttribute("style","display:none");
    document.getElementById("result").setAttribute("style","display:inline");
    document.getElementById("tasks").innerHTML = result;
    if(finalTask) {
      document.getElementById("next").setAttribute("style", "display:none");
      document.getElementById("tasks").innerHTML += "  Anderes Thema wählen oder";
    }

  }

  displayEndScreen(total, solved, correct, percent) {
    document.getElementById("teil-mathe").setAttribute("style","pointer-events: none");
    document.getElementById("teil-internettechnologien").setAttribute("style","pointer-events: none");
    document.getElementById("teil-allgemein").setAttribute("style","pointer-events: none");
    document.getElementById(this.p.getTaskType()).classList.remove("selectCategory");

    document.getElementById("result").setAttribute("style","display:none");
    document.getElementById("tasks").innerHTML = "Quiz beendet! Herzlichen Glückwunsch! Du hast " + correct + " von " + solved + " Aufgaben richtig beantwortet! " +
    "Das sind " + percent + " %";

  }


  //TODO Change Task selection to work properly
  taskTypeSelection(event) {
    document.getElementById("next").setAttribute("style", "display:inline");

    console.log("View -> Task Selection: " + event.target.id);
    document.getElementById(this.p.getTaskType()).classList.remove("selectCategory");
    event.target.classList.add("selectCategory");
    this.p.changeTaskType(event.target.id);
  }

  closeTaskType(taskType) {
    document.getElementById(taskType).innerHTML += " <i class=\"fas fa-check-circle\"></i>";
    document.getElementById(taskType).classList.remove("selectCategory");
    document.getElementById(taskType).classList.add("finishedCategory");
    document.getElementById(taskType).setAttribute("style","pointer-events: none");
  }

}
