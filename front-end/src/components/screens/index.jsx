/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Index() {
    const [searched, setSearched] = useState('');

    // when searched is updated, useEffect will run and print the value of searched to the console
    useEffect(() => {
        console.log(searched);
    }, [searched]);


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
            <Link to="./login">Click here to login.</Link>
            <h2 id="hodophilia">Hodophilia</h2>
            <h1>Welcome to the index page.</h1>
            <h2>TODO: Make this page look <span id='amazing'>amazing.</span></h2>
            <p>This is a sample paragraph.</p>
            <div className="flex-container" style={{flexDirection: "row", backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
                <input type="text" placeholder="Search" onChange={(e) => setSearched(e.target.value)} />
                <Link to={'city'} state={searched}><button>Search</button></Link>
            </div>
        </>
    )
}