import React from 'react';
import { useLocation } from 'react-router-dom';
import './login.css';


export default function AccountRecovery(props) {

    const location = useLocation();

    let returnMessage = null;

    function handleSubmit(e) {
        e.preventDefault();

        // TODO: send data to backend, get response
    }

    return (
        <div id="loginWrapper">
            <h1>Account Recovery</h1>
            <form className='login-signup' onSubmit={handleSubmit}>
                <label>
                    Email
                    <input type="email" name="email" value={location.state?.emailInput}></input>
                </label>
                <input type="submit" value="Verify with email"></input>
            </form>
            {returnMessage}
        </div>
    )
}