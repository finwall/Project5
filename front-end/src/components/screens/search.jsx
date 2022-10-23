import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchForm from '../form-search.jsx';
import SearchService from '../../services/search';

import IndexCSS from './css/index.module.css';

export default function Search(props) {

    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <div className={IndexCSS.container}>
            <h1>This is the search page.</h1>
            <SearchForm>{searchParams.getAll('search')}</SearchForm>
        </div>
    )
}