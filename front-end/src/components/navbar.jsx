import HodophiliaLogo from './hodophiliaLogo';
import Styles from './css/navbar.module.css';

export default function Navbar() {
    return (
        <nav className={Styles["nav"]}>
            <HodophiliaLogo />
            <ul>
                <li>
                    <a href='/login'>Login</a>
                </li>
                <li>
                    <a className={Styles['signup']} href='/signup'>Signup</a>
                </li>
            </ul>
        </nav>
    )
}