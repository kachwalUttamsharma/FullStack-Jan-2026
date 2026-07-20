const fs = require('fs');

// const op = fs.readFileSync("./file1.txt");

fs.readFile("./file2.txt", (err, data) => {
    if(err) {
        console.log(err);
        return;
    }    
    console.log(data?.toString());
})

// console.log(op.toString());

fs.writeFile("./file4.txt", "we are writing new data 1", (err) => {
    if(err) console.log(err)
})

// fs.rename("./file4.txt", "./newFile4.txt", (err) => {
//     if(err) console.log(err)
// });

// fs.unlink("./newFile4.txt", (err) => {
//     if(err) console.log(err)
// })


fs.appendFile("./file1.txt", "new content being appended", (err) => {
    if(err) console.log(err)
})

// directory

// mkdir -> make directory
// rmdir -> remvoe directory
fs.rmdir("fs", (err) => {
    if(err) console.log(err)
})