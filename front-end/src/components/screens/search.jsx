import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchService from '../../services/search';

export default function Search(props) {

    const [searchParams, setSearchParams] = useSearchParams();

    
    console.log(searchParams.get('search'));

    return (
        <>
            <h1>This is the search page.</h1>
            <p>Data received:</p>
            <blockquote>
                {searchParams.getAll('search')}
            </blockquote>
        </>
    )
}