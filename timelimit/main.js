
const test = () => {
  console.log("test " + Math.random());
  setTimeout(test, 300);
}

setTimeout(test, 300);