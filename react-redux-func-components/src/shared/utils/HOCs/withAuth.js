import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const withAuth = (WrappedComponent, shouldBeLogged) => {
    return (props) => {
        const user = useSelector((state) => state.user);
        const navigate = useNavigate();

        useEffect(() => {
            if (!user && shouldBeLogged) {
                navigate("/login");
            }

            if (user && !shouldBeLogged) {
                navigate("/");
            }
        }, [user]);

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;

// hook for todo data to map it
