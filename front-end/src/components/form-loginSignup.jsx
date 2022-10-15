import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import AuthService from '../services/auth';
import { LoginContext } from "../contexts/loginContext";

import './form-loginSignup.css';

export default function LoginSignupForm({ isSignup }) {

    const context = useContext(LoginContext);

    const [nameInput, setNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [secQuestion1, setSecQuestion1] = useState("");
    const [secQuestion2, setSecQuestion2] = useState("");
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
    
    function handleSQ1Change(e) {
        setSecQuestion1(e.target.value);
    }
    
    function handleSQ2Change(e) {
        setSecQuestion2(e.target.value);
    }

    function handleSubmitError(e) {
        let message = e.response.data?.message || "Unknown error.";
        let messages = message.split('\n');
        setErrorMessages([...messages]);
    }

    function forgotPassword(e) {
        e.preventDefault();
        navigate('/account-recovery', {
            state: {
                emailInput
            }
        });
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

            let loginPromise = AuthService.login(emailInput, passwordInput)
                .then((response) => {
                        if (response.data?.accessToken) {
                            context.login(null, emailInput, [], response.data.accessToken); // TODO: fill first field or remove it
                            console.log("Successfully logged in!");
                            setSuccessMsg(`You have successfully logged in, ${emailInput}!`);
                        }
                        else throw new Error("accessToken field not included in AuthService response.")
                    });
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
    let securityQuestions = null;
    let forgotPasswordButton = null;

    // generates the additional JSX
    if (!isSignup) {
        newAccountField = (
            <p>Don't have an account? Click <Link to="../signup">Here</Link> to create a new account.</p>
        );
        forgotPasswordButton = (
            <button onClick={forgotPassword}>Forgot password</button>
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
        securityQuestions = (
            <>
                <h2>Security Questions</h2>
                <label>
                    What was your mother's maiden name?
                    <input type="text" name="sq1" value={secQuestion1} onChange={handleSQ1Change} autoComplete={(isSignup) ? "new-password" : "off"} />
                </label>
                <label>
                    What was the name of your first pet?
                    <input type="text" name="sq2" value={secQuestion2} onChange={handleSQ2Change} autoComplete={(isSignup) ? "new-password" : "off"} />
                </label>
            </>
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
                {securityQuestions}
                {forgotPasswordButton}
                <input type="submit" value="Submit" />
            </form>
            {newAccountField}
        </>
    )
}