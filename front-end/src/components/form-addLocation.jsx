import { React, useState, useEffect, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SearchForm from './form-search.jsx';
import { LoginContext } from "../contexts/loginContext";
import { ordinal_suffix_of } from "../constants/utilities.js";

import Styles from './css/form-addLocation.module.css'
import FormSearchStyles from './css/form-search.module.css'

const FLIGHTS_DISPLAY_RESULTS = 3;


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

    const navigate = useNavigate();
    const currentuser = useContext(LoginContext);

    useEffect(() => {
        if (currentuser.token === "") {
            navigate('/login');
        }
    })

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const [flightTimes, setFlightTimes] = useState(
        ['03/21', '03/25', '03/28', '04/10', '04/13', '04/17', '04/24', '06/21', '06/23', '07/11', '07/14', '07/17', '09/08', '09/12', '09/21', '11/04', '11/07']
    );
    const [selectedFlight, setSelectedFlight] = useState(null);

    function getIndexOfNearestDate() {
        let ftM = flightTimes.map(item => {
            let month = item.split('/')[0];
            month = Number.parseInt(month);
            return month;
        })
        let dM = new Date().getMonth();
        for (let i = 0; i < ftM.length; i++) {
            if (ftM[i] >= dM) return i;
        }
        return 0;
    }

    function selectFlight(index) {
        setSelectedFlight(
            <div className={Styles['selectedFlight']}>
                You've selected flight <span>{flightTimes[index]}</span>
            </div>
        )
    }

    let fromName = fromLocationName || "";
    let toName = toLocationName || "";

    function Stage01(props) { // before selected to location
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

    const Stage02 = useCallback((props) => { // after selected to location, before selected from
        return (
            <>
                <Stage01 />
                <div className={Styles['flights']}>
                    <h2>To: <b>{toName}</b></h2>
                    <div className={Styles['map']}>
                        MAP WOULD GO HERE
                    </div>
                    <div className={Styles['flightsSearch']}>
                        <div className={Styles['flightsSearchInterior']}>
                            <h3>Flights</h3>
                            <SearchForm
                                placeholderSupplement="From..."
                                selectItemAction={collectFromData}
                                clearSearch={true}
                            ></SearchForm>
                        </div>
                    </div>
                </div>
            </>
        )
    }, [toName, fromName]);

    const Stage03 = useCallback((props) => { // after selected from
        return (
            <>
                <Stage02 />
                <h2>From: <b>{fromName}</b></h2>
                <div className={Styles['flightsSearch']}>
                    <div className={Styles['flightsSearchInterior']}>

                        <h3 style={{display: 'block', margin: '.8em 0'}}>Available flights</h3>
                        <div className={Styles['flightsSearchRow']}>
                            <h4>Narrow down results</h4>
                            <div className={FormSearchStyles['homepage-search']}>
                                <form className={FormSearchStyles['homepage-search-bar']}>
                                    <div className={FormSearchStyles['homepage-search-bar-flex']}>
                                        <input type="date" autoComplete='off'></input>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <ul className={Styles['results']}>
                            {
                                flightTimes
                                    .slice(getIndexOfNearestDate()) // grab the sub-list starting at the nearest date
                                    .concat(flightTimes.slice(0, getIndexOfNearestDate())) // combine the full list
                                    .slice(0, FLIGHTS_DISPLAY_RESULTS)
                                    .map((time, index) => {
                                    return (
                                        <li key={index}>
                                            {time+"/"+new Date().getFullYear()} 
                                            <button onClick={() => {selectFlight(index)}}>Select flight</button>
                                        </li>
                                    )
                                })
                            }
                        </ul>

                    </div>
                </div>
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