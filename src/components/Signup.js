import React, { Component, useState,useRef, useContext } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { connect } from "react-redux";

import { authAction } from "../actions/authAction";

import { useAuth } from '../contexts/authContext';
import {Link, useHistory} from 'react-router-dom';


const Signup = (props) => {


  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signUp, currentUser} = useAuth();
  const [error, setError] = useState('') 
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
      e.preventDefault();
      if (passwordRef.current.value !== passwordConfirmRef.current.value) {
          return setError('Passwords do not match');
      } 

      try {
        setLoading(true)
        setError(''); 
        await signUp(emailRef.current.value, passwordRef.current.value);
        history.push('/');
        
      }catch {
          setError('Failed to create an account');
      }

      setLoading(false);
   
  }


  
  return (
    <>
      <Card>
      {error && <Alert variant="danger">{error}</Alert>}
        <Card.Body>
    
          <h2 className="text-center mb-4">Sign Up</h2>
          <Form onSubmit={e => handleSubmit(e)}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                required
                ref={emailRef}
              ></Form.Control>
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                required
                ref={passwordRef}
               
              ></Form.Control>
            </Form.Group>

            <Form.Group id="password-confirm">
              <Form.Label>Password Confirm</Form.Label>
              <Form.Control
                type="password"
                name="password-confirm"
                required
                ref={passwordConfirmRef}
               
              ></Form.Control>
            </Form.Group>

            <Button disabled = {loading} type="submit" className="w-100">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
};

export default connect(
  (state) => {
    return {};
  },
  { authAction }
)(Signup);
