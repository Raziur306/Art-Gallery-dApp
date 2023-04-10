import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, SignIn, SignUp, Error, Forget } from '../pages';
import Protected from './Protected';
import ProtectDashboard from './ProtectDashboard';




const Index = () => {
    return <BrowserRouter >
        <Routes>
            <Route path='/' element={<Protected >
                <SignIn />
            </Protected>} />


            <Route path='/sign_up' element={<Protected>
                <SignUp />
            </Protected>} />


            <Route path='/dashboard' exact element={
                <ProtectDashboard>
                    <Home />
                </ProtectDashboard>
            } />


            <Route path='/password_reset' exact element={<Protected >
                <Forget />
            </Protected>} />
            <Route path='*' element={<Error />} />


        </Routes>
    </BrowserRouter>
}

export default Index