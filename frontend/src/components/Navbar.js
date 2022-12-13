import React, {useState} from 'react';
import { logout } from '../actions/auth'
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import Dropdown from './Dropdown';


const Navbar = ({ user }) => {

  const currentUser = {...user}

  console.log(currentUser)

  return (
    <div className={"navbar"}>
      <span className={"logo"}>Textify</span>
      <div className={"user"}>
        <img className={"img"} src={currentUser.avatar} alt={""}/>
        <span className={"name"}>{currentUser.first_name} {currentUser.last_name}</span>
        <Dropdown/>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, null)(Navbar);
