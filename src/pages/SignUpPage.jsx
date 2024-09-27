import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../store/reducers/registrationSlice';
import md5 from 'md5';
import Modal from 'react-bootstrap/Modal';

function SignUpPage() {
    return ( <div className='container'>
        <h1>SignUp</h1>
        <BasicExample/>
    </div> );
}

function BasicExample() {
    const {error} = useSelector(state=>state.registrationSlice)
    const {response} = useSelector(state=>state.registrationSlice)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleGoLogin = ()=>{
        handleClose();
        navigate("/login")
    }

    let goToLogin = () => {
        navigate("/login");
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(e.target.validationCustom01.value);
        console.log(e.target.validationCustom02.value);
        let pwd = md5(e.target.validationCustom02.value);
        dispatch(registerUser({
            login:e.target.validationCustom01.value,
            password:pwd,
            showMessage:()=>handleShow(),
          }));
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
        <p>Already have an account - LogIn</p>
        <Button onClick={goToLogin}>Login</Button>
        <br/>
        <br/>
        {/* {JSON.stringify(error)} */}

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>{error?"Error":"Success"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{error?error.message+", Something went wrong. Try one more time.":response.message}</Modal.Body>
            {/* "Something went wrong, please try one more time" */}
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleGoLogin}>
                Try to Login
            </Button>
            </Modal.Footer>
        </Modal>
      </>
    );
  }

export default SignUpPage;