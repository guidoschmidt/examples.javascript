/*
@source https://curiosity-driven.org/monads-in-javascript

Monad is a design pattern

Describe computations as a series of steps
Come from functional programming
Manage side effects

They wrap types by giving them additional behavior like e.g. the automatic
propagation of empty values (Maybe Monad) or simplifying asinchronous
code (Continuation Monad)

Monad = 3 components
1. Type constructor
   Maybe<Number> creates a Maybe Monad for Numbers
2. Unit function
   Wraps a value of the underlying type into a Monad
   Maybe(2) wraps value 2 into the Maybe Monad of type Maybe<Int>
3. Bind function
   Chains the operations on a monadic values

Three monadic axioms, that need to obey:
1. bind(unit(x), f) === f(x)
   The unit is a neutral element
2. bind(m, unit) === m
   The unit is a neutral element
3. bind( bind(m, f), g ) === bind(m, x => bind( f(x), g ))
   Bind should be associative, the order of binding does not matter
*/

'use strict'

const colors = require('colors')


//--- IDENTITY MONAD
console.log('IDENTITY MONAD'.bold)
{
  const Identity = require( './monad.identity' )

  let result = new Identity(5).bind(value => {
    return new Identity(6).bind(value2 => {
      return new Identity(value + value2)
    })
  })
  console.log(`Identity Monad: ${result.toString()}`)
}


//--- MAYBE MONAD
console.log('\nMAYBE MONAD'.bold)
{
  // Features empty value propagation
  // Used to protect against errors causde by null
  const Just = require( './monad.maybe' ).Just
  const Nothing = require( './monad.maybe' ).Nothing

  let result = new Just(5).bind(value => {
    return Nothing.bind(value2 => {
      return new Just(value + console.log(value2))
    })
  })
  console.log(result.toString())

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
}


//--- LIST MONAD
console.log('\nLIST MONAD'.bold)
{
  // List monads implement a lazy comuputed list of values
  function* unit(value) {
    yield value
  }

  function* bind(list, transform) {
    for (var item of list) {
      yield* transform(item)
    }
  }

  const input0 = ['A', 'B', 'C']
  const input1 = ['0', '1', '2']

  const listResult = bind(input0, function (element) {
    return bind(input1, function* (element2) {
      yield element + '-' + element2
    })
  })

  for (var item of listResult) {
    console.log(item)
  }

  // Several examples of usage for the List Monad:
  //
  // https://curiosity-driven.org/sieve-with-generators
  // https://curiosity-driven.org/sudoku-solver
  // https://curiosity-driven.org/promises-and-generators
  // https://curiosity-driven.org/prolog-interpreter
  // https://curiosity-driven.org/pi-approximation
}


//--- CONTINUATION MONAD
{
  // Used for asynchronous tasks
  // The ES6 Promise is an implementation of the Continuation Monad
  let result = Promise.resolve(5).then(value0 => {
    return Promise.resolve(6).then(value1 => {
      return value0 + value1
    })
  })
  .then(result => {
    console.log('\nCONTINUATION MONAD'.bold)
    console.log(`Continuation Monad ${result}`)
  })
}


//--- DO NOTATION
console.log('\nDO NOTATION'.bold)
{
  // Haskell provides a helpful notation to work with monadic code
  // 'do' blocks are translated into calls to the bind function
  const Just = require( './monad.maybe' ).Just

  const resultJust = new Just(5).bind(value0 =>
    new Just(6).bind(value1 =>
      new Just(value0 + value1)))

  console.log(`Just Monad: ${resultJust}`)


  // --> can be rewritten using a generator
  function Do(gen) {
    function step(value) {
      const result = gen.next(value)
      if (result.done) {
        return result.value
      }
      return result.value.bind(step)
    }
    return step()
  }

  const resultDo = Do(function*() {
    const value = yield new Just(5)
    const value2 = yield new Just(6)
    return new Just(value + value2)
  }())

  console.log(`Using Do: ${resultDo}`)


  // Do can also be used with other Monads
  Promise.prototype.bind = Promise.prototype.then

  const resultDoContinuation = Do(function* () {
    const value0 = yield Promise.resolve(20)
    const value1 = yield Promise.resolve(8)
    return value0 + value1
  }())
  resultDoContinuation.then(result => {
    console.log(`Using Do with Continuation Monad (Promise): ${result}`)
  })
}


// PROXIES
// Proxy NOT YET SUPPORTED IN NODE
{
  // const Just = require( './monad.maybe' ).Just
  // const Nothing = require( './monad.maybe' ).Nothing
  //
  // function wrap(target, unit) {
  //   target = unit(target)
  //
  //   function fix(object, property) {
  //     const val = object[property]
  //     if (typeof value === 'function') {
  //       return value.bind(object)
  //     }
  //     return value
  //   }
  //
  //   function continueWith(transform) {
  //     return wrap(target.bind(transform), unit)
  //   }
  //
  //   return new Proxy(function() {}, {
  //     get: function(_, property) {
  //       if(property in target) {
  //         return fix(target, property)
  //       }
  //       return continueWith(value => fix(value, property))
  //     },
  //
  //     apply: function(_, thisArg, args) {
  //       return continueWith(value => value.apply(thisArg, args))
  //     }
  //   })
  // }
  //
  // function getUser() {
  //   return new Just({
  //     getAvatar: () => { return Nothing }
  //   })
  // }
  //
  // const unit = value => {
  //   if (value === Nothing || value instanceof Just) { return value }
  //   return new Just(value)
  // }
  //
  // const user = wrap(getUser, unit)
  //
  // console.log(getAvatar().url)
}
