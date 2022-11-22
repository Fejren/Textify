import React, {Component} from 'react';
import Navbar from "./Navbar";
import Search from './Search';
import Chats from './Chats';
import * as messageActions from "../actions/message";
import {connect} from "react-redux";

class Sidebar extends Component {

  waitForDetails() {
    let isAuthenticated = this.props.isAuthenticated
    let currentUser = {...this.props.user}
    let getUserChats = this.props.getUserChats
    const component = this;
    console.log(this.props.access)
    setTimeout(function() {
      if (
        isAuthenticated
      ) {
        console.log(currentUser)
        getUserChats(
          currentUser.id,
        );
        return;
      } else {
        console.log("waiting for details...");
        component.waitForDetails()
      }
    }, 1000);
  }

  componentDidMount() {
    this.waitForDetails();
  }

  render() {
    let activeChats = this.props.chats.map(c => {
      return (
        <Chats
          key={c.id}
          contact={c.participants[0]}
          picURL="http://emilcarlsson.se/assets/louislitt.png"
          status="busy"
          chatURL={`/${c.id}`}
        />
      );
    });
    return (
    <div className={"sidebar"}>
      <Navbar />
      <Search />
      <ul>
        {activeChats}
      </ul>
    </div>
    );
  }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.access,
    user: state.auth.user,
    chats: state.message.chats
});

const mapDispatchToProps = dispatch => {
  return {
    getUserChats: (userId, token) =>
      dispatch(messageActions.getUserChats(userId, token))
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);