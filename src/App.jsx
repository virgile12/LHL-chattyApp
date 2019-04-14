import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      currentUser: {
        name:'Bob'
      }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 0,
          username: 'Bob',
          content: 'Has anyone seen my marbles?',
          type:'incomingMessage',
          color: 'red'
        },
      ]
    }
  }

  handleOnOpen = evt => {
    console.log('connected to websocket server');
  }

  handleOnError = evt => {
    console.log('Uh Oh ... something happened, please reconnect!');
  }

  componentDidMount() {
    const socketUrl = 'ws://localhost:3001';
    
    this.socket = new WebSocket(socketUrl);
    this.socket.onopen = this.handleOnOpen;
    this.socket.onmessage= this.handleOnMessage;
    this.socket.onerror = this.handleOnError;
 
  }

  // sending message from CLIENT to SERVER. Parsing the message to JSON type. Setting state for the parsedMsg + sorted with spread operator.
  handleOnMessage = message => {

    console.log('receiving msg', message);

    const parsedReceivedMsg = JSON.parse(message.data);

      switch(parsedReceivedMsg.type) {
        case 'incomingMessage':
        this.setState({messages:[...this.state.messages, parsedReceivedMsg],});
        break; 

        case 'incomingNotification':
        this.setState({messages:[...this.state.messages, parsedReceivedMsg],});
        break;

        case 'clientCount':
        this.setState({counter: parsedReceivedMsg.numberOfClient})
        break;
      }
  };

  sendNotification = message => {
    const outputMsg = {
      type: 'postNotification',
      content: message,
    };
    this.socket.send(JSON.stringify(outputMsg));
  };

  // function  call when the messages are submitted. Create object  newMessage, strigify the newMessage obj to socketWeb server
  handleInsertMessage = (content) => {
    const newMessage = {
      id: this.state.messages.length + 1,
      username: this.state.currentUser.name,
      content: content,
      type: 'postMessage',
      color: this.state.messages.color
    };
    this.socket.send(JSON.stringify(newMessage))
  }

  onChangeUsername = username => {
    console.log('changing username', username)
    const message = `${this.state.currentUser.name
      } changed name to ${username}`;

    this.sendNotification(message);
    this.setState({
      currentUser: {...this.state.currentUser, name: username } ,
    });
  };


  // each message will have current user and current color

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="client-counter" >{this.state.counter} users online</span>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar onChangeUsername={this.onChangeUsername} currentUser={this.state.currentUser} handleInsertMessage={this.handleInsertMessage}/>
      </div>
    );
  }
}
export default App;