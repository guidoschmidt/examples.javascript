"use strict"

console.group("A.) Object Prototyped Map")
// Will use Object prototype
// thus it will inherit all properties from
// the object prototype:
const dirtyMap = {};
console.log(dirtyMap.toString)
console.log(dirtyMap.hasOwnProperty)

// Iteration over a 'dirty map' will
// include all the Object properties
dirtyMap.prename = "Paul"
dirtyMap.surname = "Simon"
for (const key in dirtyMap) {
  if (dirtyMap.hasOwnProperty(key)) {
    console.log(`${key} -> ${dirtyMap[key]}`)
  }
}
console.groupEnd()



console.group("\nB.) No-Prototyped Map")
// Will explicitly set nul as prototype:
// thus the map will not have any properties
// so it is free for use as a datastructure
const cleanMap = Object.create(null)
console.log(cleanMap.toString)
console.log(cleanMap.hasOwnProperty)

// Iteration over the map with no prototype at all
// is free of inherited properties:
cleanMap.prename = "Michi"
cleanMap.surname = "Beck"
for (const key in cleanMap) {
  console.log(`${key} -> ${cleanMap[key]}`)
}
console.groupEnd()



console.group("\nC.) ES6 Map & WeakMap")
// ES6 introduced additional Map data structures
const es6Map = new Map()
es6Map.set("prename", "Prinz")
es6Map.set("surname", "Pi")
for (let key of es6Map.keys()) {
  console.log(`${key} -> ${es6Map.get(key)}`)
}
// WeakMap enforces the keys to be Object type only!
const es6WeakMap = new WeakMap()
es6WeakMap.set({key: "prename"}, "Steve")
console.groupEnd();


console.group("\nD.) ES6 Set & WeakSet")
// ES6 introduced a Set data structure
const es6Set = new Set()
es6Set.add(1)
es6Set.add(2)
es6Set.add(1)
for (let item of es6Set) {
  console.log(`es6Set: ${item}`)
}

const es6WeakSet = new WeakSet()
const object = { number: 1 }
es6WeakSet.add(object)
console.log(`es6WeakSet has: ${es6WeakSet.has(object)}`);
