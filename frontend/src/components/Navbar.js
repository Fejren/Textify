import React from 'react';

const Navbar = () => {
  return (
    <div className={"navbar"}>
      <span className={"logo"}>Textify</span>
      <div className={"user"}>
        <img className={"img"} src={""} alt={""}/>
        <span className={"name"}>Patryk Wąsowski</span>
        <button className={"button"}>Wyloguj</button>
      </div>
    </div>
  )
}

export default Navbar;