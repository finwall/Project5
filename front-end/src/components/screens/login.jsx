import { useState } from 'react';
import LoginWith from '../button-loginWith.jsx';
import LoginWithForm from '../form-loginWith.jsx';
import './login.css'

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
                <LoginWithForm />
            </>
        )
    }

    return (
        <div id='loginWrapper'>
            <h1>Login</h1>
            <LoginWith>Google</LoginWith>
            <LoginWith>Facebook</LoginWith>
            <LoginWith onClick={displayEmailLogin}>Email</LoginWith>
            {emailLoginForm}
        </div>
    );
}