var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json())

// function test(req, res, next) {
//     console.log("Test Function called")
//     next();
// }

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
