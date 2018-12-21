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

Graph.mtxFromStr = function(str) {
  let strs = str.split(' ').filter(e => /\d/.test(e));
  // if(strs.length / len !== 0) {
  //   throw "Matrix is not uniform; this function requires a square NxN matrix";
  // }
  let l = Math.floor( Math.sqrt(strs.length) );
  let mtx = [];
  let i = 0;
  let j = 1;
  while(i < strs.length) {
    console.log(i, j *l);
    let row = strs.slice(i, j * l);
    row = row.map(e => parseInt(e));
    mtx.push(row);
    i += l;
    j++;
  }
  return mtx;
}

Graph.consVertices = function(lst, w, h) {
  let vertices = [];
  h = h || w;
  for(let i = 0; i < lst.length; i++) {
    vertices[i] = new Vertex(w / 2, h / 2);
  }
  return vertices;
}

Graph.fromAdjMtx = function(mtx, w, h) {
  let i, j, edges = [];
  h = h || w;
  let vertices = Graph.consVertices(mtx, w, h);

  for(i = 0; i < mtx.length; i++) {
    for(j = 0; j < mtx[i].length; j++) {
      let hasEdgeAtIndex = mtx[i][j];
      if(hasEdgeAtIndex) {
        let edge = new Edge(vertices[i], vertices[j]);
        edges.push(edge);
      }
    }
  }
  return new Graph(vertices, edges);
}

Graph.fromAdjLst = function(lst, w, h) {
  let i, j, edges = [];
  h = h || w;
  let vertices = Graph.consVertices(lst, w, h);

  for(i = 0; i < lst.length; i++) {
    for(j = 0; j < lst[i].length; j++) {
      let vIndex = lst[i][j];
      let edge = new Edge(vertices[i], vertices[vIndex]);
      edges.push(edge);
    }
  }
  return new Graph(vertices, edges);
}

module.exports = Graph;
