import React, { Component } from 'react';

class ChatBar extends Component {
  state = {
    username: this.props.currentUser.name,
    content: ''
  } 

  handleInsertMessage = (evt) => {
    if (evt.key === 'Enter') {
      console.log(this.state);
      this.props.handleInsertMessage(this.state.content, this.state.username)

      // Clears the input field
      evt.target.value = '';
    }
  }

  onChangeMessage = (evt) => {
    this.setState({
      content: evt.target.value
    });
  }
  
  handleInsertUsername = (evt) => {
    if (evt.key === 'Enter') {
      console.log('Changing Username');
      this.props.onChangeUsername(this.state.username)
    }
  }

  onChangeUsername = (evt) => {
    this.setState({
      username : evt.target.value
    });
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" onChange={this.onChangeUsername} onKeyUp={this.handleInsertUsername}  placeholder={this.props.currentUser.name} />
        <input className="chatbar-message" onChange={this.onChangeMessage} onKeyUp={this.handleInsertMessage} placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}

export default ChatBar;