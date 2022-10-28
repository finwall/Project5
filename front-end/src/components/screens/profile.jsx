import { useContext, useEffect } from "react";
import PageWrapper from "./wrappers/wrapper-regularPage";
import { LoginContext } from "../../contexts/loginContext";
import { useNavigate } from "react-router-dom";

export default function Profile(navpagestate) {
    const currentuser = useContext(LoginContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (navpagestate) {
            navigate('/profile');
        }
    }, [navigate, navpagestate]);
    return (
        <PageWrapper>
            <h1>Welcome {currentuser.username}!</h1>
        </PageWrapper>
    )
}