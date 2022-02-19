var express = require('express');
var path = require('path');
var jwt = require('jsonwebtoken');

var app = express();
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