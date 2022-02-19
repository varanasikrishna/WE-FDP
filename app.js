function sample(){
    console.log("sample");
}

setTimeout(sample,5000);
var count = 0;
var interval = setInterval(function(){
    
    if(count>5){
        clearInterval(interval)
    }
    console.log("Inside interval")
    count++;
},1000)

const obj = require('./arith.js')

console.log(obj.add(50,30));
console.log(obj.name);

const os = require('os')
const path = require('path')
const fs = require('fs');
const http = require('http')

console.log(os.freemem());
console.log(os.homedir())
console.log(os.hostname())
console.log(os.platform())
console.log(os.arch())

console.log(__filename);
console.log(__dirname);

fs.readFile("file1.txt","utf-8", (err,data)=>{
    if(err){
        console.log("error in reading the file")
    }
    console.log(data)
})

const data = fs.readFileSync("file1.txt","utf-8")
console.log("file data read")
console.log(data)

fs.writeFileSync("file2.txt","This is file 2 content sync")

const server = http.createServer((req,res)=>{
    // console.log(req.url)
    let users = [
        {
            name:"cvr",
            age:40
        }
    ]
    if(req.url === "/"){
        res.write("Welcome to JS")
        res.end()
    }
    else if(req.url === '/api'){
        res.write("Welcome to node!")
        res.end()
    } else if(req.url === '/users'){
        res.statusCode = 200
        res.setHeader = {"Content-Type" : "application/json"};
        res.write(JSON.stringify(users))
        res.end()
    } else if(req.url == '/index'){
        let myReadStream = fs.createReadStream(__dirname+'/index.html','utf-8');
        res.statusCode = 200
        res.setHeader = {"Content-Type" : "text/html"};
        myReadStream.pipe(res);
    }
    
    // res.end()
})

server.listen(4132)
console.log("server is listening at port 4132")

const event = require('events')

var myEvent = new event.EventEmitter()
myEvent.on("someEvent", ()=>{
    console.log("Some Event Triggered")
})

myEvent.emit("someEvent");

let myReadStream = fs.createReadStream("file1.txt",'utf-8')
let myWriteStream = fs.createWriteStream("file2.txt")
myReadStream.on('data',(chunk)=>{
    // console.log(chunk)
    console.log("-----New chunk Received------")
    myWriteStream.write(chunk)
})

myReadStream.pipe(myWriteStream);

var express = require('express');
var path = require('path');
var jwt = require('jsonwebtoken');

var app = express();

// app.use(express.static(path.join(__dirname, "public")));

app.use(express.json())

app.post('/login',(req,res)=>{
    user = {
        name:"cvr",
        password:"cvrce"
    }
    jwt.sign({user:user},"secret key",(err,token)=>{
        res.send({token:token})
    })
});

function verifyToken(req,res,next){
    var bearerHeader= req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }
    
}

app.post("/authorizePage",verifyToken,(req,res) =>{
    jwt.verify(req.token, "secret key", (err,data)=>{
        res.send("Authorized access")
    })
});

function test(req, res, next) {
    console.log("Test Function called")
    next();
}

const users = [
    {
        name: "CVR",
        id: 1,
        loc: "hyderabad"
    },
    {
        name: "Afroz",
        id: 2,
        loc: "kurnool"
    },
    {
        name: "Nagesh",
        id: 3,
        loc: "Mahaboobabad"
    }
]
app.get('/', (req, res) => {
    console.log("Request received");
    res.render("index.html")
})

app.get('/about', (req, res) => {
    res.render("about.html");
})

app.get('/api/users', (req, res) => {
    res.send(users);
})

app.post('/api/users', (req, res) => {
    console.log(req.body);

    const user = {
        name: req.body.name,
        id: users.length + 1,
        loc: req.body.loc
    }

    users.push(user);

    res.send(user);

});

app.get('/api/users/:id', (req, res) => {
    console.log(req.params.id);
    const user = users.find((ele) => ele.id === parseInt(req.params.id))
    res.send(user);
})

app.put('/api/users/:id', (req, res) => {

    const user = users.find((ele) => ele.id === parseInt(req.params.id))
    if (!user) {
        res.sendStatus(404);
    }
    else {
        user.name = req.body.name;
        user.loc = req.body.loc;
    }
    res.send(user);
})

app.delete('/api/users/:id', (req, res) => {
    const user = users.find((ele) => ele.id === parseInt(req.params.id))
    if (!user) {
        res.sendStatus(404);
    }
    else {
        const index = users.indexOf(user);
        users.splice(index, 1);
    }
    res.send(user);
})

app.listen(1234, () => console.log("Express server started"));
