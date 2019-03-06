import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import index from './index.js'

function sendData() {
  var msg = document.getElementById('message').value
  var name = document.getElementById('name').value
  console.log(msg, name)
  fetch("http://localhost:4000/messages",
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({nickname: name, message: msg})
    })

}

let delay = ms => new Promise (r => setTimeout(() => r(ms), ms))

class Chat extends Component {
    constructor (props) {
        super()
        this.state = {data: []}
    }

    async componentDidMount() {
        while (true) {
            await delay(2000)
            let data = await (await fetch('http://localhost:4000/messages')).json()
            this.setState({data})
            console.log(data)
        }
    }

    render() {
        return (
            <div>
                <div>{this.state.data.length ? this.state.data.map(msg => <div>{msg.nickname} : {msg.message}</div>): "loading..."}</div>
            </div>
        );
    }
}

class Input extends Component{

    render() {
        return (
        <div className="jumbotron">
            <br/>
            <input id = "name" className="form-control" placeholder="Name" ref = {nick => this.nickname = nick} onChange = {console.log(this.nick)}/>
            <br/>
            <textarea id = "message" className="form-control" placeholder="Your Message Here" ref = {msg => this.message = msg}></textarea>
            <br/>
            <button className="btn btn-success" onClick = {sendData}>Send</button>
        </div>
    )}
}
// let ChatMessage = props => <div>{this.state.data.length ? this.state.data.map(msg => <div>{msg.nickname} : {msg.message}</div>): "loading..."}</div>

class App extends Component {
  render() {
    return (
        <div className="App container">
            <h1 className="display-4">Send Message</h1>
            <Input></Input>
            <Chat></Chat>
        </div>

    );
  }
}




export default App;
