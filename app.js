var express = require('express');
var cors = require('cors')
var app = express();
const bodyParser = require('body-parser');
var htttp = require('http');
var Sequelize = require('sequelize');

app.use(cors())
app.use(express.static('public'));
app.use(bodyParser.json())

var sequelize = new Sequelize('chat', 'root', '12345', {
  dialect: 'mariadb'
})

var User = sequelize.define('User', {
  username: Sequelize.STRING,
})

var Msg = sequelize.define('Msg', {
  text: Sequelize.STRING,
})

app.use(express.static(__dirname + "/public"));

app.get('/message', function (req, res) {
    User.findAll({
        attributes: ['username']
    })
    .then(users => {
        console.log(users);
        res.send(users)}
    )
})



app.post("/message", function (req, res) {
    app.use(bodyParser.json())
    if(!req.body) return res.sendStatus(400);

    sequelize.sync().then(function() {
      User.create({
        username: req.body.nickname,
    }).then(function(username) {
        console.log(username)
      })
    })

    sequelize.sync().then(function() {
     Msg.create({
        text: req.body.message,
    }).then(function(text) {
        console.log(text)
      })
    })

});

app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});
