
const test = () => {
  console.log("YAY " + Math.random());
  setTimeout(test, 300);
}

setTimeout(test, 300);