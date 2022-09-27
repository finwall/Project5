import { useEffect } from 'react';

export default function Index() {
    useEffect(() => {
        console.log("loaded");
        colorCycling();
    })

    function colorCycling() {
        console.log("hello")
        let e = document.getElementById('amazing');
        console.log(e);
        console.log(e.style.color);
    }

    return (
        <>
            <h2 id="hodophilia">Hodophilia</h2>
            <h1>Welcome to the index page.</h1>
            <h2>TODO: Make this page look <span id='amazing'>amazing.</span></h2>
            <p>This is a sample paragraph.</p>
        </>
    )
}