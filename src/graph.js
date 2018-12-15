/*
 * Graph
*/

var Vertex = require('./vertex.js');
var Edge   = require('./edge.js');

function Graph(vertices, edges) {
  this.vertices = vertices;
  this.edges = edges;
}

Graph.prototype.draw = function() {
  this.vertices.forEach(function(vertex) {
    vertex.draw();
  });
  this.edges.forEach(function(edge) { edge.draw() });
}

Graph.prototype.relax = function() {
  this.vertices.forEach(v => v.relax(this.vertices));
  this.edges.forEach(e => e.relax(this.edges));
}

Graph.prototype.update = function() {
  this.vertices.forEach(v => v.update());
}

Graph.prototype.setVertexDraw = function(f) {
  Vertex.setDraw(f);
}

Graph.prototype.setEdgeDraw = function(f) {
  Edge.setDraw(f);
}

Graph.prototype.fromAdjMtx = function(mtx) {
  var i, j, vertices = [], edges = [];
  let w = window.width, h = window.height;
  for(i = 0; i < mtx.length; i++) {
    vertices[i] = new Vertex(w / 2, h / 2, {i, j});
  }

  for(i = 0; i < mtx.length; i += 1) {
    for(j = 0; j < mtx[i].length; j += 1) {
      var vIndex = mtx[i][j];
      var edge = new Edge(vertices[i], vertices[vIndex]);
      edges.push(edge);
    }
  }
  return new Graph(vertices, edges);
}

module.exports = Graph;
