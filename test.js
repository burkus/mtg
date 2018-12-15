require('p5');
var Graph = require('./src/graph.js');
var Vertex = require('./src/vertex.js');
var Edge = require('./src/edge.js');

Vertex.prototype.draw = function() {
  push();
  noFill();
  stroke(0);
  ellipse(this.x, this.y, this.radius, this.radius);
  pop();
}

Edge.prototype.draw = function() {
  push();
  stroke(0);
  strokeWeight(this.width);
  line(this.to.x, this.to.y, this.from.x, this.from.y);
  pop();
}

var G;
window.running = true;
const setup = () => {
  createCanvas(800, 800);
  var g = [
    [0, 1, 2, 3, 4],
    [1, 2, 3],
    [2, 3],
    [1],
    [2, 3, 4]
  ];

  G = new Graph().fromAdjMtx(g);
  console.log(G);
}

const draw = () => {
  if(running) {
    background(145);
    G.draw();
    G.relax();
    G.update();
  }
}

attach();

function attach() {
  window.setup = setup;
  window.draw = draw;
}
