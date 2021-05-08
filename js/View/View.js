class View {
  constructor(p) {
    this.p = p;
    this.setHandler();
  }

  setHandler() {
    document.getElementById("buttons").addEventListener("click", this.evaluate.bind(this), false);
    document.getElementById("buttons").addEventListener("mousedown", this.colorOn.bind(this));
    document.getElementById("buttons").addEventListener("mouseup", this.colorOff.bind(this));
   // document.getElementById("taskSelection").addEventListener("click", this.taskSelection.bind(this));

    document.querySelectorAll("div#buttons > *")[0].setAttribute("number", 0);
    document.querySelectorAll("div#buttons > *")[1].setAttribute("number", 1);
    document.querySelectorAll("div#buttons > *")[2].setAttribute("number", 1);
  }

  taskSelection(event) {
    console.log("Task Selection: " + event.target.type);
    this.p.taskSelection(1);
  }

  evaluate(event) {
    console.log("View -> Evaluate: " + event.type + " " + event.target.nodeName);
    if (event.target.nodeName.toLowerCase() === "button") {
      this.p.evaluate(Number(event.target.attributes.getNamedItem("number").value));
    }
  }

  colorOn(event) {
    if (event.target.nodeName.toLowerCase() === "button") {
      this.color = event.target.style.backgroundColor;
      console.log("colorOn: " + event.type + " Color: " + this.color);
      if (event.target.attributes.getNamedItem("number").value === "0") {
        event.target.style.backgroundColor = "green";
      } else {
        event.target.style.backgroundColor = "red";
      }
    }
  }

  colorOff(event) {
    console.log("colorOff: "+ event.type + " Color: " + this.color);
    event.target.style.backgroundColor = this.color;
  }
}
