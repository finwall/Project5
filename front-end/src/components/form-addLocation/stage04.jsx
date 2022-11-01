import {React, useState} from "react";
import Stage03 from "./stage03";
import CityService from '../../services/city';

import Styles from '../css/form-addLocation.module.css';
import FormSearchStyles from '../css/form-search.module.css'


const FLIGHTS_DISPLAY_RESULTS = 3;

function Stage04(props) { // after selected flight

    const [listResults, setListResults] = useState(null);

    CityService.getCityInfo(props.toName)
        .then((response) => {
            setListResults(
                <>
                {
                    response.restaurants.map(restaurant => {
                        return (
                            <li>
                                <label>
                                    {restaurant}
                                    <input type="checkbox" value={restaurant}></input>
                                </label>
                            </li>
                        )
                    })
                }
                </>
            )
        })
        .catch((err) => {
            console.error(err);
            setListResults(
                <div>No amenities found</div>
            )
        })

    function selectAmenities(index) {
        props.addAmenities(/*something*/);
    }

    return (
        <>
            <Stage03 
                id={props.id} 
                toName={props.toName} 
                fromName={props.fromName}
                getToLocation={props.getToLocation} 
                getFromLocation={props.getFromLocation}
                getFlight={props.getFlight} 
                />
            <div className={Styles['selectedFlight']}>
                You've selected flight <span>{props.flight}</span>
            </div>
            <h2>Add amenities:</h2>
            <div className={Styles['flightsSearch']}>
                <div className={Styles['flightsSearchInterior']}>

                    <h3 style={{ display: 'block', margin: '.8em 0' }}>Available restaurants in {props.toName}</h3>
                    <form onSubmit={(e) => {e.preventDefault(); console.log(e)}}>
                        <ul className={Styles['results']}>
                        {
                            listResults   
                        }
                        </ul>
                    </form>

                </div>
            </div>
        </>
    )
}

export default Stage04;