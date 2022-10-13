import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { SearchOutlined, RightSquareOutlined, RightSquareFilled } from '@ant-design/icons';
import SearchService from '../services/search';

import './form-search.css'

export default function SearchForm(props) {

    const defaultShowCount = 3;
    const showCount = props.showCount || defaultShowCount;

    const defaultText = props.children || "";
    
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
    const [input, setInput] = useState(defaultText);
    const [placeholderText, setPlaceholderText] = useState(generateNewPlaceholder());
    const [goElementReady, setGoElementReady] = useState(false);
    const [searchResultsArray, setSearchResults] = useState([]);

    // Event handlers

    function handleChange(e) {
        let currentFormInput = e.target.value;
        let newInput = currentFormInput.trim();
        setGoElementReady(!!newInput);
        setInput(currentFormInput);

        // TODO: include autofill functionality here
        !!newInput? // remove after testing
        SearchService.query(currentFormInput, showCount)
            .then(results => {
                console.log("Result: " + results[0].getName());
                setSearchResults(results);
            })
            : // remove after testing
            setSearchResults([])

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
    // let activateButton = function(predicate) {
    //     if (predicate) return (
    //         <button onClick={handleSubmit}>
    //             <RightSquareFilled style={{ fontSize: '30px' }} />
    //         </button>
    //     )
    //     else return (
    //         <RightSquareOutlined style={{ fontSize: '30px' }} />
    //     )
    // }
    let activateButton = <RightSquareOutlined style={{ fontSize: '30px' }} />
    if (goElementReady) activateButton = (
            <button onClick={handleSubmit}>
                <RightSquareFilled style={{ fontSize: '30px' }} />
            </button>
    )

    let resultsJSX = null;
    if (searchResultsArray.length > 0) {
        resultsJSX = (
            <ul className='searchResults'>
                {
                    searchResultsArray.map((searchResult, index) => {
                        return (
                            <li key={searchResult.getImageURL().slice(-10) + index}>
                                <a href="">
                                    <div className='imgContainer'>
                                        <img src={searchResult.getImageURL()} alt={"Image for " + searchResult.getName()} />
                                    </div>
                                    <div className='textContainer'>
                                        <span className='textContainer-name'>{searchResult.getName()}</span>
                                        <span className='textContainer-location'>{searchResult.getLocation()}</span>
                                    </div>
                                </a>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    return (
        <div className='homepage-search'>
            <form className='homepage-search-bar' onSubmit={handleSubmit}>
                <div className='homepage-search-bar-flex'>
                    <SearchOutlined style={{fontSize: '24px'}} />
                    <input type="text" name="search" onInput={handleChange} placeholder={placeholderText} autoComplete='off'></input>
                    {activateButton}
                </div>
            </form>
            {resultsJSX}
        </div>
    )
}