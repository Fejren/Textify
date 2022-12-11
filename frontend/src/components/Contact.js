import React from 'react';
import {Link} from "react-router-dom";

const Contact = props => {

  return (
      <div className={"userChat"}>
        <img src={''}/>
        <div className={"userChatInfo"}>
          <Link className={'chatlink'} to={props.chatURL}>{props.contact}</Link>
        </div>
    </div>
  )
}

export default Contact;