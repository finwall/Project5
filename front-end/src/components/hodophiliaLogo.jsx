import Styles from './css/hodophiliaLogo.module.css';

export default function Hodophilia() {
    return (
        <a href='/' className={Styles['home-anchor']}>
            <h2 className={Styles['hodophilia-logo']}>Hodophilia</h2>
        </a>
    )
}