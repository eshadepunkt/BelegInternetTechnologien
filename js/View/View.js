class View {
  constructor(p) {
    this.p = p;
    this.setHandler();
  }

  setHandler() {
    document.getElementById("tasten").addEventListener("click", this.evaluate.bind(this), false);
    document.getElementById("tasten").addEventListener("mousedown", this.colorOn.bind(this));
    document.getElementById("tasten").addEventListener("mouseup", this.colorOff.bind(this));
    document.getElementById("aufgabenwahl").addEventListener("click", this.aufgabenWahl.bind(this));

    document.querySelectorAll("#tasten > *")[0].setAttribute("number", 0);
    document.querySelectorAll("#tasten > *")[1].setAttribute("number", 1);
    document.querySelectorAll("#tasten > *")[2].setAttribute("number", 1);
  }

  aufgabenWahl(event) {
    console.log("Aufgabenwahl: " + event.target.type);
    this.p.aufgabenWahl(1);
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
