import React from "react";
import PageWrapper from "./wrappers/wrapper-regularPage";
import Location from '../form-addLocation';
import { useState } from "react";

function CreateItinerary() {

    const [locationData, setLocationData] = useState([
        {fromLocationName: null, fromLocationID: null, toLocationName: null, toLocationID: null}
    ]);


    function collectToData({ locationName, locationLocation }, elementIndex) {
        let currentLocationData = locationData.map((item) => {return item});
        currentLocationData[elementIndex].fromLocationName = locationName;
        currentLocationData[elementIndex].fromLocationID = locationLocation;
        setLocationData(currentLocationData);
        // console.log("updated ", locationData, "with ", currentLocationData)
    }

    function collectFromData({ locationName, locationLocation }, elementIndex) {
        let currentLocationData = locationData.map((item) => { return item });
        currentLocationData[elementIndex].toLocationName = locationName;
        currentLocationData[elementIndex].toLocationID = locationLocation;
        setLocationData(currentLocationData);   
        // console.log("updated ", locationData, "with ", currentLocationData)
    }


    return ( 
        <PageWrapper>
            {
                locationData.map((location, index) => {
                    return (
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <Location
                                id={index+1}
                                fromLocationName={location.fromLocationName}
                                fromLocationID={location.fromLocationID}
                                toLocationName={location.toLocationName}
                                toLocationID={location.toLocationID}
                                rootCollectToData={({locationName, locationLocation}) => {collectToData({locationName, locationLocation}, index)}}
                                rootCollectFromData={({locationName, locationLocation}) => {collectFromData({locationName, locationLocation}, index)}}
                            ></Location>
                        </div>
                    )
                })
            }
        </PageWrapper>
    );
}

export default CreateItinerary;