import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import md5 from "md5";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/reducers/accountSlice';
import Modal from 'react-bootstrap/Modal';

function LoginPage() {
    return ( <div className='container'>
        <h1>LoginPage</h1>
        <BasicExample/>
    </div> );
}

function BasicExample() {
    const {accountData} = useSelector(state=>state.accountSlice)
    const {error} = useSelector(state=>state.accountSlice)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let goToSignUp = () => {
        navigate("/signup");
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log(e.target.validationCustom01.value);
        console.log(e.target.validationCustom02.value);
        let pwd = md5(e.target.validationCustom02.value);
        await dispatch(loginUser({
            login:e.target.validationCustom01.value,
            password:pwd,
            navigateToMain : ()=>{navigate("/");},
            showError:()=>{handleShow()}
          }))
          
        
    } 

    return (
      <>
      <Form onSubmit={handleSubmit}>
            <Form.Group controlId="validationCustom01">
                <Form.Label>Login</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Login"
                    defaultValue=""
                />
            </Form.Group>
            <Form.Group controlId="validationCustom02">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    required
                    type="password"
                    placeholder="Password"
                    defaultValue=""
                />
            </Form.Group>
            <br/>
            <Button type="submit" >Submit</Button>
        </Form>
        <br/>
        <br/>
        <p>Didn't create an account yet - SignUp</p>
        <Button onClick={goToSignUp}>SignUp</Button>
        <br></br>
         {/* <p>{JSON.stringify(accountData)}</p> */}
        {/* <p>{JSON.stringify(error)}</p> */} 
        
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>{error.message}</Modal.Body>
            <Modal.Body>Try one more time</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
      </>
    );
  }
  

export default LoginPage;