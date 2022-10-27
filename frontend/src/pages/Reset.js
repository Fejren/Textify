import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Button } from 'react-bootstrap';
import {Link} from "react-router-dom";

const Reset = () => {

    return (
        <div className={"formContainer"}>
            <div className={"formWrapper"}>
                <Form.Text className={"logo"}>Textify</Form.Text>
                <Form.Text className={"title"}>Resetowanie hasła</Form.Text>
                <Form className={"form"}>
                    <Form.Control className={"input"} placeholder={"Wprowadź nowe hasło"} type={"password"}></Form.Control>
                    <Form.Control className={"input"} placeholder={"Potwierdź nowe hasło"} type={"password"}></Form.Control>
                    <Button className={"button"}>Zresetuj hasło</Button>
                </Form>
            </div>
        </div>
    );
}

export default Reset;