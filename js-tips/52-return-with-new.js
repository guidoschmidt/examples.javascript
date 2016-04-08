const colors = require('colors')

function Thing() {
  this.one = 1
  this.two = 2
}

// with 'new': a new object created

// without 'new': Thing() is called, no object is created pointing to the global object (window)
//                new global variables named one and two.
//                thing === undefined, when nothing is returned in 'Thing()'
const thing = new Thing()
console.log('--- new without return'.green)
console.log(thing)
console.log(thing.one)
console.log(thing.two)

const undefinedthing = Thing()
console.log(undefinedthing)



function ReturningThing() {
  this.one = 0
  this.two = 7

  return 42
}

const returningThing = new ReturningThing()
console.log('\n--- new with return'.blue)
console.log(returningThing)
console.log(returningThing.one)
console.log(returningThing.two)

const staticReturningThing = ReturningThing()
console.log(staticReturningThing)



// returning a non primitive type with new will kill all properties set via this
function ReturningNonprimitiveThing() {
  this.one = 0
  this.two = 7

  return {
    a: 'A',
    b: 'B'
  }
}

const returningNonprimitiveThing = new ReturningNonprimitiveThing()
console.log('\n--- new with non primitev return'.red)
console.log(returningNonprimitiveThing)
console.log(returningNonprimitiveThing.one)
console.log(returningNonprimitiveThing.two)

const staticReturningNonprimitiveThing = ReturningNonprimitiveThing()
console.log(staticReturningNonprimitiveThing)
