import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Provider, connect}   from 'react-redux';
import {createStore, combineReducers} from 'redux';

let delay = ms => new Promise (r => setTimeout(() => r(ms), ms))

let store = createStore((state, action) => { //единственный редьюсер данного хранилища
    if (state === undefined){ //redux запускает редьюсер хотя бы раз, что бы инициализировать хранилище
        return {sendStatus: "EMPTY"};  //обязательно вернуть новый объект, а не изменить текущий state
    }
    if (action.type === 'SEND_STATUS'){ //в каждом action должен быть type
        return {sendStatus: action.sendStatus} //создаем новый объект базируясь на данных из предыдущего состояния
    }
    return state; //редьюсеров может быть несколько, в таком случае вызываются все редьюсеры, но далеко не всегда action.type будет относится к этому редьюсеру. Тогда редьюсер должен вернуть state как есть.
})

store.subscribe(()=> console.log(store.getState()))

function action(name, msg){
    fetch("http://localhost:4000/messages",
       {
           headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
           },
           method: "POST",
           body: JSON.stringify({nickname: name, message: msg })
       })
       .then(() => (
           store.dispatch({
           type: "SEND_STATUS",
           sendStatus:"RESOLVED"
       })
   ))
    return {
        type: "SEND_STATUS",
        sendStatus:"PENDING"
    }
}

store.dispatch(action())

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
let View = connect(s => s)(props => <div>{props.sendStatus}</div>)
let I = connect(null, {onSend: action})(Input)

class App extends Component {
  render() {
    return (
        <Provider store = {store} >
            <div className="App container">
                <h1 className="display-4">Send Message</h1>
                <I/>
                <View/>
                <Chat></Chat>
            </div>
        </Provider>
    );
  }
}

export default App;
