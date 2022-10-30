import { React, useState, useEffect } from "react";
import SearchForm from './form-search.jsx';

import Styles from './css/form-addLocation.module.css'
import { useCallback } from "react";


/**
 * JSX component for providing a form for the user to add a travel location, hotel, and ammenities
 * @param {object} props
 * @param {int} props.id A simple number to show the order of this location in the travel list
 * @param {() => void} props.xClicked A function that is executed when the user clicks the X button in this component
 * @param {string} props.fromLocationName The name of a previous location (usually used for location chaining)
 * @param {string} props.fromLocationID The id of a previous location (usually used for location chaining)
 * @param {string} props.toLocationName The name of the new location
 * @param {string} props.toLocationID The id of the new location
 * @param {string} props.rootCollectFromData Function allowing parent to collect "from location" data
 * @param {string} props.rootCollectToData Function allowing parent to collect "to location" data
 */
function AddLocation({id, xClicked, fromLocationName, fromLocationID, toLocationName, toLocationID, rootCollectFromData, rootCollectToData}) {

    // const [ fromName, setFromName ] = useState(fromLocationName || "")
    // const [ fromID, setFromID ] = useState(fromLocationID || "")
    // const [ toName, setToName ] = useState("")
    // const [ toID, setToID ] = useState("")

    let fromName = fromLocationName || "";
    let toName = toLocationName || "";

    // solution from Salman A,
    // https://stackoverflow.com/a/13627586/15818885
    function ordinal_suffix_of(i) {
        var j = i % 10,
            k = i % 100;
        if (j === 1 && k !== 11) {
            return i + "st";
        }
        if (j === 2 && k !== 12) {
            return i + "nd";
        }
        if (j === 3 && k !== 13) {
            return i + "rd";
        }
        return i + "th";
    }

    function Stage01(props) {
        return (
            <>
                <SearchForm
                    placeholderSupplement={`Select ${ordinal_suffix_of(id)} location`}
                    selectItemAction={collectToData}
                    clearSearch={true}
                ></SearchForm>
            </>
        )
    } 

    const Stage02 = useCallback((props) => {
        return (
            <>
                <Stage01 />
                <div className={Styles['flights']}>
                    <h2>{toName}</h2>
                    <div className={Styles['map']}>
                        MAP WOULD GO HERE
                    </div>
                    <div className={Styles['flightsSearch']}>
                        <h3>Flights</h3>
                        <SearchForm
                            placeholderSupplement={`From`}
                            selectItemAction={collectFromData}
                            clearSearch={true}
                        ></SearchForm>
                    </div>
                </div>
            </>
        )
    }, [toName]);

    const Stage03 = useCallback((props) => {
        return (
            <>
                <Stage02 />
                <h2>{fromName}</h2>
                {/* <div className={Styles['flightsSearch']}>
                    <h2>{fromName}</h2>
                    <h3>Flights</h3>
                    <SearchForm
                        placeholderSupplement={`From`}
                        selectItemAction={collectFromData}
                        clearSearch={true}
                    ></SearchForm>
                </div> */}
            </>
        )
    }, [fromName]);

    const [stage, setStage] = useState(<Stage01 />);

    useEffect(() => {console.log(stage)}, [stage])

    function collectToData({ locationName, locationLocation }) { // executed when the user searches for the next location
        rootCollectToData({locationName, locationLocation});
        toName = locationName;
        setStage(<Stage02 />);
    }
    
    function collectFromData({ locationName, locationLocation }) { // executed when the user searches for a previous location
        fromName = locationName;
        rootCollectFromData({locationName, locationLocation}); // should set this element's props
        setStage(<Stage03 />);
    }

    return ( 
        <div className={Styles['addLocation']}>
            <div className={Styles['locationHeader']}>
                <h2>Location {id}</h2>
                <button className={Styles['x']} onClick={xClicked}>X</button>
            </div>
            {stage}
        </div>
    );
}

export default AddLocation;