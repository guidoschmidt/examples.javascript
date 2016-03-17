function Just(value) {
  this.val = value
}

Just.prototype.bind = function(transform) {
  return transform(this.val)
}

Just.prototype.toString = function() {
  return `Just(${this.val})`
}

const Nothing = {
  bind: function() { return this },
  toString: function() { return 'Nothing' }
}

module.exports = {
  Just: Just,
  Nothing, Nothing
}
