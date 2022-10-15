import { useLocation } from "react-router-dom";

export default function SearchedCity () {
    const passedcity = useLocation().state;
    console.log(passedcity);
    return (
        <div>
            <h1>Explore {passedcity}</h1>
            <div className="flex-container" style={{flexDirection: "row", alignItems: 'center', justifyContent: 'space-evenly', display: 'flex'}}>
                <div className="flex-item" style={{backgroundColor: 'white', borderRadius: '10%', padding: '1%'}}>Travel Advice</div>
                <div className="flex-item" style={{backgroundColor: 'white', borderRadius: '10%', padding: '1%'}}>Hotels</div>
                <div className="flex-item" style={{backgroundColor: 'white', borderRadius: '10%', padding: '1%'}}>Vacation Rentals</div>
                <div className="flex-item" style={{backgroundColor: 'white', borderRadius: '10%', padding: '1%'}}>Things to Do</div>
                <div className="flex-item" style={{backgroundColor: 'white', borderRadius: '10%', padding: '1%'}}>Restaurants</div>
                <div className="flex-item" style={{backgroundColor: 'white', borderRadius: '10%', padding: '1%'}}>Travel Forum</div>
                <div className="flex-item" style={{backgroundColor: 'white', borderRadius: '10%', padding: '1%'}}>More</div>
            </div>
        </div>
    )
}