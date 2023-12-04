import React, { useRef, useState } from "react";
import { Card, Form, Button, Container, Alert, Col, Row } from "react-bootstrap";
import { signInWithEmailAndPassword } from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/CurrentUser/currentUser";
import { auth } from "../firebase";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      const { user } = await credential;
      await dispatch(
        setUser({
          id: user.uid,
          name: user.displayName,
        })
      );
      setError(false);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <Container fluid className="p-5">
      <Row className="justify-content-center">
        <Col className="col-12 col-sm-12 col-md-10 col-lg-8">
          <Card className="w-100 w-sm-100">
            <Card.Body>
              <Card.Title className="text-center fs-1">Login</Card.Title>
              <Form onSubmit={(e) => handleSubmit(e)}>
                {error && (
                  <Alert variant="danger">Incorrect email or password</Alert>
                )}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    ref={emailRef}
                    required
                  />
                  <Form.Text className="text-muted">
                    Do not use any sensitive information
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
                <Button variant="primary" type="submit" className="w-100 fs-4">
                  Login
                </Button>
              </Form>
              <div className="mt-2 fs-6">
                Dont't have an Account? <Link to="/SignUp">Sign up</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
