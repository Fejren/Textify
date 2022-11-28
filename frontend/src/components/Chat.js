import React, {useState} from 'react';

import WebSocketInstance from "../websocket";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";

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

  const renderTimestamp = timestamp => {
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

  const renderMessages = messages => {
    let array = messages.map((message, i, arr) => (<li
        key={message.id}
        style={{marginBottom: arr.length - 1 === i ? "300px" : "15px"}}
        className={message.author === currentUser.id ? "sent" : "replies"}
      >
        <p>
          {message.content}
          <br/>
          <small>{renderTimestamp(message.timestamp)}</small>
        </p>
      </li>
    ));

    return [...new Map(array.map(item =>
        [item['key'], item])).values()]
  };

  return (
    <div className={'chat'}>
      <div className={'chatInfo'}>
        {/*  TODO: zrób Tobiasz Szpak / czas wiadomości / ma się wysyłać jedna wiadomość */}
      </div>
      <div className="messages">
        <ul id="chat-log">
          {messages && renderMessages(messages)}
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
