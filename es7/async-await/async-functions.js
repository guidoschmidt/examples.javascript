// https://blog.lavrton.com/javascript-loops-how-to-handle-async-await-6252dd3c795
// 2017-11-17

function delay() {
  return new Promise(resolve => setTimeout(resolve, 300))
}

async function delayedLog(prefix, item) {
  // Await the delay function which will return a promise
  await delay();
  // log item after delay has run
  console.log(prefix, item);
}

// Asynchronous loops
console.group();
async function processArrayAsync(array) {
	array.forEach(async (item) => {
    await delayedLog("- async -> ", item)
	})
  console.log("Async: Done!")
}
processArrayAsync([1, 2, 3, 4, 5])
console.groupEnd();


// Process the array in sequence
console.group();
async function processArraySync(array) {
  for (const item of array) {
    await delayedLog("- sync -> ", item)
  }
  console.log("Sync: Done!")
}
processArraySync([1, 2, 3, 4, 5])
console.groupEnd();


// Process an array in parallel
console.group();
async function processArrayParallel(array) {
  const promises = array.map(i => delayedLog("- parallel -> ", i));
  await Promise.all(promises)
  console.log("Parallel: Done!");
}
processArrayParallel([1, 2, 3, 4, 5])
console.groupEnd();

