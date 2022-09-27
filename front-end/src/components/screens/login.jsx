import LoginWith from '../button-loginWith.jsx';
import './login.css'

export default function Login() {
    return (
        <div id='loginWrapper'>
            <h1>Login / Signup</h1>
            <LoginWith>Google</LoginWith>
            <LoginWith>Facebook</LoginWith>
            <LoginWith>Email</LoginWith>
        </div>
    );
}