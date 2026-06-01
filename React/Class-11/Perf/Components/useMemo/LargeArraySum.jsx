import React from "react";
import { useState, useMemo } from "react";

const generateLargeArray = () => {
  const largeArray = [];
  for (let i = 1; i < 1000000; i++) {
    largeArray.push(i);
  }
  console.log("large array is calculated");
  return largeArray;
};
const sumArray = (arr) => {
  console.log("sum array is rendered");
  return arr.reduce((acc, curr) => acc + curr, 0);
};
const LargeArraySum = () => {
  console.log("LargeArraySum is rendered");
  const [count, setCount] = useState(0);
  const largeArray = useMemo(() => generateLargeArray(), []);
  const sum = useMemo(() => sumArray(largeArray), [largeArray]);
  return (
    <div>
      <h1>LargeArraySum</h1>
      <h2>{sum}</h2>
      <p>Count : {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default LargeArraySum;
