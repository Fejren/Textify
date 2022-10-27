import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Button } from 'react-bootstrap';

import {Navigate} from "react-router-dom";
import {connect} from "react-redux";

import {reset_password_confirm} from "../actions/auth";

const ResetPasswordConfirm = ({ match, reset_password_confirm }) => {
  const [requestSent, setRequestSent] = useState(false)
  const [formData, setFormData] = useState({
    new_password: '',
    re_new_password: ''
  });

  const { new_password, re_new_password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});
  const onSubmit = e => {
    e.preventDefault();

    const uid = match.params.uid;
    const token = match.params.token;

    reset_password_confirm(uid, token, new_password, re_new_password)
    setRequestSent(true)
  };

  if (requestSent) {
    return <Navigate to='/' />
  }
    return (
      <div className={"formContainer"}>
        <div className={"formWrapper"}>
          <Form.Text className={"logo"}>Textify</Form.Text>
          <Form.Text className={"title"}>Resetowanie hasła</Form.Text>
          <Form className={"form"} onSubmit={e => onSubmit(e)}>
            <Form.Control
              className={"input"}
              placeholder={"Nowe hasło"}
              type={"password"}
              name={"new_password"}
              value={new_password}
              onChange={e => onChange(e)}
              required
            />
            <Form.Control
              className={"input"}
              placeholder={"Potwierdź hasło"}
              type={"password"}
              name={"re_new_password"}
              value={re_new_password}
              onChange={e => onChange(e)}
              required
            />
            <Button className={"button"} type={"submit"}>Zresetuj hasło</Button>
          </Form>
        </div>
      </div>
    );
}

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);