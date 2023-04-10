import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectDashboard({ children }) {
    if (!localStorage.getItem('isLoggedIn')) {
        return <Navigate to={'/'} replace />
    }
    return children;
}

export default ProtectDashboard