/*
URL: https://bethallchurch.github.io/JavaScript-and-Functional-Programming/?utm_source=javascriptweekly&utm_medium=email

*/

// Function with a side effect
var sideEffected = 10

const addY = function(y) {
  sideEffected += y
}

addY(3)
console.log(sideEffected)
addY(3)
console.log(sideEffected)

// Array.push mutates an array
/*
Mutation is a side effect. Fewer changes, the simpler the program will be
*/
const mutableArray = [1, 2]
console.log(mutableArray)
mutableArray.push(3)
console.log(mutableArray)

const frozenObject = Object.freeze({ valueOne: 1, valueTwo: {nestedValue: 2} })
frozenObject.valueOne = 2 // This is not allowed
frozenObject.valueTwo.nestedValue = 3 // Allowed!

// Avoid mutation of arrays
const arrayOne = [1, 2, 3]
arrayOne.push(4) // Mutation!
console.log(arrayOne, 'has been mutated')
const arrayTwo = [1, 2, 3]
const arrayThree = arrayTwo.concat([4])
console.log(arrayTwo, 'has not been mutated')
console.log(arrayThree, 'has not been mutated')

// Avoid mutation of objects
const objectOne = { value: 1 }
const objectTwo = { value: 2 }
const objectThree = Object.assign({}, objectOne, objectTwo)
console.log(objectThree, 'Did not mutate: ', objectOne, objectTwo)

// const
/*
Using const won't make data immutable. It prevents variables from beeing reassigned - do not conflate this fact.
*/
const x = 1
//x = 2 // Not allowed!
const array = [1, 2, 3, 4]
//array = [0, 1, 2] // Not allowed!
array[0] = 10 // Allowed!

// Pure functions
/*
Pure functions do not change the programs state and does not producte side effects.
The output of a pure function only depends on its input arguments. For the same
input, a pure function will always produce the same output
*/
const addY_Pure = function(y) {
  let x = 10
  return x + y
}
console.log(addY_Pure(3))
console.log(addY_Pure(3))

// Example 1 - Not a pure function
const numbers = [1, 2, 3]
for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i])
}

// Example 2 - Pure function
const print = function(input) {
  console.log(input)
}
numbers.forEach(print)