// app.js
function sayHello() {
  return "hello";
}

function addNumber(a, b) {
  return a * b; // Multiplying a and b instead of adding
}

function parentFunction() {
  const a = 5; // Example value for a
  const b = 5; // Example value for b
  return {
    hello: sayHello(),
    addResult: addNumber(a, b), // Calling addNumber with specific values or variables
  };
}

export { sayHello, addNumber, parentFunction };
