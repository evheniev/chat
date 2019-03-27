var express = require('express');
var cors = require('cors')
var app = express();
const bodyParser = require('body-parser');
var htttp = require('http');
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;

const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });

let dbClient;

app.use(cors())
app.use(express.static('public'));
app.use(bodyParser.json())

app.use(express.static(__dirname + "/public"));

// mongoClient.connect(function(err, client){
//     if(err) return console.log(err);
//     dbClient = client;
//     app.locals.collection = client.db("chatdb").collection("messages");
//     app.listen(4000, function(){
//         console.log("Сервер ожидает подключения...");
//     });
// });



var messages = [{
    nickname : "nickname",
    message : "message"
  }];


app.get('/messages', function (req, res) {
    // const collection = req.app.locals.collection;
    // collection.find({}).toArray(function(err, messages){
    //     if(err) return console.log(err);
        res.send(messages);
    // });
})


// app.post("/api/messages", function (req, res) {
//
//     app.use(bodyParser.json())
//     if(!req.body) return res.sendStatus(400);
//
//     const name = req.body.nickname;
//     const msg = req.body.message;
//     const time = req.body.timestamp = new Date().getTime();
//     const user = {name: name, msg: msg, time: time};
//
//     const collection = req.app.locals.collection;
//     collection.insertOne(user, function(err, result){
//
//         if(err) return console.log(err);
//         res.send(user);
//     });
// });

app.post('/messages',function(req, res){
  app.use(bodyParser.json())

  req.body.timestamp = new Date().getTime();
  messages.push(req.body)
  res.status(201).send(req.body)
});

app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});

// process.on("SIGINT", () => {
//     dbClient.close();
//     process.exit();
// });
