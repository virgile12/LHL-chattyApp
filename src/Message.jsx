import React, { Component } from 'react';

class Message extends Component {
  render() {
    const userColor= {color: this.props.color}
    return (
      <div className="message">
        <span 

        // pass color on props to messagelist and apply css on message-username , inline style
        className="message-username" style={{color: userColor.color}}>{this.props.chattyAppUsername}
        </span>
        <span 
        className="message-content">{this.props.chattyAppMessage}
        </span>
      </div>
    );
  }
}

export default Message;