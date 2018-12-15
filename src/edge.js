/*
 * Edge
*/

function Edge(from, to, length) {
  this.from = from;
  this.to = to;
  this.width = 2;
  this.length = 200 || length;
}

Edge.prototype.draw = function() {};

/*
 * This code copied from Visualizing Data by Ben Fry, pgs 225, 226
 * https://www.amazon.com/Visualizing-Data-Explaining-Processing-Environment/dp/0596514557
*/
Edge.prototype.relax = function(edges) {
  var vx = this.to.x - this.from.x;
  var vy = this.to.y - this.from.y;
  var d = Math.sqrt(Math.pow(-vx, 2) + Math.pow(-vy, 2));
  if(d > 0) {
    var f = (this.length - d) / (d * 3);
    var dx = f * vx;
    var dy = f * vy;
    this.to.dx += dx;
    this.to.dy += dy;
    this.from.dx -= dx;
    this.from.dy -= dy;
  }
}

Edge.prototype.setDraw = function(f) {
  f = f.bind(this);
  Edge.prototype.draw = f;
}

module.exports = Edge;
