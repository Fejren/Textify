import React , { useState } from 'react';
import { ReactComponent as CaretIcon } from '../assets/img/caret.svg';
import { ReactComponent as CogIcon } from '../assets/img/cog.svg';
import { ReactComponent as LogoutIcon } from '../assets/img/logout.svg';


const Dropdown = () => {

    const [ display, setDisplay ] = useState('none');

    const handleClick = () => {
        if ( display == 'none') {
            setDisplay('block');
        }else{
            setDisplay('none');
        }
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
                <div className={'dropdown-item'}>
                    <LogoutIcon className={'dropdown-img'}/>
                    <p>Wyloguj</p>
                </div>
            </div>
        </div>
    );
}

export default Dropdown;