import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import IndexCSS from './css/index.module.css';

export default function QRCode() {

    const navigate = useNavigate();
    let navigateLocation = '/login';

    const location = useLocation();
    const [image, setImage] = useState(location.state?.qrCode || "");

    function handleReturn(e) {
        e.preventDefault();
        navigate(navigateLocation);
    }

    return (
        <div className={IndexCSS.container}>
            <h1>QR Code</h1>
            <img src={image} alt="QR Code"></img>
            <br></br>
            <button onClick={handleReturn}>Return to {navigateLocation.substring(1)}</button>
        </div>
    )
}