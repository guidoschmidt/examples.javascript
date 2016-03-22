'use strict'

const colors = require('colors');

console.log("--- Comparison operators ---".bold.red)
console.log("\n    JS features two comparison operators:")

console.log('    EQUALITY : =='.yellow)
console.log("    -> Type conversion, only values need to be equal".yellow)
console.log('\n    IDENTITY : ==='.green)
console.log("    -> No type conversion, values and types need to be equal".green)

/*
JavaScript: The Good Parts
(http://rads.stackoverflow.com/amzn/click/0596517742)

JavaScript has two sets of equality operators: === and !==, and their evil
twins == and !=. The good ones work the way you would expect. If the two
operands are of the same type and have the same value, then === produces
true and !== produces false. The evil twins do the right thing when the
operands are of the same type, but if they are of different types, they
attempt to coerce the values. the rules by which they do that are
complicated and unmemorable. These are some of the interesting cases:
*/

console.log(`\n\n    '' == '0'          --> ${'' == '0'}`.yellow)
console.log(`    0 == ''            --> ${0 == ''}`.yellow)
console.log(`    0 == '0'           --> ${0 == '0'}`.yellow)
console.log(`    false == 'false'   --> ${false == 'false'}`.yellow)
console.log(`    false == '0'       --> ${false == '0'}`.yellow)
console.log(`    false == undefined --> ${false == undefined}`.yellow)
console.log(`    false == null      --> ${false == null}`.yellow)
console.log(`    null == undefined  --> ${null == undefined}`.yellow)
console.log(`    ' \\t\\r\\n ' == 0    --> ${' \t\r\n ' == 0}`.yellow)

console.log(`\n\n    '' === '0'          --> ${'' === '0'}`.green)
console.log(`    0 === ''            --> ${0 === ''}`.green)
console.log(`    0 === '0'           --> ${0 === '0'}`.green)
console.log(`    false === 'false'   --> ${false === 'false'}`.green)
console.log(`    false === '0'       --> ${false === '0'}`.green)
console.log(`    false === undefined --> ${false === undefined}`.green)
console.log(`    false === null      --> ${false === null}`.green)
console.log(`    null === undefined  --> ${null === undefined}`.green)
console.log(`    ' \\t\\r\\n ' === 0    --> ${' \t\r\n ' === 0}`.green)

console.log("\nADVICE: Use === and avoid == unless you explicitly need type conversation".bgRed.white)
