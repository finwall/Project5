import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { SearchOutlined, RightSquareOutlined, RightSquareFilled } from '@ant-design/icons';
import SearchService from '../services/search';

import './form-homepageSearch.css'

export default function SearchForm(props) {
    
    const maxResults = 5;
    const linkPath = '/search';
    const searchParam = 'search';
    const navigate = useNavigate();

    // generates the placeholder text in the search bar
    // note: this needs to come before our hooks
    const searchThings = ['locations', 'adventure', 'good food', 'scenery'];
    function generateNewPlaceholder() {
        let rng = Math.floor( Math.random() * searchThings.length );
        return `Search for ${searchThings[rng]}...`;
    }

    // Hooks
    const [input, setInput] = useState("");
    const [placeholderText, setPlaceholderText] = useState(generateNewPlaceholder());
    const [goElementReady, setGoElementReady] = useState(false);
    const [searchResultsArray, setSearchResults] = useState([]);

    // Event handlers

    function handleChange(e) {
        let currentFormInput = e.target.value;
        let newInput = currentFormInput.trim();
        setInput(currentFormInput);
        setGoElementReady(!!newInput); // if input is truthy, set the element to ready
        
        // TODO: include autofill functionality here
        SearchService.query(currentFormInput, maxResults)
            .then(results => {
                console.log("Result: " + results[0].getName());
                setSearchResults(results);
            })

    }

    function handleSubmit(e) {
        e.preventDefault();
        let inp = input.trim();
        if (inp) {
            let uriString = encodeURIComponent(inp);
            navigate(`${linkPath}?${searchParam}=${uriString}`)
        } 
    }

    // JSX logic
    let goButton = (<RightSquareOutlined style={{ fontSize: '30px' }} />);
    if (goElementReady) {
        goButton = (
            <button onClick={handleSubmit}>
                <RightSquareFilled style={{ fontSize: '30px' }} />
            </button>
        )
    }

    return (
        <form className='homepage-search' onSubmit={handleSubmit}>
            <div className='homepage-search-flex'>
                    <SearchOutlined style={{fontSize: '24px'}} />
                    <input type="text" name="search" onInput={handleChange} placeholder={placeholderText}></input>
                    {goButton}
                </div>
            </form>
    )
}