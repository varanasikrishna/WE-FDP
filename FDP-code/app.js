// const os = require('os');
// const path = require('path');
// const fs = require('fs');


// console.log(os.freemem());
// console.log(os.homedir());
// console.log(os.platform());

// console.log(__filename);
// console.log(__dirname);

// console.log(path.extname(__filename));

// // let data = fs.readFileSync("file1.txt", "utf8")

// // console.log("File data read");
// // console.log(data);

// fs.writeFileSync("file2.txt", "This is file 2 Content Sync");

// const event = require('events');

// var myEvent = new event.EventEmitter();

// myEvent.on("someEvent", () => {
//     console.log("Some Event Triggered");
// })

// myEvent.emit("someEvent");

// const fs = require('fs');

// let myReadStream = fs.createReadStream("file1.txt", "utf8");
// let myWriteStream = fs.createWriteStream("file2.txt");

// // myReadStream.on('data', (chunk) => {
// //     console.log("New Chunk Received");
// //     // console.log(chunk);
// //     myWriteStream.write(chunk);

// // })

// myReadStream.pipe(myWriteStream);


const http = require('http');
const fs = require('fs');

let server = http.createServer((req, res) => {
    console.log(req.url);
    let users = [
        {
            name: "cvr",
            age: 40
        }
    ]
    if (req.url === "/") {
        res.write("Welcome to Node JS");
        res.end();
    } else if (req.url === '/api') {
        res.write("This is for API");
        res.end();
    } else if (req.url === '/users') {
        res.statusCode = 200;
        res.setHeader = { "Content-Type": "application/json" }
        res.write(JSON.stringify(users));
        res.end();
    } else if (req.url === '/index.html') {
        let myReadStream = fs.createReadStream(__dirname + '/index.html', "utf8");
        res.statusCode = 200;
        res.setHeader = { "Content-Type": "text/html" }
        myReadStream.pipe(res);
    }
});

server.listen(1234);
console.log("Server Started at port 1234");
