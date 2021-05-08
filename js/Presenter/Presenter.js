class Presenter {
  setModelAndView(m, v) {
    this.m = m;
    this.v = v;
  }

  start() {
    let a = m.getTask();
    document.getElementById("idp").innerHTML = "";
    let b = document.getElementById("task");
    b.innerHTML = "Aufgabe: " + a;
  }

  evaluate(answer) {
    console.log("Presenter -> Antwort: " + answer);
  }
  aufgabenWahl(nr) {
    console.log("Presenter -> AufgabenWahl: " + nr);
  }
}
