"use strict";

class View {
  constructor(p) {
    this.p = p;
    this.setHandler();
  }

  //sets event handlers for all the buttons and the categories
  setHandler() {
    document.getElementById("buttons").addEventListener("click", this.evaluate.bind(this), false);
    document.getElementById("next").addEventListener("click", this.p.loadTask.bind(this.p), false);
    document.getElementById("end").addEventListener("click", this.p.endQuiz.bind(this.p), false);
    document.getElementById("restart").addEventListener("click", this.p.restartQuiz.bind(this.p), false);

    let taskSel = document.querySelectorAll("div#taskSelection > nav > *");
    for (let i = 0; i < taskSel.length; i++) {
      taskSel[i].addEventListener("click", this.taskTypeSelection.bind(this));
      taskSel[i].lastElementChild.setAttribute("style", "pointer-events:none");
    }
  }

  setup() {
    document.getElementById("result").setAttribute("style", "display:none");
    document.getElementById("restart").setAttribute("style", "display:none");
    document.getElementById("tasklist").innerHTML = "";

    document.getElementById("teil-mathe").setAttribute("style", "pointer-events: auto");
    document.getElementById("teil-internettechnologien").setAttribute("style", "pointer-events: auto");
    document.getElementById("teil-allgemein").setAttribute("style", "pointer-events: auto");
    document.getElementById("server").setAttribute("style", "pointer-events: auto");

    document.getElementById("teil-mathe").innerHTML = "<i class=\"fas fa-calculator\"></i> Mathematik";
    document.getElementById("teil-internettechnologien").innerHTML = "<i class=\"fas fa-network-wired\"></i> Internettechnologien";
    document.getElementById("teil-allgemein").innerHTML = "<i class=\"fas fa-university\"></i> Allgemein";
    document.getElementById("server").innerHTML = "<i class=\"fas fa-server\"></i> Remote";

    document.getElementById("teil-mathe").classList.remove("finishedCategory");
    document.getElementById("teil-internettechnologien").classList.remove("finishedCategory");
    document.getElementById("teil-allgemein").classList.remove("finishedCategory");
    document.getElementById("server").classList.remove("finishedCategory");

    document.getElementById(this.p.getTaskType()).classList.add("selectCategory");
  }

  displayTask(title, number, task, a1, a2, a3, a4) {
    let taskString, a1String, a2String, a3String, a4String;
    if (this.p.getTaskType() === "teil-mathe") {
      taskString = katex.renderToString(task);
      a1String = katex.renderToString(a1);
      a2String = katex.renderToString(a2);
      a3String = katex.renderToString(a3);
      a4String = katex.renderToString(a4);
    } else {
      taskString = task;
      a1String = a1;
      a2String = a2;
      a3String = a3;
      a4String = a4;
    }

    document.getElementById("result").setAttribute("style", "display:none");
    document.getElementById("buttons").setAttribute("style", "display:inline");

    document.getElementById("button1").setAttribute("answer", a1);
    document.getElementById("button2").setAttribute("answer", a2);
    document.getElementById("button3").setAttribute("answer", a3);
    document.getElementById("button4").setAttribute("answer", a4);

    this.removeListItemSelection();

    //if the last question was not answered (e.g. because the category was switched), remove the task from the tasklist
    if (document.getElementById("tasklist").lastElementChild != null) {
      if (document.getElementById("tasklist").lastElementChild.attributes.getNamedItem("solved").value === "false") {
        document.getElementById("tasklist").lastElementChild.remove();
      }
    }

    //append the new task to the tasklist
    let listitem = document.createElement("UL");
    listitem.innerHTML = title;
    listitem.setAttribute("solved", "false");
    listitem.setAttribute("number", number.toString());
    listitem.setAttribute("style", "pointer-events:none");
    listitem.classList.add("selectCategory");
    document.getElementById("tasklist").appendChild(listitem);

    document.getElementById("tasks").innerHTML = taskString;
    document.getElementById("button1").innerHTML = a1String;
    document.getElementById("button2").innerHTML = a2String;
    document.getElementById("button3").innerHTML = a3String;
    document.getElementById("button4").innerHTML = a4String;

    //remove pointer events from button content (not the buttons itself) so that e.g. KaTeX spans are not clickable
    let elems = document.querySelectorAll("div#buttons > button > *");
    for (let i = 0; i < elems.length; i++) {
      elems[i].setAttribute("style", "pointer-events: none");
    }
  }

