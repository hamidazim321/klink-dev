import React, { useState } from "react";
import {
  Card,
  Form,
  Button,
  Container,
  Alert,
  Row,
  Col,
} from "react-bootstrap";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { auth, usersCol } from "../firebase";
import { setUser } from "../redux/CurrentUser/currentUser";
import { addDoc, getDocs, query, where } from "firebase/firestore";

export default function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    const q = query(usersCol, where("username", "==", userName));
    const users = await getDocs(q);
    const { docs } = await users;
    if (docs.length > 0) {
      setError("Username already in use, select another name");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be atleast 8 characters");
      return;
    }
    try {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(credentials.user, {
        displayName: userName,
      });
      const { user } = credentials;
      await addDoc(usersCol, {
        username: userName,
        uid: user.uid,
      });
      dispatch(
        setUser({
          id: user.uid,
          name: userName,
        })
      );
      navigate("/Home");
    } catch (err) {
      if (err.message === "Firebase: Error (auth/email-already-in-use).") {
        setError("This email is already in use");
      }
      console.error(err);
    }
  };

  return (
    <Container fluid className="p-5">
      <Row className="justify-content-center">
        <Col className="col-12 col-sm-12 col-md-10 col-lg-8">
          <Card className="w-100 w-sm-100">
            <Card.Body>
              <Card.Title className="text-center fs-1">Sign up</Card.Title>
              <Form onSubmit={(e) => handleSubmit(e)}>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="username"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    Do not use any sensitive information
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 fs-4">
                  Sign up
                </Button>
              </Form>
              <div className="mt-2 fs-6">
                Already have an Account? <Link to="/Login">Login</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
