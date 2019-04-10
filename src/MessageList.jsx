import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        {
          this.props.messages.map((chattyData, key) => 
          <Message 
          key= {key} 
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