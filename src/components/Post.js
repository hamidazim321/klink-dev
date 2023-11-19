import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Post() {
  const post = useRef();
  return (
    <Form className="w-100 p-2">
      <Form.Control
        type="textarea"
        placeholder="What's on your mind"
        className="mb-2 fs-3"
        style={{ minHeight: "80px" }}
        ref={post}
      />
      <Button variant="primary" type="submit" className="fs-5 border rounded-pill ">
        Post now
      </Button>
    </Form>
  );
}
