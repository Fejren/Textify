import React from 'react';

const Messages = ({ messages, currentUser }) => {

  const renderTimestamp = timestamp => {
    let prefix = "";
    const timeDiff = Math.round(
      (new Date().getTime() - new Date(timestamp).getTime()) / 60000
    );
    if (timeDiff < 1) {
      // less than one minute ago
      prefix = "teraz";
    } else if (timeDiff < 60) {
      // less than sixty minutes ago
      prefix = `${timeDiff} minut temu`;
    } else if (timeDiff < 24 * 60 && timeDiff > 60) {
      // less than 24 hours ago
      prefix = `${Math.round(timeDiff / 60)} godzin temu`;
    } else if (timeDiff < 31 * 24 * 60 && timeDiff > 24 * 60) {
      // less than 7 days ago
      prefix = `${Math.round(timeDiff / (60 * 24))} dni temu`;
    } else {
      prefix = `${new Date(timestamp)}`;
    }
    return prefix;
  };

  const renderMessages = messages => {
    let array = messages.map((message, i, arr) => (<li
        key={message.id}
        style={{marginBottom: arr.length - 1 === i ? "15px" : "15px"}}
        className={message.author === currentUser.id ? "sent" : "replies"}
      >
          <div className={'messageInfo'}>
            <img src={''}/>
            <span>{renderTimestamp(message.timestamp)}</span>
          </div>
          <div className={'messageContent'}>
            <p>{message.content}</p>
          </div>
      </li>
    ));

    return [...new Map(array.map(item =>
      [item['key'], item])).values()]
  };
    return renderMessages(messages)
}

export default Messages;