  displayPrevTask(task) {
    let taskString, answerString;
    if (task["type"] === "teil-mathe") {
      taskString = katex.renderToString(task["task"]["t"]);
      answerString = katex.renderToString("\\enspace" + task["answer"]);
    } else {
      taskString = task["task"]["t"];
      answerString = task["answer"];
    }

    if (document.getElementById("tasklist").lastElementChild != null) {
      if (document.getElementById("tasklist").lastElementChild.attributes.getNamedItem("solved").value === "false") {
        document.getElementById("tasklist").lastElementChild.remove();
      }
    }

    document.getElementById("result").setAttribute("style", "display:none");
    document.getElementById("buttons").setAttribute("style", "display:none");
    document.getElementById(this.p.getTaskType()).classList.remove("selectCategory");

    this.removeListItemSelection();
    let item = document.querySelectorAll("ul[number = \"" + this.p.getSelectedListElement().toString() + "\"]"); //get the specific tasklist element of the task
    item[0].classList.add("selectCategory");

    document.getElementById("tasks").innerHTML = taskString + " <br> " + "Die gegebene Antwort war: " + " <br> " + answerString;
  }

  evaluate(event) {
    if (event.target.nodeName.toLowerCase() === "button") {
      this.p.evaluate(event.target.attributes.getNamedItem("answer").value);

      //disable button for 0.5 seconds so you can't click it again while the answer gets evaluated (asynchronously)
      event.target.disabled = true;
      setTimeout(function () {
        event.target.disabled = false;
      }, 500);
    }
  }

  displayResultScreen(resultText, result, finalTask) {
    document.getElementById("buttons").setAttribute("style", "display:none");
    document.getElementById("result").setAttribute("style", "display:inline");
    document.getElementById("tasks").innerHTML = resultText;
    if (result) {
      document.getElementById("tasklist").lastElementChild.innerHTML += " <i class=\"fas fa-check-circle\"></i>";
    }
    document.getElementById("tasklist").lastElementChild.setAttribute("solved", "true");
    document.getElementById("tasklist").lastElementChild.setAttribute("style", "pointer-events:auto");
    document.getElementById("tasklist").lastElementChild.addEventListener("click", this.p.loadPrevTask.bind(this.p));

    if (finalTask) {
      document.getElementById("next").setAttribute("style", "display:none");
      document.getElementById("tasks").innerHTML += "  Anderes Thema wählen oder";
    }

  }

  displayEndScreen(solved, correct, percent) {
    document.getElementById("teil-mathe").setAttribute("style", "pointer-events: none");
    document.getElementById("teil-internettechnologien").setAttribute("style", "pointer-events: none");
    document.getElementById("teil-allgemein").setAttribute("style", "pointer-events: none");
    document.getElementById("server").setAttribute("style", "pointer-events: none");
    document.getElementById(this.p.getTaskType()).classList.remove("selectCategory");

    document.getElementById("result").setAttribute("style", "display:none");
    document.getElementById("tasks").innerHTML = "Quiz beendet! Herzlichen Glückwunsch! Du hast " + correct + " von " + solved + " Aufgaben richtig beantwortet! " +
      "Das sind " + percent + " %";

    document.getElementById("restart").setAttribute("style", "display:inline");
  }

  //select a different category
  taskTypeSelection(event) {
    document.getElementById("next").setAttribute("style", "display:inline");

    document.getElementById(this.p.getTaskType()).classList.remove("selectCategory");
    event.target.classList.add("selectCategory");
    this.p.changeTaskType(event.target.id);
  }

  //disable a category
  closeTaskType(taskType) {
    document.getElementById(taskType).innerHTML += " <i class=\"fas fa-check-circle\"></i>";
    document.getElementById(taskType).classList.remove("selectCategory");
    document.getElementById(taskType).classList.add("finishedCategory");
    document.getElementById(taskType).setAttribute("style", "pointer-events: none");
  }

  removeListItemSelection() {
    let items = document.querySelectorAll("nav#tasklist > *");
    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove("selectCategory");
    }
  }
}
