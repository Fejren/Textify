import React, {useState} from 'react';

import {Link, Navigate} from "react-router-dom";
import { connect } from 'react-redux';

import {Button, Form} from "react-bootstrap";
import { verify } from '../actions/auth'

const Activate = ({ verify, match }) => {
  const [verified, setVerified] = useState(false)

  const verify_account = () => {
    const uid = match.params.uid;
    const token = match.params.token;

    verify(uid, token);
    setVerified(true);
  };

  if (verified) {
    return <Navigate to='/' />
  }

  return (
    <div className={"formContainer"}>
      <div className={"formWrapper"}>
        <Form.Text className={"logo"}>Textify</Form.Text>
        <Form.Text className={"title"}>Aktywuj konto</Form.Text>
          <Button type={"submit"} className={"button"} onClick={verify_account}>Zaloguj się</Button>
      </div>
    </div>
  );
}

export default connect(null, { verify })(Activate);