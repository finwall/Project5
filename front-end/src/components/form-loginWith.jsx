import { Link } from "react-router-dom";
import { useState } from "react";
import './form-loginWith.css';

export default function Field({ isSignup }) {

    const [fnameInput, setFnameInput] = useState("");
    const [lnameInput, setLnameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

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
        console.log(e);
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
        nameFields = (
            <div className="item">
                <label>
                    First Name
                    <input type="text" name="fname" value={fnameInput} onChange={setFnameInput} />
                </label>
                <label>
                    Last Name
                    <input type="text" name="lname" value={lnameInput} onChange={setLnameInput} />
                </label>
            </div>
        )
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