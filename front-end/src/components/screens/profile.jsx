import { useContext, useEffect } from "react";
import PageWrapper from "./wrappers/wrapper-regularPage";
import { LoginContext } from "../../contexts/loginContext";
import { useNavigate } from "react-router-dom";

import Styles from './css/profile.module.css'

export default function Profile(navpagestate) {
    
    const currentuser = useContext(LoginContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (currentuser.token === "") {
            navigate('/login');
        }
    }, [navigate, navpagestate]);
    
    function routeToNewItinerary(e) {
        navigate('/create-new-itinerary');
    }

    return (
        <PageWrapper>
            <h1>Welcome {currentuser.email}!</h1>
            <div className={Styles['itinerarySection']}>
                <button onClick={routeToNewItinerary}>Create new itinerary</button>
            </div>
        </PageWrapper>
    )
}