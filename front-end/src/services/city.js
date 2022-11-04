import axios from "axios";
const GET_CITY_API ="http://localhost:8080/api/search/";

class CityService{

        getCityInfo = (city) => {
            // enable code block when endpoint created
            return axios
                .get(GET_CITY_API+city)
                .then(response => {
                    let rd = response.data;

                    let hotelsArray = rd.hotels
                        .split("|")
                        .map(h => h.trim());
                    
                    let thingsToDo = rd.thingsToDo
                        .split("|")
                        .map(ttd => ttd.trim());
                    
                    let restaurants = rd.restaurants
                        .split("|")
                        .map(r => r.trim());
                    
                    let sortedData = new CityData(rd.searchId, rd.placeId, rd.place, rd.description, rd.travelAdvice, hotelsArray, thingsToDo, restaurants, rd.travelForm);
                    return sortedData;
                })
                .catch(e => {
                    console.warn("There was a problem with the getCityInfo request: ", e);
                    return null
                })
        }
}

class CityData {

    /**
     * Provides an easy way of sorting through the search for city endpoint and organizing results
     * @param {int} searchID the search ID of the resulting search
     * @param {string} placeID the ID from the database of the location (Usually the country)
     * @param {string} place the name of the city/place
     * @param {string} description description of the city
     * @param {string} travelAdvice additional advice
     * @param {[string]} hotels a list of hotels in the area
     * @param {[string]} thingsToDo a list of things to do in the area
     * @param {[string]} restaurants a list of restaruants from the area
     * @param {string|null} travelForm 
     */
    constructor(searchID, placeID, place, description, travelAdvice, hotels, thingsToDo, restaurants, travelForm) {
        this.searchID = searchID;
        this.placeID = placeID;
        this.place = place;
        this.description = description;
        this.travelAdvice = travelAdvice;
        this.hotels = hotels;
        this.thingsToDo = thingsToDo;
        this.restaurants = restaurants;
        this.travelForm = travelForm;
    }
}

export default new CityService();