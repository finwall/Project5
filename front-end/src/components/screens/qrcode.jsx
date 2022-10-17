import { useLocation } from 'react-router-dom';
import { useState } from 'react';

import './index.css';

export default function QRCode() {

    const location = useLocation();
    const [image, setImage] = useState(location.state?.qrCode || "");

    return (
        <div className='container'>
            <h1>QR Code</h1>
            <img src={image} alt="QR Code"></img>
            <a href="/login">Go to login</a>
        </div>
    )
}