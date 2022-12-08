import React, {useState} from 'react';

import WebSocketInstance from "../websocket";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";
import Messages from "./Message";

const Chat = ({ user, messages }) => {
  let [message, setMessage] = useState("")
  let [isChat, setIsChat] = useState(null)
  let currentUser = {...user}
  let { chatId } = useParams()

  function initialiseChat() {
    waitForSocketConnection(() => {
      WebSocketInstance.fetchMessages(
        currentUser.id,
        chatId
      );
    });
    console.log(chatId)
    WebSocketInstance.connect(chatId)
  }

  if (!isChat && chatId) {
    setIsChat(1)
    initialiseChat()
  } else if (!chatId) {
    messages = null;
  }

  function waitForSocketConnection(callback) {
    setTimeout(function () {
      if (WebSocketInstance.state() === 1) {
        console.log("Connection is made")
        callback();
        return;
      } else {
        console.log("Waiting for connection...")
        waitForSocketConnection(callback)
      }
    }, 1000)
  }

  const sendMessageHandler = event => {
    event.preventDefault();
    const messageObject = {
      from_user: currentUser,
      content: message,
      chatId: chatId
    };
    WebSocketInstance.newChatMessage(messageObject)
    setMessage("");
  }

  return (
    <div className={'chat'}>
      <div className={'chatInfo'}>
        {/*  TODO: zrób Tobiasz Szpak / czas wiadomości */}
      </div>
      <div className="messages">
        <ul id="chat-log">
          {messages && <Messages
            messages={messages}
            currentUser={currentUser}
          />}
          <div
            style={{float: "left", clear: "both"}}
          />
        </ul>
      </div>
      <div className="messageInput">
        <form onSubmit={sendMessageHandler}>
          {chatId ? <input
            onChange={(e)=>setMessage(e.target.value)}
            value={message}
            required
            id="chat-message-input"
            type="text"
            placeholder="Napisz wiadomość..."
            autoComplete={'false'}
          /> : <p>Wybierz kontakt</p>}
          <i className="fa fa-paperclip attachment" aria-hidden="true"/>
          {chatId && <button id="chat-message-submit" className="submit">
            Wyslij
            <i className="fa fa-paper-plane" aria-hidden="true"/>
          </button>}
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    messages: state.message.messages
  };
}

export default connect(mapStateToProps)(Chat);
