import { useEffect } from "react";
import { useState } from "react"
import { useSearchParams } from "react-router-dom";
import CityService from "../../services/city"
import PageWrapper from "./wrappers/wrapper-regularPage";
import Styles from '../css/searchedcity.module.css';

export default function SearchedCity () {

    const [searchParams] = useSearchParams();
    const [cityIsCorrect, setCityIsCorrect] = useState(undefined);
    const [cityData, setCityData] = useState(undefined);

    function getCityInfo(){
        let name = searchParams.get("city")
        let location = searchParams.get("location")

        const onFailure = (errorResponse) => {
            setCityData(errorResponse);
            setCityIsCorrect(false);
        }

        if (name === "") {
            onFailure(null);
            return;
        }

        CityService.getCityInfo(name)
            .then((response) => {
                setCityData(response);
                setCityIsCorrect(true);
            })
            .catch(onFailure);
    }
    
    useEffect(() => {
        getCityInfo();
    }, [])

    if (cityData === undefined) return (
            <PageWrapper>
                <h1>Searching... </h1>
            </PageWrapper>
        )
    else if (typeof cityData === 'object' && cityData !== null) return (
            <PageWrapper>
                <h1>Explore {searchParams.getAll("city")}</h1>
                <div className="flex-container" style={{flexDirection: "row", alignItems: 'top', gap: '1em', justifyContent: 'space-evenly', display: 'flex'}}>
                    <div className={Styles['column-items']}>
                        <div>Travel Advice</div>
                        <div>{cityData.travelAdvice}</div>
                    </div>
                    <div className={Styles['column-items']} style={{width: '10%'}}>
                        <div>Hotels</div>
                        {cityData.hotels.map((hotel) => {
                            return <div>{hotel}</div>
                        })}
                    </div>
                    <div className={Styles['column-items']}>
                        <div>Vacation Rentals</div>
                    </div>
                    <div className={Styles['column-items']}>
                        <div>Things to Do</div>
                        {cityData.thingsToDo.map((thing) => {
                            return <div>{thing}</div>
                        })}
                    </div>
                    <div className={Styles['column-items']}>
                        <div>Restaurants</div>
                        {cityData.restaurants.map((restaurant) => {
                            return <div>{restaurant}</div>
                        })}
                    </div>
                    <div className={Styles['column-items']}>
                        <div>Travel Forum</div>
                        <div><a href={cityData.travelForm}>{cityData.travelForm}</a></div>
                    </div>
                </div>
            </PageWrapper>

        )
    else return (
             <PageWrapper>
                <h1>City not found </h1>
             </PageWrapper>

        )
}