import { createApp } from 'vue'
import App from './App.vue'
createApp(App).mount('#app')


//const https=require('https')

//client unter 8080
/*socket.onmessage = function (e) {
  console.log('Server: ' + e.data);
  console.log(connection)
};*/
//oder
//socket.onmessage=({data}) => {
//  console.log("Msg from server ",data);
//};
//document.querySelector('button').onclick = () =>{
//  socket.send('client: hello');
//}

/*
var https=require('https')
var server=https.createServer

var WebSocketServer = require('ws').Server;
//var wss1 = new WebSocket.Server;
//wss = new wss1({ server: server })
//wss = new WebSocketServer({ port: 8080 })
wss = new WebSocketServer({ server: server });
server.listen(8080,function(){
    console.log('listening on port '+server.address().port)
})
*/
/*
//var connection = new WebSocket('ws://html5rocks.websocket.org/echo', ['soap', 'xmpp']);
//var connection = new WebSocket('wss://127.0.0.1:8080');//, ['soap', 'xmpp']);
// When the connection is open, send some data to the server
connection.onopen = function () {
    connection.send('Ping'); // Send the message 'Ping' to the server
  };
  
  // Log errors
  connection.onerror = function (error) {
    console.log('WebSocket Error ' + error);
  };
  
  // Log messages from the server
  connection.onmessage = function (e) {
    console.log('Server: ' + e.data);
    console.log(connection)
  };

*/

//console.log(document)