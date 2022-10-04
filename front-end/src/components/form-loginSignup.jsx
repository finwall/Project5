import { Link } from "react-router-dom";
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

    /*
    //uncomment this when/if it becomes useful
    function addErrorMessage(msg) {
        setErrorMessages([...errorMessages, msg]);
    }
    */

    function handleSubmit(e) {
        e.preventDefault();

        let sentJSON = {
            "username": unameInput,
            "firstName": fnameInput,
            "lastName": lnameInput,
            "email": emailInput,
            "password": passwordInput
        }

        let returnedErrors = null;

        // TODO: Take the data from emailInput and passwordInput and send it to the backend here, then reroute the user
        if (isSignup) {
            // use fnameInput and lnameInput fields here
            // fetch(location + '/api/users/register')
            //     .then(res => {
            //         res.json()
            //     })
            //     .catch(err => {
            //         console.error(`There was a problem with your Fetch request: \n${err}`);
            //     })
            AuthService.register(fnameInput, lnameInput, unameInput, emailInput, passwordInput)
                .then(() => {
                    console.log(`${fnameInput} has successfully signed up with username: ${unameInput}.`)
                })
                .catch(e => {
                    console.log(`${fnameInput} has failed to sign up. Error:\n${e}`)
                    returnedErrors = e;
                })
        }
        else {
            AuthService.login(unameInput, emailInput, passwordInput)
                .then(
                    () => {
                        console.log("Successfully logged in!");
                        // this.props.router.navigate("/profile");
                        // window.location.reload();
                    })
                .catch(e => {
                    console.error("Failed to log in. Error: \n" + e);
                    returnedErrors = e;
                })
        }
        if (returnedErrors) {
            console.log(`Errors before: ${errorMessages}`);
            setErrorMessages([...errorMessages, e])
            console.log(`Errors after: ${errorMessages}`);
        };
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