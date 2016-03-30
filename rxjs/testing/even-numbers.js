'use strict'
const Rx = require('rx') // v4.1.0

const array = [1, 2, 3, 4, 5, 6]
const evenNumbers$ = Rx.Observable.from(array)
  .filter(x => x % 2 === 0)

const delayedEvenNumbers$ = Rx.Observable.from(array)
  .filter(x => x % 2 === 0)
  .delay(x => Rx.Observable.timer(x * 250))
  .timeInterval()

  /*
  Marble Diagram:

  |---1-2-3-4-5-6-X->
  |     filter( x is even)
  |
  |-----2---4---6-X->
  |     delay( x * 500ms )
  |
  |-----------2-----------4-----------6-X->
  time 0      ~500ms      ~500ms      ~500ms
  */

module.exports = {
  ontime: evenNumbers$,
  delayed: delayedEvenNumbers$
}
