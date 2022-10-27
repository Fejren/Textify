import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Button } from 'react-bootstrap';

import {Navigate} from "react-router-dom";
import {connect} from "react-redux";

import {reset_password} from "../actions/auth";

const ResetPassword = ({ reset_password }) => {
  const [requestSent, setRequestSent] = useState(false)
  const [formData, setFormData] = useState({
    email: ''
  });

  const { email } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});
  const onSubmit = e => {
    e.preventDefault();
    reset_password(email)
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
              placeholder={"Email"}
              type={"email"}
              name={"email"}
              value={email}
              onChange={e => onChange(e)}
              required
            />
            <Button className={"button"} type={"submit"}>Zresetuj hasło</Button>
          </Form>
        </div>
      </div>
    );
}

export default connect(null, { reset_password })(ResetPassword);