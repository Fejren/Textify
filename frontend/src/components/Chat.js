import React, {Component} from "react";
import { connect } from "react-redux";
import WebSocketInstance from "../websocket";
import {useParams} from "react-router-dom";

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />
}

class Chat extends Component {
  state = { message: "" };
  currentUser = {...this.props.user}
  chatId = 3

  initialiseChat() {
    this.waitForSocketConnection(() => {
      WebSocketInstance.fetchMessages(
        this.currentUser.id,
        this.chatId
      );
    });
    console.log(this.chatId);
    WebSocketInstance.connect(this.chatId);
  }

  constructor(props) {
    super(props);
    this.initialiseChat();
  }

  waitForSocketConnection(callback) {
    const component = this;
    setTimeout(function() {
      if (WebSocketInstance.state() === 1) {
        console.log("Connection is made");
        callback();
        return;
      } else {
        console.log("wait for connection...");
        component.waitForSocketConnection(callback);
      }
    }, 10000);
  }

  messageChangeHandler = event => {
    this.setState({ message: event.target.value });
  };

  sendMessageHandler = e => {
    e.preventDefault();
    const messageObject = {
      from_user: this.currentUser,
      content: this.state.message,
      chatId: this.chatId
    };
    WebSocketInstance.newChatMessage(messageObject);
    this.setState({ message: "" });
  };

  renderTimestamp = timestamp => {
    let prefix = "";
    const timeDiff = Math.round(
      (new Date().getTime() - new Date(timestamp).getTime()) / 60000
    );
    if (timeDiff < 1) {
      // less than one minute ago
      prefix = "teraz";
    } else if (timeDiff < 60 && timeDiff > 1) {
      // less than sixty minutes ago
      prefix = `${timeDiff} minut temu`;
    } else if (timeDiff < 24 * 60 && timeDiff > 60) {
      // less than 24 hours ago
      prefix = `${Math.round(timeDiff / 60)} godzin temu`;
    } else if (timeDiff < 31 * 24 * 60 && timeDiff > 24 * 60) {
      // less than 7 days ago
      prefix = `${Math.round(timeDiff / (60 * 24))} dni temu`;
    } else {
      prefix = `${new Date(timestamp)}`;
    }
    return prefix;
  };

  renderMessages = messages => {
    const currentUser = `${this.currentUser.first_name} ${this.currentUser.last_name}`
    return messages.map((message, i, arr) => (
      <li
        key={message.id}
        style={{ marginBottom: arr.length - 1 === i ? "300px" : "15px" }}
        className={message.author === currentUser ? "sent" : "replies"}
      >
        <p>
          {message.content}
          <br />
          <small>{this.renderTimestamp(message.timestamp)}</small>
        </p>
      </li>
    ));
  };

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  // componentWillReceiveProps(newProps) {
  //   if (this.chatId !== newProps.match.params.chatId) {
  //     WebSocketInstance.disconnect();
  //     this.waitForSocketConnection(() => {
  //       WebSocketInstance.fetchMessages(
  //         this.currentUser.id,
  //         newProps.match.params.chatId
  //       );
  //     });
  //     WebSocketInstance.connect(newProps.match.params.chatId);
  //   }
  // }


  render() {
    return (
      <>
        <div className="messages">
          <ul id="chat-log">
            {this.props.messages && this.renderMessages(this.props.messages)}
            <div
              style={{ float: "left", clear: "both" }}
              ref={el => {
                this.messagesEnd = el;
              }}
            />
          </ul>
        </div>
        <div className="message-input">
          <form onSubmit={this.sendMessageHandler}>
            <div className="wrap">
              <input
                onChange={this.messageChangeHandler}
                value={this.state.message}
                required
                id="chat-message-input"
                type="text"
                placeholder="Write your message..."
              />
              <i className="fa fa-paperclip attachment" aria-hidden="true" />
              <button id="chat-message-submit" className="submit">
                <i className="fa fa-paper-plane" aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    messages: state.message.messages
  };
};

export default connect(mapStateToProps)(Chat);