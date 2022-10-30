import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {Link, Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {register} from "../actions/auth";

const Register = ({register, isAuthenticated}) => {
  const [accountCreated, setAccountCreated] = useState(false);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    re_password: ''
  });
  const { first_name, last_name, email, password, re_password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});
  const onSubmit = e => {
    e.preventDefault();
    if (password === re_password) {
      register(first_name, last_name, email, password, re_password);
      setAccountCreated(true);
    }
  };

  if (isAuthenticated) {
    return <Navigate to='/login' />
  }
  if (accountCreated) {
    return <Navigate to='/login' />
  }

  return (
    <div className={"formContainer"}>
      <div className={"formWrapper"}>
        <Form.Text className={"logo"}>Textify</Form.Text>
        <Form.Text className={"title"}>Rejestracja</Form.Text>
        <Form className={"form"} onSubmit={e => onSubmit(e)}>
          <Form.Control
            className={"input"}
            placeholder={"Imię"}
            type={"text"}
            name={"first_name"}
            value={first_name}
            onChange={e => onChange(e)}
            required
          />
          <Form.Control
            className={"input"}
            placeholder={"Nazwisko"}
            type={"text"}
            name={"last_name"}
            value={last_name}
            onChange={e => onChange(e)}
            required
          />
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
            name={"password"}
            value={password}
            onChange={e => onChange(e)}
            required
          />
          <Form.Control
            className={"input"}
            placeholder={"Powtórz hasło"}
            type={"password"}
            name={"re_password"}
            value={re_password}
            onChange={e => onChange(e)}
            required
          />
          <Button className={"button"} type={"submit"}>Zarejestruj się</Button>
        </Form>
        <Form.Text className={"p"}>Masz już konto? <Link to={"/login"}>Zaloguj się</Link></Form.Text>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(Register);