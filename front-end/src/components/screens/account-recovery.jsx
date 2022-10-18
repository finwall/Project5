import { useLocation } from 'react-router-dom';
import { React, useState } from 'react';

import REDIRECT_TIMEOUT from '../../constants/redirect';
import * as SecurityQuestions from '../../constants/securityQuestions'
import auth from '../../services/auth';

import './login.css';


export default function AccountRecovery(props) {
    
    const location = useLocation(); // use this to pull email variable from previous route

    const [useSecurityQuestions, setSQUse] = useState(props.useSQ || false);
    const [emailValue, setEmailValue] = useState(location.state?.emailInput || "");
    const [sq1Value, setSQ1Value] = useState("");
    const [sq2Value, setSQ2Value] = useState("");
    const [successResponse, setSuccessResponse] = useState(null);
    const [errorResponses, setErrorResponses] = useState([]);

    const messages = ["email code", "security questions"];

    function handleInputSwitch(e) {
        e.preventDefault();
        setSQUse(!useSecurityQuestions);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setSuccessResponse(null);
        setErrorResponses([]);
        
        if (useSecurityQuestions) {
            auth.forgotPasswordSQs(emailValue, sq1Value, sq2Value)
                .then((response) => {
                    console.log(response);
                    setSuccessResponse(response.message);
                    setTimeout(() => {

                    }, REDIRECT_TIMEOUT);
                })
                .catch((e) => {
                    console.error(e);
                    setErrorResponses([...errorResponses, e.message]);
                })
        }

        else {
            auth.forgotPasswordEmail(emailValue)
                .then((response) => {
                    setSuccessResponse(response.data.message);
                })
                .catch((e) => {
                    console.error(e);
                    setErrorResponses([...errorResponses, e.message]);
                })
        }
    }

    function createFormTemplate(children) {
        return (
            <div id="loginWrapper">
                <h1>Account Recovery</h1>
                <form className='login-signup' onSubmit={handleSubmit}>
                    {children}
                </form>
            </div>
        )
    }

    let errorJSX;
    if (typeof successResponse === 'string' && successResponse.trim().length > 0) { // if the form has sent a success
        return (
            createFormTemplate(
                <p>{successResponse}</p>
            )
        );
    }
    else if (typeof errorResponses === 'object' && errorResponses.length > 0) {
        errorJSX = (
            <>
                {
                    errorResponses.map((error, index) => {
                        return (
                            <p key={index} className='errorMsg'>
                                {error}
                            </p>
                        )
                    })
                }
            </>
        );
    }

    let internalForm = (
        <>
            {errorJSX}
            {
                useSecurityQuestions ? (
                    <>
                        <label>
                            Email
                                <input type="email" name="email" onChange={(e) => setEmailValue(e.target.value)} value={emailValue}></input>
                        </label>
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
            <button onClick={handleInputSwitch}>Use {messages[+(!useSecurityQuestions)]}</button>
            <input type="submit" value={useSecurityQuestions ? "verify and reset" : "send email"}></input>
        </>
    )

    return (
        createFormTemplate(internalForm)
    )
}