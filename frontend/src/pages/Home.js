import React from 'react';
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import * as messageActions from "../actions/message";
import WebSocketInstance from "../websocket";

const Home = ({isAuthenticated, setMessages, addMessage}) => {
  if (!isAuthenticated) {
    return <Navigate to='/login' />
  }
  WebSocketInstance.addCallbacks(
    setMessages.bind(this),
    addMessage.bind(this))

  return (
    <div className={"home"}>
      <div className={"container"}>
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    chats: state.message.chats
});

const mapDispatchToProps = dispatch => {
  return {
    addMessage: message => dispatch(messageActions.addMessage(message)),
    setMessages: messages => dispatch(messageActions.setMessages(messages)),
    getUserChats: (username, token) =>
      dispatch(messageActions.getUserChats(username, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);