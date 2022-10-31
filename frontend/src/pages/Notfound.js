import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Button } from 'react-bootstrap';
import {Link} from "react-router-dom";

const Notfound = () => {

    return (
        <div className={"formContainer"}>
            <div className={"notfoundContainer"}>
                <p className={"notfoundCode"}>404</p>
                <p className={"notfoundText"}>Ups, nie znaleziono tej strony!</p>
                <p className={"notfoundComment"}>Link może być uszkodzony,</p>
                <p className={"notfoundComment"}>lub strona mogła zostać usunięta.</p>
                <Link to={"/Login"}><Button className={"button"}>Przejdź do Logowania</Button></Link>
            </div>
        </div>
    );
}

export default Notfound;