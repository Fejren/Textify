import React from 'react';
import {Link} from "react-router-dom";

const Chats = props => {

  return (
    <div className={"chats"}>
      <div className={"userChat"}>
        <img />
        <div className={"userChatInfo"}>
          <Link className={'link'} to={props.chatURL}>{props.contact}</Link>
        </div>
      </div>
    </div>
  )
}

export default Chats;