import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    
// change here to render new message from the chatBar, not chattyDefaultApp
    return (
      <main className="messages">
        {
          this.props.messages.map((chattyData) => 
          <Message 
          // change this to id
          key= {chattyData.id} 

          chattyAppUsername= {chattyData.username} 
          chattyAppMessage={chattyData.content} 
          />)
        }
        <div className="message system">
        </div>
      </main>
    );
  }
}
export default MessageList;