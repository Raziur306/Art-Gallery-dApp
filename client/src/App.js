import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, SignIn, SignUp, Error, Forget } from './pages';

//firebase auth
import './config/firebaseConfig'

function App() {
    return (
        <BrowserRouter >
            <Routes>
                <Route path='/' element={<SignIn />} />
                <Route path='/sign_up' element={<SignUp />} />
                <Route path='/dashboard' exact element={<Home />} />
                <Route path='/password_reset' exact element={<Forget />} />
                <Route path='*' element={<Error />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App