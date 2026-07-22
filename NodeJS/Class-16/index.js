// module child process (worker thread)
// const {exec, execFile, spawn } = require("child_process");
// const path = require("path");
// const {fileURLToPath } = require("url");
import {exec, execFile, spawn} from "child_process";
import path from "path";
import { fileURLToPath } from "url";

// exec -> a bash command

// exec("ls -lh", (error, stdout, stderr) => {
//     if(error) {
//         console.log(error);
//     }
//     console.log("stdout : ", stdout);
//     console.log("stderr : ", stderr);
// })

// exec("mkdir test", (error, stdout, stderr) => {
//     if(error) {
//         console.log(error);
//     }
//     console.log("stdout : ", stdout);
//     console.log("stderr : ", stderr);
// })

// const filename = fileURLToPath(import.meta.url);
// const dirname = path.dirname(filename);
// const testfile = path.join(dirname, "test.js");

// execFile(testfile,(error, stdout, stderr) => {
//     if(error) {
//         console.log("execution error : " ,error);
//     }
//     console.log("stdout : ", stdout);
//     console.log("stderr : ", stderr);
// })


spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", ["https://www.youtube.com", "--incognito"]);