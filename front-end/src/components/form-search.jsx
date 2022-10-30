import { Link, Route, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { SearchOutlined, RightSquareOutlined, RightSquareFilled } from '@ant-design/icons';
import SearchService from '../services/search';

import Styles from './css/form-search.module.css'

/* Valid props:
 *
 *  Not required:
 *      showCount           = the number of dropdown results to be displayed on this form
 *      preload             = the number of results to request from the backend
 *      children            = prefills the form to a specified string
 *      selectItemAction    = a function with optional object {locationID, locationName}
 *      clearSearch         = a boolean value (used alongside selectItemAction) to clear the form and inputs 
 */
export default function SearchForm(props) {

    const defaultShowCount = 3;
    const showCount = props.showCount || defaultShowCount;
    const preloadResultsNumber = props.preload || showCount;
    
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
    const [input, setInput] = useState(props.children || "");
    const [placeholderText, setPlaceholderText] = useState(generateNewPlaceholder());
    const [goElementReady, setGoElementReady] = useState(false);
    const [searchResultsArray, setSearchResults] = useState([]);
    const [displayIndex, setDisplayIndex] = useState(0);
    
    // selectItemAction performs the following actions when an item from the search results dropdown is selected.
    // expects an object with properties {locationName, locationLocation} as a single parameter
    // that *can be* assigned to a variable in this component's parent component if need be
    // TODO: add a locationID item that uniquely identifies it for later requests
    const selectItemAction = ({ locationName, locationLocation }) => { 
        if (props.selectItemAction) { // action when called from parent with prop 
            if (props.clearSearch) {
                setInput('');
                setSearchResults([]);
            }
            props.selectItemAction({ locationName, locationLocation })
        }
        else { // default action
            let urlSafeName = encodeURIComponent(locationName);
            let urlSafeLocation = encodeURIComponent(locationLocation);
            navigate(`/city?city=${urlSafeName}&location=${urlSafeLocation}`)
        }
    };


    function handleQueryResults(res) {
        console.log("Result: " + res[0].getName());
        setSearchResults(res);
    }

    const requestQueryResults = useCallback((newInput, currentFormInput) => {
        !!newInput ? // remove after testing
            SearchService.query(currentFormInput, preloadResultsNumber)
                .then(handleQueryResults)
            : // remove after testing
            setSearchResults([])
    }, [preloadResultsNumber])

    useEffect(() => {
        if (input && requestQueryResults) requestQueryResults(true, input);
    }, [input, requestQueryResults])


    // Event handlers

    function handleChange(e) {
        let currentFormInput = e.target.value;
        let newInput = currentFormInput.trim();
        setGoElementReady(!!newInput);
        setInput(currentFormInput);

        // TODO: include autofill functionality here
        requestQueryResults(newInput, currentFormInput);

    }

    function handleSubmit(e) {
        e.preventDefault();
        let inp = input.trim();
        if (inp) {
            let uriString = encodeURIComponent(inp);
            navigate(`${linkPath}?${searchParam}=${uriString}`)
        } 
    }

    let activateButton = null;
    if (useLocation().pathname !== '/search') {
        activateButton = <RightSquareOutlined style={{ fontSize: '30px' }} />
        if (goElementReady) activateButton = (
                <button onClick={handleSubmit}>
                    <RightSquareFilled style={{ fontSize: '30px' }} />
                </button>
        )    
    }

    let resultsJSX = null;
    if (searchResultsArray.length > 0) {
        resultsJSX = (
            <ul className={Styles['searchResults']}>
                {
                    searchResultsArray
                        .slice(displayIndex, showCount) // for pagination
                        .map((searchResult, index) => {
                        return (
                            <li key={searchResult.getImageURL().slice(-10) + index}>
                                <button onClick={
                                    () => selectItemAction({
                                            locationName: searchResult.getName(), 
                                            locationLocation: searchResult.getLocation()
                                        })
                                }>
                                    <div className={Styles['imgContainer']}>
                                        <img src={searchResult.getImageURL()} alt={"Image for " + searchResult.getName()} />
                                    </div>
                                    <div className={Styles['textContainer']}>
                                        <span className={Styles['textContainer-name']}>{searchResult.getName()}</span>
                                        <span className={Styles['textContainer-location']}>{searchResult.getLocation()}</span>
                                    </div>
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    return (
        <div className={Styles['homepage-search']}>
            <form className={Styles['homepage-search-bar']} onSubmit={handleSubmit}>
                <div className={Styles['homepage-search-bar-flex']}>
                    <SearchOutlined style={{fontSize: '24px'}} />
                    <input type="text" name="search" value={input} onInput={handleChange} placeholder={placeholderText} autoComplete='off'></input>
                    {activateButton}
                </div>
            </form>
            {resultsJSX}
        </div>
    )
}