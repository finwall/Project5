import HodophiliaLogo from './hodophiliaLogo';
import Styles from './css/navbar.module.css';
import { useContext } from 'react';
import { LoginContext } from '../contexts/loginContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const user = useContext(LoginContext);
    const navigate = useNavigate();
    return (
        <nav className={Styles["nav"]}>
            <HodophiliaLogo />
            {user.username ?
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', columnGap: '5%'}}>
                    <img src={require('../assets/icons/ironman.jpeg')} alt='pfp' style={{borderRadius: '35px',}} width={'11%'} onClick={() => navigate('/profile')} />
                    <p className={Styles["nav-username"]}>{user.username}</p>
                    <button
                        style={{backgroundColor: 'black', padding: '10px', borderRadius: '20px'}}
                        className={Styles["nav-logout"]}
                        onClick={() => {user.logout(); console.log("Logged Out")}}
                    >
                        Logout
                    </button>
                </div>
            :
                <ul>
                    <li>
                        <a href='/login'>Login</a>
                    </li>
                    <li>
                        <a className={Styles['signup']} href='/signup'>Signup</a>
                    </li>
                </ul>
            }
        </nav>
    )
}