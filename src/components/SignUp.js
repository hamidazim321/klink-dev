import React, { useRef } from "react";
import { Card, Form, Button, Container } from "react-bootstrap";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { setUser } from "../redux/CurrentUser/currentUser";

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      const { user } = credentials;
      dispatch(setUser(user.uid))
      navigate('/Home')
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container fluid className="d-flex flex-column">
      <Card className="w-100 w-sm-100">
        <Card.Body>
          <Card.Title className="text-center fs-1">Sign up</Card.Title>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                ref={emailRef}
                required
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                ref={passwordRef}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                ref={confirmPasswordRef}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 fs-4">
              Sign up
            </Button>
          </Form>
          <div className="mt-2 fs-6">
            Already have an Account? <Link to='/Login'>Login</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
