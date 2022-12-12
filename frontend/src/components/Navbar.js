import React, {useState} from 'react';
import { logout } from '../actions/auth'
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import Dropdown from './Dropdown';


const Navbar = ({ logout, user }) => {
  const [redirect, setRedirect] = useState(false);
  const currentUser = {...user}
  console.log(currentUser)

  const handleLogout = () => {
    logout();
    setRedirect(true);
  }


  return (
    <div className={"navbar"}>
      <span className={"logo"}>Textify</span>
      <div className={"user"}>
        <img className={"img"} src={currentUser.avatar} alt={""}/>
        <span className={"name"}>{currentUser.first_name} {currentUser.last_name}</span>

        <Dropdown/>

      </div>
      {redirect ? <Navigate to='/login' /> : null}
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, { logout })(Navbar);
