import axios from "axios";
import DefaultImage from '../assets/graphics/rough-horn-2146181_640.jpg'

const API_URL = "http://localhost:8080/api/search";
const TEST_LOCATION = "Himalayan Mountains, Nepal";

class SearchService {

    query(string, maxResults) {

        let returnArray = [];

        /*
        // enable code block when endpoint created
        return axios
            .post(API_URL, {
                string
            })
            .then(response => {
                // loop through and convert all returned data to SearchResult objects;
                // put objects into array, limit maxResults
                for (let i = 0; i < maxResults; i++) {
                    returnArray.push(new SearchResult(`Result${string.substring(0,3)}${i}`,`Location${i}`, null))
                }
                return returnArray;
            })
            .catch(e => {
                returnArray.push(new SearchResult(string, null, DefaultImage))
                return returnArray;
            })
            */
        return new Promise((resolve) => {
            for (let i = 0; i < maxResults; i++) {
                returnArray.push(new SearchResult(string, TEST_LOCATION, DefaultImage))
            }
            resolve(returnArray);
        }) 
    }

}

class SearchResult {

    // the hashtags make these variables private.
    // it is simpler for them to be read-only.
    #name;
    #location;
    #imageURL;

    constructor(name, location, imageURL) {
        this.#name = name;
        this.#location = location;
        this.#imageURL = imageURL;
    }

    getName() {
        return this.#name;
    }

    getLocation() {
        return this.#location;
    }

    getImageURL() {
        return this.#imageURL;
    }

    /* Returns true if the same item, false if not */
    compare(SearchRes) {
        if (!(SearchRes instanceof SearchResult)) return false;
        if (SearchRes.getName() !== this.#name) return false;
        if (SearchRes.getLocation() !== this.#location) return false;
        if (SearchRes.getImageURL() !== this.#imageURL) return false;
        return true;
    }

}

export default new SearchService();
