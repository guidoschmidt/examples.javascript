// -- padStart
const date = new Date();
const day = String(date.getDate());
// Month starts at 0! Thus add 1
const month = String(date.getMonth() + 1);

const dateString = `${day.padStart(2, "0")}.${month.padStart(2, "0")}`;
console.info(`Today is the ${dateString}`);

// -- padEnd
const nameA = "Simon";
const nameB = "Will";
const nameC = "April";
const nameD = "Matthew";

const names = [nameA, nameB, nameC, nameD];
names.sort((a, b) => a.length - b.length);
const longest = names[names.length - 1].length;
const equalNames = names.map(name => name.padEnd(longest, " "));

equalNames.map(name => console.log(name, "|"));

