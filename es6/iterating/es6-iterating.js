/*
	ECMAScript 6: Iterators & for-loops

	author: Guido Schmidt <guido.schmidt.2912@gmail.com>
	date: 21.09.2015
*/

// Helper
var getTypeOf = function(object) {
	return ({}).toString.call(object).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}

// Data
var data = [0, 1, 2, 3, 4, 5, 6, 7];
console.log("Input Data:\n" + data);

// old fashioned way
console.log("Old fashioned for loop:");
for(var i=0; i < data.length; i++) {
	console.log(data[i] + ' - ' + getTypeOf(i));
}

/*
	ES5 forEach
	Drawbacks:
		- Can't break out of loop
		- Can't return from the loop
*/
console.log("ES5 forEach:");
data.forEach(function(value) {
	console.log(value + ' - ' + getTypeOf(i));
});

/*
	for...in loop
	Drawbacks:
		- Values assigned to i are strings
		- Will also iterate over proerties of an array object (e.g. array.name)
		- May loop in an arbitrary order!!!
 */
console.log("for ... in loop <- THIS IS BAD!");
var counter;
data.name = "Test";
for(var i in data) {
	counter += i;
	console.log(data[i] + ' - ' + getTypeOf(i));
}
console.log("Counter value: " + counter + " <- BAD! The index-counter gets strings added");

/*
	ES6: for...of loop
		- Most concise syntax for looping over array
		- Avoids pitfalls of other for structures
		- Can break, continue, return
		- Also works on DOM node lists
		- Also works on string, map and set objects
*/
for(var i of data) {
	console.log(i + ' - ' + getTypeOf(i));
}
// Can also iterate over strings
for(var character of '😺😲Test') {
	var h1 = document.createElement('H1');
	h1.appendChild(document.createTextNode(character));
	document.getElementById('container').appendChild(h1);
}


/*
	for...of works entirely in terms of method calls:
	Arrays, Maps, Sets all have an iterator method!
	Add myObject[Symbol.iterator]() method to an object and JS will understand
	how to iterate ovet his kind of object
*/

var Human = function (name, age) {
	var object = {
		name: name,
		age: age,
		toString: function() {
			return this.name + ", " + this.age;
		}
	};
	return object;
};
var peter = new Human('Peter', 25);
var hans = new Human('Hans', 33);
var willi = new Human('Willy', 18);
var persons = [peter, hans, willi];
for(var person of persons) {
	console.log( person.toString() );
}

// Iterator objects
var zeroesForeverIterator = {
	 [Symbol.iterator]: function() {
		 return this;
	 },
	 next: function() {
		 return {done: false, value: 0};
	 }
};
