import Rx from 'rx'

const mouseEvent$ = Rx.Observable.fromEvent(document, 'click')
mouseEvent$.subscribe(
  function next(e => console.log)
)
