const express = require("express");
const app = express();
const path  = require("path");
const fs = require("fs");
const { error } = require("console");
const fibonacci = require("./utils/fibonacci");
const { Worker} = require("worker_threads");
const { fork } = require("child_process");

function runWorker(number) {
    console.log("number runworker : ", number);
    return new Promise((resolve, reject) => {
        const worker = new Worker(path.join(__dirname, "workers", "fibworker.js"), {
            workerData: {number},
        });
        console.log(`Forked new worker thread with threadId: ${worker.threadId}`);
        worker.on("message", (data) => {
            console.log(`data from worker : ${data}`)
            resolve(data);
        });
        worker.on("error", reject);
    })
}

function runChild(number) {
  return new Promise((resolve, reject) => {
    const child = fork(path.join(__dirname, "child", "fibChild.js"));

    child.send(number);

    child.on("message", (result) => {
      resolve(result);

      child.kill();
    });

    child.on("error", reject);
  });
}

app.get("/fib", (req, res) => {
    // 5 -> 
  const number = Number(req.query.number);

  const answer = fibonacci(number);

  res.json({ answer });
});

app.get("/get/streams", (req, res) => {
    const filePath = path.join(__dirname, "streams", "sample.txt");
    const readStream = fs.createReadStream(filePath);

    readStream.on("open", () => {
        console.log("file opened");
    })

    readStream.on("data", (chunk) => {
        console.log("chunk: ", chunk.length);
    })

    readStream.on("end", () => {
        console.log("Finished reading");
    })

    readStream.on("error", () => {
        console.log(error);
    })

    readStream.pipe(res);
})

app.get("/fib-worker", async (req, res) => {
 const number = Number(req.query.number);

  const answer = await runWorker(number);

  res.json({ answer });
})

app.get("/fib-process", async ( req, res) => {
  const number = Number(req.query.number);

  const answer = runChild(number);

  res.json({ answer });
})

app.listen(3000, () => {
    console.log("server running", process.pid);
})