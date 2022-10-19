import React from 'react';
import Attach from '../img/attach.png';
import Img from '../img/img.png';

const Input = () => {

  return (
    <div className={"messageInput"}>
      <input type={"text"} placeholder={"Napisz wiadomość..."}/>
      <div className={"send"}>
        <img src={Attach} alt={""}/>
        <input type={"file"} style={{display:"none"}} id={"file"}/>
        <label htmlFor={"file"}>
          <img src={Img} alt={""}/>
        </label>
        <button>Wyślij</button>
      </div>
    </div>
  )
}

export default Input;