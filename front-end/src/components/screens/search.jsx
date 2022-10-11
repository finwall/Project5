import { useState } from 'react';

export default function Search(props) {

    // const [searchParams, setSearchParams] = useState(new URLSearchParams(props.location?.search));
    const [searchParams, setSearchParams] = useState(props.location?.search);

    return (
        <>
            <h1>This is the search page.</h1>
            <p>Data received:</p>
            <blockquote>
                {searchParams}
            </blockquote>
        </>
    )
}