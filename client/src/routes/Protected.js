import React from 'react'
import { Navigate } from 'react-router-dom';

function Projected({ children }) {
    if (localStorage.getItem('isLoggedIn')) {
        return <Navigate to={'/dashboard'} replace />
    }

    return children;
}

export default Projected