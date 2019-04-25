var express = require('express');
var cors = require('cors')
var app = express();
const bodyParser = require('body-parser');
var htttp = require('http');
var Sequelize = require('sequelize');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');


app.use(cors())
app.use(express.static('public'));
app.use(bodyParser.json())
//
// var schema = buildSchema(`
//     type Query {
//         getMessages: [Message]
//         getUsers: [User]
//     }
//
//     type Mutation {
//         createMessage(message: String!, text: String!): Message
//         createUsers(username: String!): Message
//     }
//
//     type Message {
//         id: Int
//         text:  String
//     }
//
//     type User {
//         id: Int
//         username: String
//     }
// `);
//
// async function getMessages(){
//    return await Msg.findAll({})
// }
//
// async function getUsers(){
//    return await User.findAll({})
// }
//
// var root = {
//     getMessages,
//     getUsers,
// };
//
// var app = express();
// app.use(cors())
//
// app.use('/graphql', express_graphql({
//     schema: schema,
//     rootValue: root,
//     graphiql: true
// }));

var sequelize = new Sequelize('chat', 'root', '12345', {
  dialect: 'mariadb'
})

var User = sequelize.define('User', {
  username: Sequelize.STRING,
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }
})

var Msg = sequelize.define('Msg', {
  text: Sequelize.STRING,
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }
})

Msg.belongsTo(User { through: UserProject })

User.hasMany(Msg,{constraints: false})

app.use(express.static(__dirname + "/public"));

app.get('/message', async (req, res) => {
    const result = await Msg.findAll({
        attributes: ['text'],
        include: [{
            model: User,
            attributes: ['username']
        }]
    })


  res.status(201).send(result)
});



//     User.findAll({
//        attributes: ['username'],
//        include:[{
//            model:Msg,
//            attributes: ['text']
//        }]
//    })
//    .then(users => {
//        console.log(users);
//        res.send(users)}
//    )
// })



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
