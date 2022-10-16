import axios from "axios";

const API_URL = "http://localhost:8080/api/users/";

class AuthService {
    login(email, password) {
        return axios
            .post(API_URL + "login", {
                email,
                password
            })
            .then(response => {
                return response.data;
            });
    }

    register(name, email, password, role = ["ROLE_USER"]) {
        return axios.post(API_URL + "signup", {
            name,
            email,
            role,
            password
        });
    }
}

export default new AuthService();
