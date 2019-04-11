import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const chattyDefaultData = {
  currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
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

class App extends Component {
  constructor(props) {
    super(props);

    this.state = chattyDefaultData;



  }
  componentDidMount() {
    const socketUrl = 'ws://localhost:3001'
    
    this.socket = new WebSocket(socketUrl);
    this.socket.onopen = this.handleOnOpen;
    this.socket.onmessage= this.handleOnMessage;
    this.socket.onerror = this.handleOnError;
    
  }
  // function i call when the messages are submitted. Create object like newmessage, add to state.
  handleInsertMessage = (content, username) => {
    const newMessage = {
      id: this.state.messages.length + 1,
      username: username,
      content: content
    };
    this.setState({messages:[...this.state.messages, newMessage]})
    }
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} handleInsertMessage={this.handleInsertMessage}/>
      </div>
    );
  }
}
export default App;