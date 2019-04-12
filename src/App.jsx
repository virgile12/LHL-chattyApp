import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name:'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 0,
          username: 'Bob',
          content: 'Has anyone seen my marbles?'
        },
        { 
          id: 1,
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        }
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
    const socketUrl = 'ws://localhost:3001'
    
    this.socket = new WebSocket(socketUrl);
    this.socket.onopen = this.handleOnOpen;
    this.socket.onmessage= this.handleOnMessage;
    this.socket.onerror = this.handleOnError;
 
  }

  // sending message from CLIENT to SERVER
  handleOnMessage = message => {
  
    console.log('freaking message sent', message);
    const parsedReceivedMsg = JSON.parse(message.data)
    this.setState({messages:[...this.state.messages, parsedReceivedMsg]})

  }

  // function  call when the messages are submitted. Create object  newMessage, add to state.
  handleInsertMessage = (content, username) => {
    const newMessage = {
      id: this.state.messages.length + 1,
      username: username,
      content: content
    };
    this.socket.send(JSON.stringify(newMessage))
  }
  
  onChangeUsername = username => {
    console.log(username)
   this.setState({username: username})
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar onChangeUsername={this.onChangeUsername} currentUser={this.state.currentUser} handleInsertMessage={this.handleInsertMessage}/>
      </div>
    );
  }
}
export default App;