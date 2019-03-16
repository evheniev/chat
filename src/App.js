import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Provider, connect}   from 'react-redux';
import {createStore, combineReducers} from 'redux';

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
            <div className = "chat">
                <div>{this.state.data.length ? this.state.data.map(msg => <div>{msg.nickname} : {msg.message} TIME: {msg.timestamp}</div>): "loading..."}</div>
            </div>
        );
    }
}

class Input extends Component{
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChangeNick = this.handleChangeNick.bind(this);
        this.handleChangeMsg = this.handleChangeMsg.bind(this);
    }

    handleChangeNick(event) {
        this.setState({nick: event.target.value});
    }

    handleChangeMsg(event) {
        this.setState({msg: event.target.value});
    }


    // sendData() {
    //     console.log(this.nickname.value, this.message.value)
    //     fetch("http://localhost:4000/messages",
    //     {
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         method: "POST",
    //         body: JSON.stringify({nickname: this.nickname.value, message: this.message.value})
    //     })
    // }

    render() {
        return (
            <div className="jumbotron">
                <br/>
                <input  className="form-control" placeholder="Name" value={this.state.nick} onChange={this.handleChangeNick}/>
                <br/>
                <textarea  className="form-control" placeholder="Your Message Here" value={this.state.msg} onChange={this.handleChangeMsg}></textarea>
                <br/>
                <button className="btn btn-success" onClick = {() => this.props.onSend(this.state.nick, this.state.msg)}>Send</button>
            </div>
        )
    }
}

class App extends Component {
  render() {
    return (
        <div className="App container">
            <h1 className="display-4">Send Message</h1>
            <Input onSend={(nick,msg) => console.log(nick,msg)}></Input>
            <Chat></Chat>
        </div>
    );
  }
}

export default App;
