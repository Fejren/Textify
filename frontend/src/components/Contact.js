import React from 'react';
import {Link} from "react-router-dom";

const Contact = ({chatURL, contact}) => {

  return (
    <div className={"chats"}>
      <div className={"userChat"}>
        <img src={''}/>
        <div className={"userChatInfo"}>
          <Link className={'chatlink'} to={chatURL}>{contact.first_name} {contact.last_name}</Link>
        </div>
      </div>
    </div>
  )
}

export default Contact;