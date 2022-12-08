import React, {useState} from 'react';
import { logout } from '../actions/auth'
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import { Button , Dropdown} from "react-bootstrap";
import { ReactComponent as ChevronIcon } from '../assets/img/chevron.svg';
import { ReactComponent as CogIcon } from '../assets/img/cog.svg';
import { ReactComponent as LogoutIcon } from '../assets/img/logout.svg';
import { ReactComponent as CaretIcon } from '../assets/img/caret.svg';

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


        <Dropdown>
          <Dropdown.Toggle
              className={'dropdown-button'}
          >
            {/*<CaretIcon/>*/}
            <ChevronIcon className={'chevron'}/>
          </Dropdown.Toggle>

          <Dropdown.Menu
              className={'dropdown-menu'}
          >
            <Dropdown.Item
                className={'dropdown-item'}
            >
              <CogIcon className={'dropdown-img'}/>
              <p>Ustawienia</p>
            </Dropdown.Item>
            <Dropdown.Item
                className={'dropdown-item'}
            >
              <LogoutIcon className={'dropdown-img'}/>
              <p className={''} onClick={() => handleLogout()}>Wyloguj</p>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

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
