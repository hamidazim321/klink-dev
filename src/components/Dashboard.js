import React, { useEffect } from "react";
import { Button, Container, Card, Image, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const navigate = useNavigate();
  const { username } = useSelector((state) => state.currentUser);
  useEffect(() => {
    if (username) {
      navigate("/Home");
    }
  }, [username, navigate]);
  return (
    // <div>
    //   <Container className="w-100 p-4 d-flex flex-column gap-4 pt-5">
    //     <div>
    // <Image className="w-25" src={logo} />
    //     </div>
    //     <div>
    //       <h1 className="h1 display-1 fw-bold">Happening</h1>
    //       <h2 className=" h2 display-2 fw-bold">now</h2>
    //     </div>
    //     <Card className="w-100 w-sm-100 border-0">
    //       <Card.Body className="d-flex flex-column">
    //         <Card.Title className="fs-1 mb-4">Join Now</Card.Title>
    // <Button
    //   variant="primary"
    //   className="rounded-pill w-50 fs-5 fw-semibold mb-3"
    //   type="button"
    //   onClick={() => navigate('/SignUp')}
    // >
    //   Create account
    // </Button>
    //         <Card.Text className="mb-1 fs-5 ">
    //           Already have an account?
    //         </Card.Text>
    //         <Button
    //           variant="outline"
    //           className="border border-secondary-subtle rounded-pill w-50 fs-5 fw-semibold"
    //           type="button"
    //           onClick={() => navigate('/Login')}
    //         >
    //           Sign in
    //         </Button>
    //       </Card.Body>
    //     </Card>
    //   </Container>
    // </div>
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
            onClick={() => navigate("/SignUp")}
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
            onClick={() => navigate("/Login")}
          >
            Sign in
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
