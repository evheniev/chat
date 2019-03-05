import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import index from './index.js'

function sendData() {
  var msg = document.getElementById('message').value
  var name = document.getElementById('name').value
  console.log(msg, name)
  fetch("http://localhost:4000/message",
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({nickname: name, message: msg})
    })
}

function getData() {
  fetch('http://localhost:4000/message')
    .then(function (response) {
      response.json().then(function (data) {
        console.log(data)
        var messages = document.getElementById("messages")
        messages.innerHTML = ""
          for (var x in data) {
            var p = document.createElement("p")
            messages.appendChild(p).innerHTML = `${data[x].nickname}:${data[x].message}`
          }
      })
      getData()
    })

}

function update() {
    setInterval( () => getData() , 2000)
}
update()
getData()

class App extends Component {
  render() {
    return (
        <div className="App container">
            <h1 class="display-4">Send Message</h1>
            <div class="jumbotron">
                <br/>
                <input id = "name" class="form-control" placeholder="Name"/>
                <br/>
                <textarea id = "message" class="form-control" placeholder="Your Message Here"></textarea>
                <br/>
                <button id="send" class="btn btn-success" onClick={sendData} >Send</button>
            </div>
            <div id="messages"></div>
        </div>
    );
  }
}

export default App;
