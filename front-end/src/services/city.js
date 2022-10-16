const VERIFY_API = "";
const GET_CITY_API ="";

class CityService{
        verifyCity(city,location) {

        /*
        // enable code block when endpoint created
        return axios
            .get(VERIFY_API, {
                city,
                location
            })
            .then(response => {
                return null
            })
            .catch(e => {
                return null
            })
            */
        return new Promise((resolve, reject) => {
            resolve()
        })
        }
        getCityInfo(city,location) {

        /*
        // enable code block when endpoint created
            return axios
                .get(VERIFY_API, {
                    city,
                    location
             })
            .then(response => {
                return null
            })
            .catch(e => {
                return null
            })
            */
        return new Promise((resolve, reject) => {
            resolve()
        })
        }
}

export default new CityService()



