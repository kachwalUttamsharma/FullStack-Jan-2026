const { workerData, parentPort} = require("worker_threads");

const fibonacci = require("../utils/fibonacci");

console.log("workerData : ", workerData)
const num = workerData.number;
const result = fibonacci(num);

parentPort.postMessage(result);