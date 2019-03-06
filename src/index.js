import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));


// console.log('Hello')
// function sendData() {
//   console.log(1)
//   var msg = document.getElementById('message').value
//   var name = document.getElementById('name').value
//   console.log(msg, name)
//   fetch("http://127.0.0.1:4000/messages",
//     {
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         },
//         method: "POST",
//         body: JSON.stringify({nickname: name, message: msg})
//     })
// }
//
// function getData() {
//   fetch('http://127.0.0.1:4000/messages')
//     .then(function (response) {
//       response.json().then(function (data) {
//         console.log(data)
//         var messages = document.getElementById("messages")
//         messages.innerHTML = ""
//           for (var x in data) {
//             var p = document.createElement("p")
//             messages.appendChild(p).innerHTML = `${data[x].nickname}:${data[x].message}`
//           }
//       })
//       getData()
//     })
//
// }
//
// function update() {
//     setInterval( () => getData() , 2000)
// }
// update()
// getData()

serviceWorker.unregister();

// export default sendData();
