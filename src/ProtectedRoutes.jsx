import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
    const myToken = useSelector((e) => e.token);

    if (!myToken) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};
export default ProtectedRoute;
