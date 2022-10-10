import { Link, useState } from 'react';
import { SearchOutlined, RightSquareOutlined, RightSquareFilled } from '@ant-design/icons';

import './form-homepageSearch.css'

export default function SearchForm(props) {
    
    // generates the placeholder text in the search bar
    // note: this needs to come before our hooks
    const searchThings = ['locations', 'adventure', 'good food', 'scenery'];
    function generateNewPlaceholder() {
        let rng = Math.floor( Math.random() * searchThings.length );
        return `Search for ${searchThings[rng]}...`;
    }

    // Hooks
    const [input, setInput] = useState("")
    const [placeholderText, setPlaceholderText] = useState(generateNewPlaceholder())
    const [goElementReady, setGoElementReady] = useState(false)

    // Event handlers

    function handleChange(e) {
        let currentFormInput = e.target.value;
        let newInput = currentFormInput.trim();
        setInput(currentFormInput);
        setGoElementReady(!!newInput); // if input is truthy, set the element to ready
        
        // TODO: include autofill functionality here

    }

    function handleSubmit(e) {

    }

    // JSX logic
    let goButton = (<RightSquareOutlined style={{ fontSize: '30px' }} />);
    if (goElementReady) {
        goButton = (
            <Link 
                // to={{
                //     pathname: '/search',
                //     state: input
                // }}
                to='/search'
            >
                <RightSquareFilled style={{ fontSize: '30px' }} />
            </Link>
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