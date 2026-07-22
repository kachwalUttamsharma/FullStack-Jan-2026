const fibonacci = require("../utils/fibonacci");

process.on("message", (number) => {
  const answer = fibonacci(number);
  process.send(answer);
});
