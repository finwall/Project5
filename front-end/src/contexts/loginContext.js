import { createContext, useState } from "react";

export const LoginContext = createContext();

export const LoginContextProvider = (props) => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [roles, setRoles] = useState([]);
    const [token, setToken] = useState("");
    // TODO: may consider putting a JSX element hook here to store PFP image link

    /** 
     * Logs in the user on the frontend - stores login credentials in the LoginContext
     * 
     * @param {string} u Username
     * @param {string} e Email
     * @param {string[]} r An array of roles
     * @param {string} t JWT
     */
    const login = (u, e, r, t) => {
        setUsername(u);
        setEmail(e);
        setRoles(r);
        setToken(t);
    }

    return (
        <LoginContext.Provider value={{username, email, roles, token, login}}>
            {props.children}
        </LoginContext.Provider>
    )
}