"use strict";
let p,v,m;
document.addEventListener("DOMContentLoaded", function() {
  m = new Model();
  p = new Presenter();
  v = new View(p);
  p.setModelAndView(m,v);
});
