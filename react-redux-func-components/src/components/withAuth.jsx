import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function withAuth(WrappedComponent, shouldBeLogged) {
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
        }, []);

        return <WrappedComponent {...props} />;
    };
}
