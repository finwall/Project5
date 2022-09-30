import { Link } from "react-router-dom";
import { useState } from "react";
import './form-loginSignup.css';

export default function LoginSignupForm({ isSignup }) {

    const [fnameInput, setFnameInput] = useState("");
    const [lnameInput, setLnameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    function handleFnameChange(e) {
        setFnameInput(e.target.value);
    }

    function handleLnameChange(e) {
        setLnameInput(e.target.value);
    }

    function handleEmailChange(e) {
        setEmailInput(e.target.value);
    }

    function handlePasswordChange(e) {
        setPasswordInput(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        // TODO: Take the data from emailInput and passwordInput and send it to the backend here, then reroute the user
        if (isSignup) {
            // use fnameInput and lnameInput fields here

        }
        else {

        }
        console.log(`Recieved: \nFirst name: ${fnameInput}\nLast name: ${lnameInput}\nEmail: ${emailInput}\nPassword: ${passwordInput}`);
    }

    // these fields are JSX expressions generated based on 
    // whether the user is accessing this form from the signup page
    let newAccountField = null;
    let nameFields = null;

    // generates the additional JSX
    if (!isSignup) {
        newAccountField = (
            <p>Don't have an account? Click <Link to="../signup">Here</Link> to create a new account.</p>
        )
    }
    else { // if this is the signup page
        newAccountField = (
            <p>Already have an account? Click <Link to="../login">Here</Link> to sign in.</p>
        );
        nameFields = (
            <div className="item">
                <label>
                    First Name
                    <input type="text" name="fname" value={fnameInput} onChange={handleFnameChange} />
                </label>
                <label>
                    Last Name
                    <input type="text" name="lname" value={lnameInput} onChange={handleLnameChange} />
                </label>
            </div>
        );
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                {nameFields}
                <label>
                    Email
                    <input type="text" name="Email" value={emailInput} onChange={handleEmailChange} />
                </label>
                <label>
                    Password
                    <input type="password" name="Password" value={passwordInput} onChange={handlePasswordChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            {newAccountField}
        </>
    )
}