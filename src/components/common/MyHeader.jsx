import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../store/reducers/accountSlice';

function MyHeader() {
    const {accountData} = useSelector(state=>state.accountSlice);
    const {isLoaded} = useSelector(state=>state.accountSlice);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let goLogin = function() {
        // console.log(isLoaded);
        if(isLoaded)dispatch(logout())
        // if(accountData.isLoaded)console.log("loaded")
        navigate("/login");
    }
    return ( 
        <div>
            <Navbar expand="lg" data-bs-theme="dark" bg="dark">
                <Container fluid>
                    <Navbar.Brand ><NavLink to="/">Navbar scroll</NavLink></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        // style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        {/* Left side menu */}
                        {isLoaded&&<div><NavLink to="/profile">Profile</NavLink>
                        <NavLink to="/">Protected route</NavLink></div>}
                    </Nav>
                    <Nav
                        className=" my-2 my-lg-0"
                        // style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/about">About us</NavLink>
                        <NavLink to="/contact" >Contact us</NavLink>
                    </Nav>
                    <Button variant="outline-success" onClick={goLogin}>{isLoaded?"SignOut":"SignIn/SignUp"}</Button>
                    </Navbar.Collapse>
                </Container>
                </Navbar>
        </div>
     );
}

export default MyHeader;