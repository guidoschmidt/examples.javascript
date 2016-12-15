"use strict"

// Decorator
function readonly(target, key, descriptor) {
    descriptor.writable = false
    return descriptor
}


// Classes
class Cat {
    constructor(name) { this.name = name }

    meow() { return `${this.name}: Meow.`}
}

class ReadOnlyCat extends Cat {
    @readonly
    meow() { return `${this.name}: Meow.` }
}


// Instances
const gfld = new Cat("Garfield")
gfld.meow = function() {
    return  `${this.name}: I <3 Lasagna.`
}
console.log(gfld.meow())

const fx = new ReadOnlyCat("Felix")
// Assigning a new function to fxs meow symbol will rais an exception,
// as the @readonly decorator marked the function as readonly
// fx.meow = function() {
//     return `${this.name}: MEOW!`
// }
console.log(fx.meow())
