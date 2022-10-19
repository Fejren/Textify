import React from 'react';

const Search = () => {

  return (
    <div className={"search"}>
      <div className={"searchForm"}>
        <input type={"text"} placeholder={"Znajdź użytkownika"}/>
      </div>
      <div className={"userChat"}>
        <img />
        <div className={"userChatInfo"}>
          <span>Dawid Zaręba</span>
        </div>
      </div>
    </div>
  )
}

export default Search;