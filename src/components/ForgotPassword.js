
import React, { Component, useState,useRef, useContext } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { connect } from "react-redux";

import { authAction } from "../actions/authAction";

import { useAuth } from '../contexts/authContext';

import { Link, useHistory } from 'react-router-dom';



const ForgotPassword = (props) => {


  const emailRef = useRef();


  const { resetPassword, currentUser} = useAuth();

  const [error, setError] = useState('') 
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
      e.preventDefault();
    
      try {
        setMessage('')
        setError(''); 
        setLoading(true)
        await resetPassword(emailRef.current.value);
        setMessage('Check your inbox for further instructions')
      }catch {
          setError('Failed to reset password');
      }

      setLoading(false);
   
  }


  
  return (
    <>
      <Card>
      
      {error && <Alert variant="danger">{error}</Alert>}
      {message}
        <Card.Body>
      
          <h2 className="text-center mb-4">Password Reset</h2>
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

            <Button disabled = {loading} type="submit" className="w-100">
            Reset Password
            </Button>
          </Form>
        </Card.Body>
      </Card>
  
      <div className="w-100 text-center mt-2">
       <Link to="/login">Login</Link>
      </div>
    </>
  );
};

export default connect(
  (state) => {
    return {};
  },
  { authAction }
)(ForgotPassword);
