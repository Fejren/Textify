import React from 'react';
import Add from '../img/add.png';
import More from '../img/more.png';
import Messages from "./Messages";
import Input from "./Input";

const Chat = () => {

  return (
    <div className={"chat"}>
      <div className={"chatInfo"}>
        <span>Dawid Zaręba</span>
        <div className={"chatIcons"}>
          <img src={Add} alt={""}/>
          <img src={More} alt={""}/>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat;