import React, { Component, useState, useRef, useContext } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { authAction } from "../actions/authAction";
import { useAuth } from "../contexts/authContext";
import { Link, useHistory } from "react-router-dom";

const UpdateProfile = (props) => {
  const { updateEmail, updatePassword, currentUser } = useAuth();
  const emailRef = useRef(currentUser.email);
  const passwordRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const promises = [];
    if (emailRef.current.value !== currentUser.email.value) {
      promises.push(updateEmail(emailRef.current.value));
    }

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("Failed to update accaunt");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Card>
        {error && <Alert variant="danger">{error}</Alert>}
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                required
                ref={emailRef}
                defaultValue={emailRef.current}
              ></Form.Control>
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                ref={passwordRef}
              ></Form.Control>
            </Form.Group>

            <Button disabled={loading} type="submit" className="w-100">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-2">
        <Link to="/login">Cancel</Link>
      </div>
    </>
  );
};

export default connect(
  (state) => {
    return {};
  },
  { authAction }
)(UpdateProfile);
