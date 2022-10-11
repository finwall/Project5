import { useRef } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import './button-loginWith.css';

// testing a branch
// <a th:href="/@{/oauth2/authorization/google}">Login with Google</a>

/**
 * Props:
 * children: Everything between opening and closing tags
 * icon: the (preferrably svg) image for the service authenticating with 
 * href: a link to authentication with external service
 */
function LoginWith(props) {

    // handles props
    const innerHTML = props.children ? "Continue with " + props.children : "";

    // const href = props.href;
    const onClick = props.onClick;
    // const icon = props.icon || '../assets/icons/notfound.svg';
    const icon = props.icon;

    const buttonRef = useRef();

    return (
        <div className="loginButtonWrapper">
            <button ref={buttonRef} onClick={onClick}>
                <a href={props.href}>
                    <table>
                        <tr>
                            <td className='image'> { /* Icon image */}
                                {
                                    icon ? <img src={icon} alt='Not found' /> : <QuestionCircleOutlined />
                                }
                            </td>
                            <td> { /* Authentication system name */}
                                {innerHTML}
                            </td>
                        </tr>
                    </table>
                </a>
            </button>
        </div>
    )
}

export default LoginWith;