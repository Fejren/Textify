import React from 'react';
import {Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";



const Register = () => {

  return (
    <div className={"formContainer"}>
      <div className={"formWrapper"}>
        <Form.Text className={"logo"}>Textify</Form.Text>
        <Form.Text className={"title"}>Rejestracja</Form.Text>
        <Form className={"form"}>
          <Form.Control className={"input"} placeholder={"Imię"} type={"text"}></Form.Control>
          <Form.Control className={"input"} placeholder={"Nazwisko"} type={"text"}></Form.Control>
          <Form.Control className={"input"} placeholder={"Adres E-mail"} type={"email"}></Form.Control>
          <Form.Control className={"input"} placeholder={"Hasło"} type={"password"}></Form.Control>
          <Button className={"button"}>Zarejestruj się</Button>
        </Form>
        <Form.Text className={"p"}>Masz już konto? <Link to={"Login"}>Zaloguj się</Link></Form.Text>
      </div>
    </div>
  );
}

export default Register;