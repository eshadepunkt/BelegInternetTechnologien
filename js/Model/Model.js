"use strict";
class Model {
  constructor() {
    this.loadTasks();
    this.currentTask = null;
    this.currentTaskType = null;
    this.currServerTaskID = null;
  }

  loadTasks() {
    this.tasks = {
      "teil-mathe": [
        {title: "Potenzgesetze", t:"x^2+x^2\\enspace", a:["2x^2","x^4","x^8","2x^4"]},
        {title: "Potenzgesetze", t:"x^2*x^2\\enspace", a:["x^4","x^2","2x^2","4x"]},
        {title: "Potenzgesetze", t:"\\frac{x^3}{x^2}\\enspace", a:["x","x^2","x^3","1"]},
        {title: "Analysis", t:"\\frac{d}{dx} x^2\\enspace", a:["2x", "2", "4", "x^3"]},
        {title: "Analysis", t:"\\frac{d}{dx} \\sin(x)\\enspace", a:["\\cos(x)", "-\\sin(x)", "\\sin(x)", "\\pi"]},
        {title: "Wurzelrechnung", t:"\\sqrt{169} \\enspace", a:["13", "19", "9", "14"]},
        {title: "Wurzelrechnung", t:"\\sqrt{484} \\enspace", a:["22", "21", "20", "48"]},
        {title: "Potenzrechnung", t:"{16}^2 \\enspace", a:["256", "160", "162", "600"]},
        {title: "Analysis", t:"\\lim\\limits_{x\\rightarrow\\infty} x^2 \\enspace", a:["\\infty", "0", "2", "-\\infty"]},
        {title: "Analysis", t:"\\lim\\limits_{x\\rightarrow\\infty} \\frac{1}{x} \\enspace", a:["0", "\\infty", "1", "-\\infty"]},

      ],

      "teil-internettechnologien": [
        {title: "HTTP", t:"Welche Authentifizierung bietet HTTP?", a:["Digest Access Authentication","OTP","OAuth","2-Faktor-Authentifizierung"]},
        {title: "Protokolle", t:"Welches Transportprotokoll eignet sich für zeitkritische Übertragungen?", a:["UDP","TCP","HTTP","Fast Retransmit"]},
        {title: "DNS", t:"Wie kann man zu einer gegebenen IP-Adresse den Domainnamen ermitteln?", a:["Reverse DNS", "DNS", "HTML", "CSS"]},
        {title: "DNS", t:"Was ist DynDNS?", a:["Ein Alias für eine wechselnde IP-Adresse", "Ein Proxyserver", "Eine Unterdomäne", "Ein Programm zum Erstellen von Netzwerkplänen"]},
        {title: "DNS", t:"Welche Portnummern werden \"well-known ports\" genannt?", a:["0-49151", "0-1024", "80-8080", "0-32768"]},
        {title: "Crypto", t:"Welche Technologie nutzt man um Kryptowährung zu tauschen?", a:["Blockchain", "Digital Wallet", "Mining", "Token"]},
        {title: "E-Mail", t:"Welcher Standard-Port ist für SMTP laut IANA vorgesehen?", a:["25", "21", "80", "53"]},
        {title: "E-Mail", t:"Was ist das Ziel des Autocrypt-Standards?", a:["Opportunistische Verschüsselung", "Prinzipielle Vermeidung", "Selbstständige Erweiterung", "Stille Teilhabe"]},
        {title: "Sockets", t:"Wie erfolgt bei den Root-DNS-Servern die Lastverteilung?", a:["Anycast", "Unicast", "Broadcast", "Multicast"]},
        {title: "Javascript", t:"Was ist \"Bubbling\"?", a:["Eine Art der Ereignisausbreitung", "Ein Entwurfsmuster", "Eine besondere Schleife", "Ein besonderer Methodenaufruf"]},
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

    this.serverTaskIDs = ["3284","3305","3304","3292","3293","3303","3296","3297","3302","3299","3300","3301"];
  }

  getTaskCount(taskType) {
    if(taskType === "server") {
      return this.serverTaskIDs.length;
    }
    else {
      return this.tasks[taskType].length;
    }

  }

  //returns the task
  async getTask(taskType, number) {
    if(taskType === "server") {
      this.currServerTaskID = this.serverTaskIDs[number];
      let headers = new Headers();
      headers.append("Authorization", "Basic " + btoa("s80476@htw-dresden.de:IT1BelegPWD"));
      let response = await fetch("https://irene.informatik.htw-dresden.de:8888/api/quizzes/" + this.currServerTaskID, {
        method: "GET",
        headers: headers
      })

      let task = await response.json();
      task = {title: task["title"], t: task["text"], a: task["options"]};
      this.currentTask = task;
      this.currentTaskType = taskType;

      return task;
    }
    else {
      let task = this.tasks[taskType][number];
      this.currentTask = task;
      this.currentTaskType = taskType;
      return task;
    }
  }

  async checkAnswer(taskType, idx) {
    if(taskType === "server") {
      this.removeCurrentTask();

      let answerArray = [idx];
      let headers = new Headers();
      headers.append("Authorization", "Basic " + btoa("s80476@htw-dresden.de:IT1BelegPWD"));
      headers.append("Content-Type", "application/json");
      let response = await fetch("https://irene.informatik.htw-dresden.de:8888/api/quizzes/" + this.currServerTaskID + "/solve", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(answerArray)
      })

      let result = await response.json();
      return result["success"];
    }
    else {
      this.removeCurrentTask();
      return idx === 0;
    }
  }

  //remove the answered task from the tasks list, so that it will not get shown again
  removeCurrentTask() {
    if(this.currentTaskType === "server") {
      let idx = this.serverTaskIDs.indexOf(this.currServerTaskID);
      this.serverTaskIDs.splice(idx,1);
    }
    else {
      let idx = this.tasks[this.currentTaskType].indexOf(this.currentTask);
      this.tasks[this.currentTaskType].splice(idx, 1);
    }
  }

}
