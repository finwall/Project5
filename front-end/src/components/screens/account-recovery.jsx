import { React, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as SecurityQuestions from '../../constants/securityQuestions'
import './login.css';


export default function AccountRecovery(props) {
    
    const location = useLocation();

    const [useSecurityQuestions, setSQUse] = useState(props.useSQ || false);
    const [emailValue, setEmailValue] = useState(location.state?.emailInput || "");
    const [sq1Value, setSQ1Value] = useState("");
    const [sq2Value, setSQ2Value] = useState("");

    const messages = ["email", "security questions"];

    let returnMessage = null; // will be used to store message results into
    function handleSubmit(e) {
        e.preventDefault();
        
        // TODO: send data to backend, get response
    }

    return (
        <div id="loginWrapper">
            <h1>Account Recovery</h1>
            <form className='login-signup' onSubmit={handleSubmit}>
                {
                    useSecurityQuestions ? (
                        <>
                            <label>
                                {SecurityQuestions.SECURITY_QUESTION_1}
                                <input type="text" name="sq1" value={sq1Value} onChange={(e) => setSQ1Value(e.target.value)}></input>
                            </label>
                            <label>
                                {SecurityQuestions.SECURITY_QUESTION_2}
                                <input type="text" name="sq2" value={sq2Value} onChange={(e) => setSQ2Value(e.target.value)}></input>
                            </label>
                        </>
                    ) : (
                        <label>
                            Email
                                <input type="email" name="email" onChange={(e) => setEmailValue(e.target.value)} value={emailValue}></input>
                        </label>
                    )
                }
                <button onClick={() => setSQUse(!useSecurityQuestions)}>Use {messages[+(!useSecurityQuestions)]}</button>
                <input type="submit" value={"Send email"}></input>
            </form>
            {returnMessage}
        </div>
    )
}