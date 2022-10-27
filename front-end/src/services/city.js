import axios from "axios";
const VERIFY_API = "http://localhost:8080/api/search";
const GET_CITY_API ="http://localhost:8080/api/search/";

class CityService{
        verifyCity = (city,location) => {
        // enable code block when endpoint created
        return axios
        .get(VERIFY_API)
            /*.post(VERIFY_API, {
                city,
                location
            })
            */
            .then(response => {
                return response
            })
            .catch(e => {
                console.error(e)
                return null
            })
        /* return new Promise((resolve, reject) => {
            resolve()
        })
        */
        }
        getCityInfo = (city,location) => {
        // enable code block when endpoint created
            return axios
                .get(GET_CITY_API+city)
            .then(response => {
                return response
            })
            .catch(e => {
                console.error(e)
                return null
            })
        /*
        return new Promise((resolve, reject) => {
            resolve()
        })
        */
        }
}
export default new CityService();