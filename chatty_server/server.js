const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid');

// Set the port to 3001
const PORT = 3001;


const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on port ${ PORT }`));


const wss = new SocketServer({ server });

// const connectUser = (username, usernameList) => {
//     const usernameId = uuidv4();

//     const inputMsg = {
//         id: usernameId,
//         username: ``
//     }
// }

// add client here -------------------------
// const addClient = (client, clientInfo) => {
//     clientList[clientInfo.id] = {
//         id: 
//     }
// }
// ---------------------------------

wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        client.send(data)
    })
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
//   ws.on('message', (message) => {
//     const inputMessage = JSON.parse(message);
//     const wsMessageObj = {
//         id: inputMessage.id,
//         username: inputMessage.username,
//         content: inputMessage.content
//     }
//     wss.broadcast(JSON.stringify(wsMessageObj))
// });

  ws.on('message', (messageObj) => {
    const parsedMsg = JSON.parse(messageObj);
    console.log('received message:', parsedMsg);
    parsedMsg.id = uuidv4();
    console.log('changing id', parsedMsg)
    wss.broadcast(JSON.stringify(parsedMsg))

  });
  

  ws.on('close', () => console.log('Client disconnected'));
});