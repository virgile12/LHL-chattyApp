import React, { Component } from 'react';

class Message extends Component {
  render() {
    return (
      <div className="message">
        <span 
        className="message-username">{this.props.chattyAppUsername}
        </span>
        <span 
        className="message-content">{this.props.chattyAppMessage}
        </span>
      </div>
    );
  }
}

export default Message;