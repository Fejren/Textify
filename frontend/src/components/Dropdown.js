import React , { useState } from 'react';
import { ReactComponent as CaretIcon } from '../assets/img/caret.svg';
import { ReactComponent as CogIcon } from '../assets/img/cog.svg';
import { ReactComponent as LogoutIcon } from '../assets/img/logout.svg';
import {connect} from "react-redux";
import {logout} from "../actions/auth";
import {Navigate} from "react-router-dom";


const Dropdown = ({ logout }) => {
    const [redirect, setRedirect] = useState(false);
    const [ display, setDisplay ] = useState('none');

    const handleClick = () => {
        if ( display === 'none') {
            setDisplay('block');
        }else{
            setDisplay('none');
        }
    }

    const handleLogout = () => {
      logout();
      setRedirect(true);
    }

    return (
        <div>
            <button
            onClick={handleClick}
            className={'dropdown-btn'}
            >
                <CaretIcon className={'caret-img'}/>
            </button>
            <div
                style={{display:display}}
                className={'dropdown-menu'}
            >
                <div className={'dropdown-item'}>
                    <CogIcon className={'dropdown-img'}/>
                    <p>Ustawienia</p>
                </div>
                <div
                  className={'dropdown-item'}
                  onClick={() => handleLogout()}
                >
                    <LogoutIcon className={'dropdown-img'}/>
                    <p>Wyloguj</p>
                </div>
            </div>
          {redirect ? <Navigate to='/login' /> : null}
        </div>
    );
}

export default connect(null,{ logout })(Dropdown);