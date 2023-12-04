import React, { useEffect } from "react";
import { Button, Container, Image, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const navigate = useNavigate();
  const { username } = useSelector((state) => state.currentUser);
  useEffect(() => {
    if (username) {
      navigate("/home");
    }
  }, [username, navigate]);
  return (
    <Container fluid className="p-5">
      <Row className="gy-2">
        <Col className="col-12 col-lg-6">
          <Image className="w-25" src={logo} />
        </Col>
        <Col>
          <h1 className="h1 display-1 fw-bold">Happening</h1>
          <h2 className=" h2 display-2 fw-bold">now</h2>
        </Col>
      </Row>
      <Row className="gy-2">
        <Col className="col-12">
          <p className="display-6 fw-bold">Join Now</p>
        </Col>
        <Col className="col-12">
          <Button
            variant="primary"
            className="rounded-pill fs-5 px-5 fw-semibold mb-3"
            type="button"
            onClick={() => navigate("/signUp")}
          >
            Create account
          </Button>
        </Col>
        <Col className="col-12">
          <span className="fs-4">Already have an account?</span>
        </Col>
        <Col className="col-12">
          <Button
            variant="outline"
            className="border px-5 border-secondary-subtle rounded-pill fs-5 fw-semibold"
            type="button"
            onClick={() => navigate("/login")}
          >
            Sign in
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
