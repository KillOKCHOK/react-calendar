import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '../../pages/Main';
import AboutUs from '../../pages/AboutUs';
import ContactPage from '../../pages/ContactPage';
import NotFoundPage from '../../pages/NotFoundPage';
import LoginPage from '../../pages/LoginPage';
import SignUpPage from '../../pages/SignUpPage';
import Profile from '../../pages/Profile';

function Content() {
    return ( <div style={{minHeight:"100vh"}}>
        <Routes>
            <Route path="/" element={<Main/>} />
            <Route path="/main" element={<Main/>} />
            <Route path="/about" element={<AboutUs/>} />
            <Route path="/contact" element={<ContactPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/signup" element={<SignUpPage/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    </div> );
}

export default Content;