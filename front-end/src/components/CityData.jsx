export default class CityData {
    constructor(searchID, placeID, place, description, travelAdvice, hotels, thingsToDo, restaurants, travelForm) {
        // int
        this.searchID = searchID;
        // string
        // don't need to show this to the user
        this.placeID = placeID;
        this.place = place;
        this.description = description;
        this.travelAdvice = travelAdvice;
        // string array
        this.hotels = hotels;
        this.thingsToDo = thingsToDo;
        this.restaurants = restaurants;
        // string or null
        this.travelForm = travelForm;
    }
}