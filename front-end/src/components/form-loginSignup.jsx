import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import './form-loginSignup.css';
import AuthService from '../services/auth.service';

export default function LoginSignupForm({ isSignup }) {

    const [unameInput, setUnameInput] = useState("");
    const [fnameInput, setFnameInput] = useState("");
    const [lnameInput, setLnameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);
    const [successMsg, setSuccessMsg] = useState("");

    let navigate = useNavigate();

    function handleUnameChange(e) {
        setUnameInput(e.target.value);
    }

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

    function handleSubmitError(e) {
        let message = e.response.data?.message || "Unknown error.";
        let messages = message.split('\n');
        setErrorMessages([...messages]);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setSuccessMsg("");
        setErrorMessages([]);

        // TODO: reroute the user
        if (isSignup) {

            let signupPromise = AuthService.register(fnameInput, lnameInput, unameInput, emailInput, passwordInput)
                .then(() => {
                    console.log(`${fnameInput} has successfully signed up with username: ${unameInput}.`)
                    setSuccessMsg(`${fnameInput}, you have successfully signed up with username: ${unameInput}!`)
                })
            signupPromise.catch(e => handleSubmitError(e))
            signupPromise.then(() => {

                // logs in the user with the data they submitted
                AuthService.login(unameInput, emailInput, passwordInput)
                    .then(
                        () => {
                            console.log("Successfully logged in!");
                            setSuccessMsg(`${unameInput} has successfully logged in!`);
                        })
                    .catch(
                        e => {
                            console.log(`${unameInput} failed to log in. Error: ${e}`)
                        })
                    .then(
                        () => {
                            setTimeout(() => {
                                navigate('/');
                            }, 2000)
                        }
                    )
            })
        }
        else {

            // AuthService.logout();

            let loginPromise = AuthService.login(unameInput, emailInput, passwordInput)
                .then(
                    () => {
                        console.log("Successfully logged in!");
                        setSuccessMsg(`You have successfully logged in, ${unameInput}!`);
                    })
            loginPromise.catch(e => handleSubmitError(e))
            loginPromise.then (() => {
                    setTimeout(() => {
                        navigate('/');
                    }, 2000)
                })

        }

        console.log(`Recieved: \nUsername: ${unameInput}\nFirst name: ${fnameInput}\nLast name: ${lnameInput}\nEmail: ${emailInput}\nPassword: ${passwordInput}`);
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
                    <input type="text" name="fname" value={fnameInput} onChange={handleFnameChange} autoComplete={(isSignup) ? "new-password" : "off"} />
                </label>
                <label>
                    Last Name
                    <input type="text" name="lname" value={lnameInput} onChange={handleLnameChange} autoComplete={(isSignup) ? "new-password" : "off"} />
                </label>
            </div>
        );
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
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
                    <input type="text" name="Email" value={emailInput} onChange={handleEmailChange} autoComplete={(isSignup) ? "new-password" : "off"} />
                </label>
                <label>
                    Username
                    <input type="text" name="Username" value={unameInput} onChange={handleUnameChange} autoComplete={(isSignup) ? "new-password" : "off"} />
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