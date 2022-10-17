import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { LoginContext } from '../../contexts/loginContext';

import auth from '../../services/auth';

import './index.css';

export default function VerifyLogin() {

    const redirectTime = 2000; // 2 seconds before redirect
    const redirectTo = '/'; // 2 seconds before redirect

    const location = useLocation();
    const navigate = useNavigate();
    const context = useContext(LoginContext);
    const providedEmail = location.state?.email;

    const [code, setCode] = useState(0);
    const [errorMsg, setErrorMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    function handleNumberChange(e) {
        setCode(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        auth.verify(providedEmail, code)
            .then(response => {
                console.log(response);
                context.login(null, providedEmail, [], response.data.accessToken);
                setSuccessMsg(`User ${providedEmail} has successfully logged in!`);
                setTimeout(() => {
                    navigate(redirectTo);
                }, redirectTime)
            })
            .catch(e => {
                setErrorMsg("Code is incorrect.");
            })
    }

    return (
        <div className='container'>
            <h1>Verify Login</h1>
            <form className='login-signup' onSubmit={handleSubmit}>
                {
                    errorMsg && (
                    <p className='errorMsg'>{errorMsg}</p>
                    )
                }
                {
                    successMsg && (
                        <p>{successMsg}</p>
                    )
                }
                <label>
                    Enter your code
                    <input type="number" min="0" max="999999" name="code" value={code} onChange={handleNumberChange}></input>
                </label>
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    )
}