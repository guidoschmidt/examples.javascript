function Identity(value) {
  this.val = value
}

Identity.prototype.bind = function (transform) {
  return transform(this.val)
}

Identity.prototype.toString = function () {
  return `Identity(${this.val})`
}

module.exports = Identity
