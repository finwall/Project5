import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchForm from '../form-search.jsx';
import SearchService from '../../services/search';


export default function Search(props) {

    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <>
            <h1>This is the search page.</h1>
            <SearchForm>{searchParams.getAll('search')}</SearchForm>
        </>
    )
}