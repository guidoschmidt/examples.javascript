// Closure:
// A stack frame, which is allocated when a function is executed
// and is not freed after the function returns



// EXAMPLE A:
// composeGreeting implements a closure:
function composeGreeting(name) {
	// `greeting` is a local variable inside the stack frame of composeGreeting
	const greeting = "Hola"
	// The function `greet` references the local variable `greeting`
	const greet = function() { return `${greeting}, ${name}` }
	// A reference to the `greet` function is returned
	return greet 
}
// Execute the closure, reference the greet function
const greet = composeGreeting("Bob")()



// EXAMPLE B:
function count() {
	let start = 0;
	const countNext = function() { return start }
	start++;
	return countNext
}
// Returns 1
count()()



// EXAMPLE C:
function buildList(list) {
	const result = []
	for (let i = 0; i < list.length; i++) {
		const item = `Item ${i}`
		result.push( function() { return list[i] + " @ " + item } )
	}
	return result
}
buildList([1, 2, 3])[0]()
buildList([1, 2, 3])[1]()
buildList([1, 2, 3])[2]()



// EXAMPLE D:
function sayAlice() {
  var call = function() { return msg }
  // Local variable that ends up within the closure
  var msg = "Hello Alice"
  return call
}
sayAlice()()
