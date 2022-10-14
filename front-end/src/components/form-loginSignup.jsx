import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import './form-loginSignup.css';
import AuthService from '../services/auth.service';

export default function LoginSignupForm({ isSignup }) {

    const [nameInput, setNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);
    const [successMsg, setSuccessMsg] = useState("");

    let navigate = useNavigate();

    function handleNameChange(e) {
        setNameInput(e.target.value);
    }

    function handleEmailChange(e) {
        setEmailInput(e.target.value);
    }

    function handlePasswordChange(e) {
        setPasswordInput(e.target.value);
    }

    function handleSubmitError(e) {
        let message = e.response.data?.message || "Unknown error.";
        let messages = message.split('\n');
        setErrorMessages([...messages]);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setSuccessMsg("");
        setErrorMessages([]);

        if (isSignup) {

            let signupPromise = AuthService.register(nameInput, emailInput, passwordInput)
                .then(() => {
                    setSuccessMsg(`${nameInput}, you have successfully signed up with email: ${emailInput}!`)
                })
            signupPromise.catch(e => handleSubmitError(e))
            signupPromise.then(() => {
                setTimeout(() => {
                    navigate('/');
                }, 2000)
            })
        }
        else {

            // AuthService.logout();

            let loginPromise = AuthService.login(emailInput, passwordInput)
                .then(
                    () => {
                        console.log("Successfully logged in!");
                        setSuccessMsg(`You have successfully logged in, ${emailInput}!`);
                    })
            loginPromise.catch(e => handleSubmitError(e))
            loginPromise.then (() => {
                    setTimeout(() => {
                        navigate('/');
                    }, 2000)
                })

        }

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
                    Name
                    <input type="text" name="name" value={nameInput} onChange={handleNameChange} autoComplete={(isSignup) ? "new-password" : "off"} />
                </label>
            </div>
        );
    }

    return (
        <>
            <form className="login-signup" onSubmit={handleSubmit}>
                {(successMsg) && (
                    <p className="successMsg">{successMsg}</p>
                )}
                {errorMessages.map((msg, index) => {
                    return (
                        <p
                            key={`ErrorNo-${index.toString()}`}
                            className="errorMsg"
                        >
                            {msg}
                        </p>
                    )
                })}
                {nameFields}
                <label>
                    Email
                    <input type="email" pattern=".+@globex\.com" size="50" name="Email" value={emailInput} onChange={handleEmailChange} autoComplete={(isSignup) ? "new-password" : "off"} required />
                </label>
                <label>
                    Password
                    <input type="password" name="Password" value={passwordInput} onChange={handlePasswordChange} autoComplete={(isSignup) ? "new-password" : "off"} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            {newAccountField}
        </>
    )
}