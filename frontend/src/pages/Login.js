import React, {useState} from 'react';

import {Link, Navigate} from "react-router-dom";
import { connect } from 'react-redux';

import {Button, Form} from "react-bootstrap";
import { login } from '../actions/auth'

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});
  const onSubmit = e => {
    e.preventDefault();
    login(email, password)
  };

  if (isAuthenticated) {
    return <Navigate to='/' />
  }

  return (
    <div className={"formContainer"}>
      <div className={"formWrapper"}>
        <Form.Text className={"logo"}>Textify</Form.Text>
        <Form.Text className={"title"}>Logowanie</Form.Text>
        <Form className={"form"} onSubmit={e => onSubmit(e)}>
          <Form.Control
            className={"input"}
            placeholder={"Adres E-mail"}
            type={"email"}
            name={'email'}
            value={email}
            onChange={e => onChange(e)}
            required
          />
          <Form.Control
            className={"input"}
            placeholder={"Hasło"}
            type={"password"}
            name={'password'}
            value={password}
            onChange={e => onChange(e)}
            required
          />

          <Button type={"submit"} className={"button"}>Zaloguj się</Button>
        </Form>
        <Form.Text className={"p"}>Nie masz konta? <Link className={'link'} to="/register">Zarejestruj się</Link></Form.Text>
        <Form.Text className={"p"}>Nie pamiętasz hasła? <Link className={'link'} to="/reset-password">Zresetuj hasło</Link></Form.Text>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);