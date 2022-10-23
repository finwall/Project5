import { useState } from 'react';
import LoginWith from '../button-loginWith.jsx';
import InputForm from '../form-loginSignup.jsx';
import LoginCSS from './css/login.module.css'

// Adding a comment to continue test

export default function Login() {


    const [showEmailLogin, setShowEmailLogin] = useState(false);

    const displayEmailLogin = () => {
        setShowEmailLogin(!showEmailLogin); // toggles email login field
    }

    let emailLoginForm = null;
    if (showEmailLogin) {
        emailLoginForm = (
            <>
                <hr />
                <InputForm />
            </>
        )
    }

    return (
        <div id={LoginCSS['loginWrapper']}>
            <h1>Login</h1>
            <a href="http://localhost:8080/oauth2/authorize/google?redirect_uri=http://localhost:3000/oauth2/redirect"><LoginWith>Google</LoginWith></a>
            <LoginWith>Facebook</LoginWith>
            <LoginWith onClick={displayEmailLogin}>Email</LoginWith>
            {emailLoginForm}
        </div>
    );
}

