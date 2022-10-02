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
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
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

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}

export default new AuthService();
