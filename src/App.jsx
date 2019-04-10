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


/* 1. Function we passed through props to the ChatBar component is called ...
   2.this.setState is called with a new array that contains a new message
   3. Will trigger React to call our componenets render() method
   4. the new state is passed to all children of the App component
*/




class App extends Component {
  constructor(props) {
    super(props);

    this.state = chattyDefaultData;
  }
  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      this.setState({messages:[...this.state.messages, newMessage]})
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
    }, 3000);
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