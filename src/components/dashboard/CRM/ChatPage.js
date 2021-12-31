import React, {Component} from 'react'
import {Launcher} from 'react-chat-window'
 
class ChatPage extends Component {
 
    
  constructor() {
    super();
    this.state = {
      messageList: [{
        author: 'them',
        type: 'text',
        data: {
            text: 'Hi'
          }
      },{
        author: 'them',
        type: 'text',
        data: {
            text: 'Eupraxia'
          }
      }]
    };
  }
 
 
  _onMessageWasSent(message) {
    this.setState({
      messageList: [...this.state.messageList, message]
    })
  }
 
  _sendMessage(text) {
    if (text.length > 0) {
      this.setState({
        messageList: [...this.state.messageList, {
          author: 'them',
          type: 'text',
          data: { text }
        }]
      })
    }
  }
 
  render() {
    return (<div>
      <Launcher
        agentProfile={{
          teamName: 'Agent Chat Window',
          //imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
        }}
        onMessageWasSent={this._onMessageWasSent.bind(this)}
        messageList={this.state.messageList}
        showEmoji
      />
    </div>)
  }
}

export default ChatPage;