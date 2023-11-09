import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
    const token = localStorage.getItem('token');

    if (token) {
        return element;
    } else {
        return <Navigate to = "/"
        replace = { true }
        />;
    }
};

export default PrivateRoute;