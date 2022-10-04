import { useState } from 'react';
import LoginWith from '../button-loginWith.jsx';
import InputForm from '../form-loginSignup.jsx';
import './login.css'

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
        <div id='loginWrapper'>
            <h1>Login</h1>
            <LoginWith href="@{/oauth2/authorization/google/}">Google</LoginWith>
            <LoginWith>Facebook</LoginWith>
            <LoginWith onClick={displayEmailLogin}>Email</LoginWith>
            {emailLoginForm}
        </div>
    );
}