import React, {useState} from 'react';
import { logout } from '../actions/auth'
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import {Button} from "react-bootstrap";

const Navbar = ({ logout, isAuthenticated, user }) => {
  const [redirect, setRedirect] = useState(false);
  const user_data = {...user};

  const handleLogout = () => {
    logout();
    setRedirect(true);
  }


  return (
    <div className={"navbar"}>
      <span className={"logo"}>Textify</span>
      <div className={"user"}>
        <img className={"img"} src={""} alt={""}/>
        <span className={"name"}>{user_data.first_name} {user_data.last_name}</span>
        <Button className={'btn'} onClick={() => handleLogout()}>Wyloguj</Button>
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
