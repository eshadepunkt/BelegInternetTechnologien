"use strict";
class Model {
  constructor() {
    this.loadTasks();
    this.currentTask = null;
    this.currentTaskType = null;
    this.serverTaskCount = 0;
    this.serverTaskIDs = ["3284"];
  }

  loadTasks() {
    this.tasks = {
      "teil-mathe": [
        {title: "Potenzgesetze", t:"x^2+x^2\\enspace=\\enspace?", a:["2x^2","x^4","x^8","2x^4"]},
        {title: "Potenzgesetze", t:"x^2*x^2\\enspace=\\enspace?", a:["x^4","x^2","2x^2","4x"]},
        {title: "Ableitung", t:"\\frac{d}{dx} x^2\\enspace=\\enspace?", a:["2x", "2", "4", "x^3"]},

      ],

      "teil-internettechnologien": [
        {title: "HTTP", t:"Welche Authentifizierung bietet HTTP?", a:["Digest Access Authentication","OTP","OAuth","2-Faktor-Authentifizierung"]},
        {title: "Protokolle", t:"Welches Transportprotokoll eignet sich für zeitkritische Übertragungen?", a:["UDP","TCP","HTTP","Fast Retransmit"]},
        {title: "Protokolle", t:"Wie kann man zu einer gegebenen IP-Adresse den Domainnamen ermitteln?", a:["Reverse DNS", "DNS", "HTML", "CSS"]},
        //{title: "", t:"", a:["","","",""]},
        //{title: "", t:"", a:["","","",""]},
      ],

      "teil-allgemein": [
        {title: "Geschichte", t:"Wann wurde Karl der Große geboren?", a:["747","828","650","1150"]},
        {title: "Geografie", t:"Wie heißt die Hauptstadt Deutschlands?", a:["Berlin","München","London","Bonn"]},
        {title: "Medizin", t:"Wie viele Zähne hat ein erwachsener Mensch normalerweise?", a:["32","26","30","36"]},
        {title: "Politik", t:"Wer wählt den Bundespräsidenten?", a:["Bundesversammlung","Bundesrat","Bundestag","Bundekanzler"]},
        {title: "Politik", t:"Welches Land ist kein ständiges Mitglied im Sicherheitsrat der Vereinten Nationen?", a:["Deutschland","USA","Russland","China"]},
        {title: "Geografie", t:"Wie heißt die Hauptstadt von Sachsen?", a:["Dresden","Leipzig","Berlin","Erfurt"]},
        {title: "Geschichte", t:"Was soll Cäsar gesagt haben, als er den Rubikon überquerte?", a:["alea iacta est","et tu, brute","divivde et empera","veni, vidi, vici"]},
        {title: "Kultur", t:"Wie viele Oscars gewann der Film \"Titanic\"?", a:["11","10","12","14"]},
        {title: "Geografie", t:"Teneriffa, Gran Canaria und Fuerteventura gehören zu den...?", a:["Kanarischen Inseln","Balearen","Karibischen Inseln","Azoren"]},
        {title: "Politik", t:"Wie beginnt Artikel 1 des deutschen Grundgesetzes?", a:["\"Die Würde des Menschen ist unantastbar.\"","\"Alle Menschen sind vor dem Gesetz gleich.\"","\"Jeder hat das Recht auf die freie Entfaltung seiner Persönlichkeit.\"","\"Jeder hat das Recht, seine Meinung in Wort, Schrift und Bild frei zu äußern.\""]},
        {title: "Geschichte", t:"Wer gilt als Verfasser der amerikanischen Unabhhängigkeitserklärung?", a:["Thomas Jefferson","Benjamin Franklin","George Washington","John Adams"]},
        {title: "Kultur", t:"Welche Adresse ist mit Sherlock Holmes verbunden?", a:["221b Baker Street","Downing Street 10","Abbey Road 42","Princess Street 7"]},
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

  //returns the task
  async getTask(taskType, number) {
    if(taskType === "server") {
      console.log(number);
      let headers = new Headers();
      headers.append("Authorization", "Basic " + btoa("s80476@htw-dresden.de:IT1BelegPWD"));
      let response = await fetch("https://irene.informatik.htw-dresden.de:8888/api/quizzes/" + this.serverTaskIDs[number], {
        method: "GET",
        headers: headers
      })
      console.log(response);
      let task = await response.json();
      console.log(task);
      task = {title: task["title"], t: task["text"], a: task["options"]};
      return task;
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
