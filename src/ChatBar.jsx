import React, { Component } from 'react';


// onClick
class ChatBar extends Component {
    state = {
      username: this.props.currentUser.name,
      content: ''
    } 
    
  handleInsertMessage = (evt) => {
    if (evt.key === 'Enter'){
        console.log('Submitting new Message ...');
        // this.setState({[evt.target.username]: evt.target.username,
        //                [evt.target.content]: evt.target.content    
        // })
        console.log(this.state)
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

  onChangeUsername = (evt) => {
      this.setState({
          username: evt.target.value
      })
  }
  // will need a new state in chatBar which will have its own content, username
  // need state with default value and onChange event Handler.
  // store inputs into state, capture with the If and then you send it over.. call the props, methods passdown
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" onChange={this.onChangeUsername} defaultValue={this.props.currentUser.name} placeholder={this.props.currentUser.name} />
        <input className="chatbar-message" onChange={this.onChangeMessage} onKeyUp={this.handleInsertMessage} placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}

export default ChatBar;