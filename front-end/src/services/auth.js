import axios from "axios";

const API_URL = "http://localhost:8080/api/users/";

class AuthService {
    login(username, email, password) {
        return axios
            .post(API_URL + "login", {
                username,
                email,
                password
            })
            .then(response => {
                return response.data;
            });
    }

    register(fname, lname, username, email, password, role = ["ROLE_USER"]) {
        return axios.post(API_URL + "signup", {
            username,
            fname,
            lname,
            email,
            role,
            password
        });
    }
}

export default new AuthService();
