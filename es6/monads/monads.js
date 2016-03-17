'use strict'
// @source https://curiosity-driven.org/monads-in-javascript

// Monads is a design pattern
//
// Describe computations as a series of steps
// Come from functional programming
// Manage side effects
//
// They wrap types by giving them additional behavior like e.g. the automatic
// propagation of empty values (Maybe Monad) or simplifying asinchronous
// code (Continuation Monad)

// Monad = 3 components
// 1. Type constructor
//    Maybe<Number> creates a Maybe Monad for Numbers
// 2. Unit function
//    Wraps a value of the underlying type into a Monad
//    Maybe(2) wraps value 2 into the Maybe Monad of type Maybe<Int>
// 3. Bind function
//    Chains the operations on a monadic values

// Three monadic axioms, that need to obey:
// 1. bind(unit(x), f) === f(x)
//    The unit is a neutral element
// 2. bind(m, unit) === m
//    The unit is a neutral element
// 3. bind( bind(m, f), g ) === bind(m, x => bind( f(x), g ))
//    Bind should be associative, the order of binding does not matter

// Identity monad
const Identity = require( './monad.identity' )

let result = new Identity(5).bind(value => {
  return new Identity(6).bind(value2 => {
    return new Identity(value + value2)
  })
})
console.log(`Identity Monad: ${result.toString()}`)



// Maybe monad
// Features empty value propagation
// Used to protect against errors causde by null
const Just = require( './monad.maybe' ).Just
const Nothing = require( './monad.maybe' ).Nothing

result = new Just(5).bind(value => {
  return Nothing.bind(value2 => {
    return new Just(value + console.log(value2))
  })
})
console.log(`Maybe Monad: ${result.toString()}`)

// Practical example for Maybe Monad
function getUser(i) {
  return new Just({
    getAvatar: function() {
      if(i <= 2) return Nothing
      else return new Just({url: 'http://aws.me/av.jpg'})
    }
  })
}

const urlOf1 = getUser(1)
  .bind(user => user.getAvatar())
  .bind(avatar => avatar.url)

const urlOf6 = getUser(6)
  .bind(user => user.getAvatar())
  .bind(avatar => avatar.url)

console.log(`URL of user ID 1 is: ${urlOf1}`)
console.log(`URL of user ID 6 is: ${urlOf6}`)
