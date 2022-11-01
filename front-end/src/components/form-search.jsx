import { Link, Route, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { SearchOutlined, RightSquareOutlined, RightSquareFilled } from '@ant-design/icons';
import SearchService from '../services/search';
import MountainsImage from '../assets/graphics/rough-horn-2146181_640.jpg';
import ForestImage from '../assets/graphics/forest-gf13c9e753_640.jpg';

import Styles from './css/form-search.module.css'

/**
 * JSX component that provides a search bar to find, display, and select locations from backend
 * @param {object} props
 * @param {int} props.showCount The number of dropdown results to be displayed on this form
 * @param {int} props.preload The number of results to request from the backend
 * @param {object} props.children Prefills the form to a specified string or JSX element
 * @param {string} props.placeholderSupplement Overrides default placeholder text
 * @param {({locationName, locationLocation}) => void} props.selectItemAction callback performed when an item from the search results dropdown is selected
 * @param {boolean} props.clearSearch A boolean value (used alongside selectItemAction) to clear the form and inputs 
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
    const [input, setInput] = useState(props.children?.toString() || "");
    const [placeholderText, setPlaceholderText] = useState(props.placeholderSupplement || generateNewPlaceholder());
    const [goElementReady, setGoElementReady] = useState(false);
    const [queryResultsArray, setQueryResults] = useState([]);
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
            navigate(`/city?city=${urlSafeName}`)
        }
    };

    const collectLocations = useCallback(() => {
        return SearchService.gatherLocations()
            .then((result) => {
                setQueryResults(result)
            })
            .catch((error) => {
                setQueryResults([])
            })
    }, [])

    function filterQueryResults(newInput) {
        if (!newInput || newInput === "") setSearchResults([]);
        else setSearchResults(queryResultsArray.filter(str => str.toLowerCase().includes(newInput.toLowerCase())))
    }

    useEffect(() => {
        collectLocations();
    }, []);

    useEffect(() => {
        filterQueryResults(input)
    }, [input, queryResultsArray]);

    // Event handlers

    function handleChange(e) {
        let currentFormInput = e.target.value;
        setGoElementReady(!!currentFormInput);
        setInput(currentFormInput);

        // TODO: include autofill functionality here
        filterQueryResults(currentFormInput);

    }

    function handleSubmit(e) {
        e.preventDefault();
    }

    let activateButton = null;
    if (useLocation().pathname === '/') {
        activateButton = <RightSquareOutlined style={{ fontSize: '1em' }} />
        if (goElementReady) {
            function handleSubmit(e) {
                e.preventDefault();
                let inp = input.trim();
                if (inp) {
                    let uriString = encodeURIComponent(inp);
                    navigate(`${linkPath}?${searchParam}=${uriString}`)
                } 
            }
            activateButton = (
                    <button onClick={handleSubmit}>
                        <RightSquareFilled style={{ fontSize: '1em' }} />
                    </button>
            )    
        } 
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
                            <li key={index}>
                                <button onClick={
                                    () => selectItemAction({
                                            locationName: searchResult, 
                                            locationLocation: searchResult
                                        })
                                }>
                                    <div className={Styles['imgContainer']}>
                                        <img src={searchResult.toLowerCase().charCodeAt(0) > 105 ? MountainsImage : ForestImage} alt={"Image for " + searchResult} />
                                    </div>
                                    <div className={Styles['textContainer']}>
                                        <span className={Styles['textContainer-name']}>{searchResult}</span>
                                        <span className={Styles['textContainer-location']}>{searchResult}</span>
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
                    <SearchOutlined style={{fontSize: '1em'}} />
                    <input type="text" name="search" value={input} onInput={handleChange} placeholder={placeholderText} autoComplete='off'></input>
                    {activateButton}
                </div>
            </form>
            {resultsJSX}
        </div>
    )
}