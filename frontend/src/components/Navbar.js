import React from 'react';
import {connect} from "react-redux";
import Dropdown from './Dropdown';


const Navbar = ({ user }) => {

  const currentUser = {...user}

  console.log(currentUser)

  return (
    <div className={"navbar"}>
      <span className={"logo"}>Textify</span>
      <div className={"user"}>
        <img className={"img"} src={currentUser.avatar} alt={"avatar"}/>
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
