import {useState} from "react"
import { useSearchParams } from "react-router-dom";
import CityService from "../../services/city"

import PageWrapper from "./wrappers/wrapper-regularPage";
import CityData from "../CityData";
import Styles from '../css/searchedcity.module.css';

export default function SearchedCity () {
    const [searchParams ] = useSearchParams();
    const [cityIsCorrect, setCityIsCorrect] = useState(undefined);

    const samplecity = new CityData(
        1,
        "ChIJN1t_tDeuEmsRUsoyG83frY4",
        "New York",
        "New York is the most populous city in the United States. With an estimated 2019 population of 8,336,817 distributed over a land area of about 302.6 square miles (784 km2), New York is also the most densely populated major city in the United States. Located at the southern tip of the state of New York, the city is the center of the New York metropolitan area, the largest metropolitan area in the world by urban landmass. With almost 20 million people in its metropolitan statistical area and approximately 23 million in its combined statistical area, it is one of the world's most populous megacities.",
        "Visit for the views, stay for the food",
        ["Hotel 1", "Hotel 2", "Hotel 3"],
        ["Thing 1", "Thing 2", "Thing 3"],
        ["Restaurant 1", "Restaurant 2", "Restaurant 3"],
        "https://en.wikipedia.org/wiki/New_York_City"
    )

    function verifyCity(){
        let name = searchParams.getAll("city")
        let location = searchParams.getAll("location")
        CityService.verifyCity(name,location)
            .then((response) => {
                console.log(response)
                setCityIsCorrect(true);
            })
            .catch(() => {
                setCityIsCorrect(false);
            });
    }
    verifyCity()
    if (cityIsCorrect === undefined) return (
            <PageWrapper>
                <h1>Searching... </h1>
            </PageWrapper>
        )
    else if (cityIsCorrect === true) return (
            <PageWrapper>
                <h1>Explore {searchParams.getAll("city")}</h1>
                <div className="flex-container" style={{flexDirection: "row", alignItems: 'center', justifyContent: 'space-evenly', display: 'flex'}}>
                    <div className={Styles['column-items']}>
                        <div>Travel Advice</div>
                        <div>{samplecity.travelAdvice}</div>
                    </div>
                    <div className={Styles['column-items']} style={{width: '10%'}}>
                        <div>Hotels</div>
                        {samplecity.hotels.map((hotel) => {
                            return <div>{hotel}</div>
                        })}
                    </div>
                    <div className={Styles['column-items']}>
                        <div>Vacation Rentals</div>
                    </div>
                    <div className={Styles['column-items']}>
                        <div>Things to Do</div>
                        {samplecity.thingsToDo.map((thing) => {
                            return <div>{thing}</div>
                        })}
                    </div>
                    <div className={Styles['column-items']}>
                        <div>Restaurants</div>
                        {samplecity.restaurants.map((restaurant) => {
                            return <div>{restaurant}</div>
                        })}
                    </div>
                    <div className={Styles['column-items']}>
                        <div>Travel Forum</div>
                        <div><a href={samplecity.travelForm}>{samplecity.travelForm}</a></div>
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