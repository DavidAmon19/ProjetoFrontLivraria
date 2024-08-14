import React from "react";
import { Navigate } from "react-router-dom";


const PrivateRoute = () =>{
    const isAutenticated = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    if(!isAutenticated){
        return <Navigate to="/login" />
    }
}


export default PrivateRoute;




