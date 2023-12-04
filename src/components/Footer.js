import React from "react";
import { Stack } from "react-bootstrap";
import { GoHomeFill } from "react-icons/go";
import { FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {

  return (
    <div>
      <Stack
        direction="horizontal"
        className="w-100 sticky-bottom position-fixed bottom-0 border border-2 p-2 fs-3 d-flex justify-content-around"
      >
        <Link className="p-2 text-decoration-none text-black" to="/home">
          <GoHomeFill />
        </Link>

        <Link className="p-2 text-decoration-none text-black" to="/inbox">
          <FaEnvelope />
        </Link>
      </Stack>
    </div>
  );
}
