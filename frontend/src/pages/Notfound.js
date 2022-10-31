import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

const Notfound = () => {

    return (
        <div className={"formContainer"}>
            <div className={"notfoundContainer"}>
                <p className={"notfoundCode"}>404</p>
                <p className={"notfoundText"}>Ups, nie znaleziono tej strony!</p>
                <p className={"notfoundComment"}>Link może być uszkodzony,</p>
                <p className={"notfoundComment"}>lub strona mogła zostać usunięta.</p>
            </div>
        </div>
    );
}

export default Notfound;