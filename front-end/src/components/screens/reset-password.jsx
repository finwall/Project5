import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';

import REDIRECT_TIMEOUT from '../../constants/redirect';
import auth from '../../services/auth';

import './index.css';

export default function VerifyLogin() {

    const redirectTo = '/login';

    const navigate = useNavigate();
    
    const [searchParams, setSearchParams] = useSearchParams();
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [errorMsg, setErrorMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    
    const providedToken = searchParams.getAll('token');
    
    function handlePasswordInput(e) {
        setPassword(e.target.value);
    }
    
    function handlePasswordConfirmInput(e) {
        setPassword2(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (password === password2) {
            auth.resetPassword(providedToken, password)
                .then(response => {
                    console.log(response);
                    setSuccessMsg(`You have successfully changed passwords!`);
                    setTimeout(() => {
                        navigate(redirectTo);
                    }, REDIRECT_TIMEOUT)
                })
                .catch(e => {
                    setErrorMsg("Code is incorrect.");
                })
                
        }
        else { // passwords do not match
            setErrorMsg("Passwords do not match.");
        }
    }

    function createFormTemplate(children) {
        return (
            <div id="loginWrapper">
                <h1>Reset Password</h1>
                <form className='login-signup' onSubmit={handleSubmit}>
                    {children}
                </form>
            </div>
        )
    }

    return (
        createFormTemplate(
            (
                <>
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
                        Enter new password
                        <input type="password" name="newPassword" value={password} onChange={handlePasswordInput}></input>
                    </label>
                    <label>
                        Re-enter new password
                        <input type="password" name="newPassword" value={password2} onChange={handlePasswordConfirmInput}></input>
                    </label>
                    <input type="submit" value="Submit"></input>
                </>
            )
        )
    )
}