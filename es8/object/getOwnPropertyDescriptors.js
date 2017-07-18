const object = {
  age: 32,
  name: "Will",
  get salary() { return 23 * 12; }
};

console.log(`${object.name}'s salary is ${object.salary} €`);

const descriptors = Object.getOwnPropertyDescriptors(object);
console.log("--- getOwnPropertyDescriptors ---");
console.log(descriptors);
