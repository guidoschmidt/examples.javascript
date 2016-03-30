// @source https://glebbahmutov.com/blog/testing-reactive-code
'use strict'
const la = require('lazy-ass')
const _ = require('lodash')
const is = require('check-more-types')
const Rx = require('rx') // v4.1.0
Rx.config.longStackSupport = true

const noop = () => {}

describe('Even numbers', () => {
  const evenNumbers$ = require('../even-numbers').ontime

  it('Is observable', () => {
    la(is.fn(evenNumbers$.subscribe), 'has a subscribe method')
  })

  it('Finishes', (done) => {
    evenNumbers$.subscribe(noop, noop, done)
  })

  it('Has 3 numbers', (done) => {
    let count = 0
    const numbers = []
    const onNumber = x => {
      count++
      numbers.push(x)
    }
    evenNumbers$.subscribe(
      onNumber,
      noop,
      () => {
        la(count === 3, 'got 3 numbers: ', count)
        la(_.isEqual(numbers, [2, 4, 6]))
        done()
      })
  })
})


describe('Delayed even numbers', function() {
  this.timeout(7000) // allow each unit test to run for 7 seconds
  const delayedEvenNumbers$ = require('../even-numbers').delayed
  const roundHundred = x => Math.round(x/100) * 100
  const ms2s = x => x / 1000

  it('Finishes within 7 seconds', (done) => {
    delayedEvenNumbers$.subscribe(noop, noop, done)
  })

  it('Has correct timestamps', (done) => {
    const timestamps = []
    const keepTimeStamp = x => timestamps.push(ms2s(roundHundred(x.interval)))
    delayedEvenNumbers$.subscribe(
      keepTimeStamp,
      noop,
      () => {
        la(_.isEqual(timestamps, [0.5, 0.5, 0.5]))
        done()
      })
  })

  it('Has correct timestamps', (done) => {
    const timestamps = []
    const verifyTimestamps = ts => la(_.isEqual(ts, [0.5, 0.5, 0.5]), ts)
    delayedEvenNumbers$
      .pluck('interval')
      .map(roundHundred)
      .map(ms2s)
      .bufferWithCount(3)
      .subscribe(
        verifyTimestamps,
        err => { throw err },
        done
      )
  })
})
