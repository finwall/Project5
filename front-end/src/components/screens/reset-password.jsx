import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';

import auth from '../../services/auth';

import './index.css';

export default function VerifyLogin() {

    const redirectTime = 2000; // 2 seconds before redirect
    const redirectTo = '/login';

    const location = useLocation();
    const navigate = useNavigate();

    // const context = useContext(LoginContext);
    
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
                    }, redirectTime)
                })
                .catch(e => {
                    setErrorMsg("Code is incorrect.");
                })
                
        }
        else { // passwords do not match
            setErrorMsg("Passwords do not match.");
        }
    }

    return (
        <div className='container'>
            <h1>Reset password</h1>
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
                {
                    errorMsg && (
                        <p>{errorMsg}</p>
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
            </form>
        </div>
    )
}