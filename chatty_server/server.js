const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid');

// Set the port to 3001
const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on port ${ PORT }`));

const wss = new SocketServer({ server });

const clientListNb = {counter: 0};

const getColor = () => {
  return `#${uuidv4().slice(0, 6)}`;
};

console.log(getColor())

// const connectUser = (username, usernameList) => {
//     const usernameId = uuidv4();

//     const inputMsg = {
//         id: usernameId,
//         username: ``
//     }
// }

// // add client here -------------------------
// const addClient = (client, clientInfo) => {
//     clientList[clientInfo.id] = {
//       id: clientInfo.id,
//       username: clientInfo.username,
//     }
//     client.id= cleintInfo.id
// }

const clientSizeCounter = (counter) => {
  const clientSize =  {
    type: 'clientCount',
    numberOfClient: counter
  }
  return clientSize
};

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data)
  })
}

wss.on('connection', (ws) => {

  console.log('Client connected');

  clientListNb.counter = wss.clients.size
  
  wss.broadcast(JSON.stringify(clientSizeCounter(clientListNb.counter)))

  ws.on('message', (messageObj) => {

    const parsedMsg = JSON.parse(messageObj);

    switch(parsedMsg.type) {
      case "postNotification":
        parsedMsg.type = 'incomingNotification';
        parsedMsg.id = uuidv4();
        wss.broadcast(JSON.stringify(parsedMsg));
        break;
      case "postMessage":
        parsedMsg.type = 'incomingMessage';
        parsedMsg.id = uuidv4();
        console.log('changing id', parsedMsg);
        wss.broadcast(JSON.stringify(parsedMsg));
        break;
      default:
        console.error('Uh oh ... something went wrong!')
    }
  });
  
  ws.on('close', () => {
    console.log('Client disconnected');
    clientListNb.counter = wss.clients.size
    wss.broadcast(JSON.stringify(clientSizeCounter(clientListNb.counter)))
  });
 
});