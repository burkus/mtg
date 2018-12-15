/*
 * Vertex
*/

var constants = require('./const.js');
var constrain = require('./util.js').constrain;

function Vertex(x, y, indices) {
  this.x = x || 0;
  this.y = y || 0;
  this.radius = 20;
  this.greyColor = 145;
  indices = indices || {};
  this.dx = 0.0;
  this.dy = 0.0;
}

Vertex.prototype.draw = function() {}


/*
 * This code copied from Data Visualization by Ben Fry, pgs 225, 226
 * https://www.amazon.com/Visualizing-Data-Explaining-Processing-Environment/dp/0596514557
*/
Vertex.prototype.relax = function(vertices) {
  var ddx = 0;
  var ddy = 0;

  var j;
  for(j = 0; j < vertices.length; j++) {
    var vertex = vertices[j];
    if(vertex !== this) {
      var vx = this.x - vertex.x;
      var vy = this.y - vertex.y;
      var lensq = vx * vx + vy * vy;
      if(lensq == 0) {
        ddx += Math.random();
        ddy += Math.random();
      } else if(lensq < 100 * 100) {
        ddx += vx / lensq;
        ddy += vy / lensq;
      }
    }
  }
  // double check the math here
  var dlen = Math.sqrt(Math.pow(-ddx, 2) + Math.pow(-ddy, 2)) / 2;
  if(dlen > 0) {
    this.dx += ddx;
    this.dy += ddy;
  }
}

Vertex.prototype.update = function(w, h) {
  var width = w || window.width, height = h || window.height;
  this.x += constrain(this.dx, -constants.MAX_DX, constants.MAX_DX);
  this.y += constrain(this.dy, -constants.MAX_DY, constants.MAX_DY);

  if(width && height) {
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }
  this.dx /= 2;
  this.dy /= 2;
}

Vertex.prototype.setDraw = function(f) {
  Vertex.prototype.draw = f;
}

module.exports = Vertex;
