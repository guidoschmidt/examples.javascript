'use strict'

require('colors')
const evenNumbers$ = require('./even-numbers').ontime
const delayedEvenNumbers$ = require('./even-numbers').delayed

// On time
console.log('Punctual stream'.bold)
evenNumbers$.subscribe(
  x => console.log(`Even number: ${x}`),
  err => console.error(err),
  () => console.log('> Finished.')
)

// Delayed
console.log('\nDelayed stream'.bold)
delayedEvenNumbers$.subscribe(
  x => console.log(`Even number: ${x.value}, after ${x.interval}ms`),
  err => console.error(err),
  () => console.log('> Finished.')
)
