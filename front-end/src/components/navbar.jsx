import HodophiliaLogo from './hodophiliaLogo';
import './navbar.css';

export default function Navbar() {
    return (
        <nav className="nav">
            <HodophiliaLogo />
            <ul>
                <li>
                    <a href='/login'>Login</a>
                </li>
                <li>
                    <a className='signup' href='/signup'>Signup</a>
                </li>
            </ul>
        </nav>
    )
}