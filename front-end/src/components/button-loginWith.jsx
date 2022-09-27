import { useRef } from 'react';
import './button-loginWith.css';

function LoginWith(props) {

    // handles props
    const innerHTML = props.children || ""; //<LoginWith> EVERYTHING IN HERE </LoginWith>
    const href = props.href;

    const buttonRef = useRef();

    return (
        <div className="loginButtonWrapper">
            <button ref={buttonRef}>
                {innerHTML}
            </button>
        </div>
    )
}

export default LoginWith;