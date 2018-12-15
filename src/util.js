function constrain(n, l, u) {
  if(n < l) return l;
  if(n > u) return u;
  return n;
}

module.exports.constrain = constrain;
