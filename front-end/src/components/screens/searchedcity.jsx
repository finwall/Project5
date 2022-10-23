import {useState} from "react"
import { useLocation, useSearchParams } from "react-router-dom";
import CityService from "../../services/city"

import PageWrapper from "./wrappers/wrapper-regularPage";

export default function SearchedCity () {
    const [searchParams, setSearchParams] = useSearchParams();
    const [cityIsCorrect, setCityIsCorrect] = useState(undefined);
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
                    <div className="flex-item" style={{backgroundColor: 'white', borderRadius: '10%', padding: '1%'}}>Travel Advice</div>
                    <div className="flex-item" style={{backgroundColor: 'white', borderRadius: '10%', padding: '1%'}}>Hotels</div>
                    <div className="flex-item" style={{backgroundColor: 'white', borderRadius: '10%', padding: '1%'}}>Vacation Rentals</div>
                    <div className="flex-item" style={{backgroundColor: 'white', borderRadius: '10%', padding: '1%'}}>Things to Do</div>
                    <div className="flex-item" style={{backgroundColor: 'white', borderRadius: '10%', padding: '1%'}}>Restaurants</div>
                    <div className="flex-item" style={{backgroundColor: 'white', borderRadius: '10%', padding: '1%'}}>Travel Forum</div>
                    <div className="flex-item" style={{backgroundColor: 'white', borderRadius: '10%', padding: '1%'}}>More</div>
                </div>
            </PageWrapper>

        )
    else return (
             <PageWrapper>
                <h1>City not found </h1>
             </PageWrapper>

        )
}