import React from 'react';

const Chats = props => {

  return (
    <div className={"chats"}>
      <div className={"userChat"}>
        <img />
        <div className={"userChatInfo"}>
          <span>{props.contact}</span>
        </div>
      </div>
    </div>
  )
}

export default Chats;