import React, { Component } from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';
// must send color to message because of parent/children relation : app -> messageList -> message ( check in react devtool if u see message props)
class MessageList extends Component {
  render() {
    let listMessages = this.props.messages.map((chattyData) => {
      switch(chattyData.type) {
        case 'incomingMessage':
          return <Message 
            key= {chattyData.id}
            type= {chattyData.type}
            color= {chattyData.color}
            chattyAppUsername= {chattyData.username}
            chattyAppMessage={chattyData.content} 
          />
        case 'incomingNotification':
          return <Notification
            key= {chattyData.id}
            chattyAppMessage={chattyData.content} 
        />

      }
    })

// change here to render new message from the chatBar, not chattyDefaultApp
    return (
      <main className="messages">
        {
        listMessages
        }
      </main>
    );
  }
}
export default MessageList;