import InputForm from '../form-loginSignup.jsx';
import './login.css';

export default function Signup() {

    return (
        <div id="loginWrapper"> { /* TODO: Change this so that the signup and login wrappers are nested in the same component */}
            <h1>Signup</h1>
            <InputForm isSignup={true} />
        </div>
    )
}