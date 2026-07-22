const fs = require("fs");

const stream = fs.createWriteStream("sample.txt");
const oneLine = "Scaler is Awesome and it helps us being consistent in learning"
const totalLines = 10000;

for(let i=0; i<totalLines; i++) {
    stream.write(`${i}. ${oneLine}`)
}

stream.end(() => {
    console.log("Large File is genrated")
})