import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Stack, Image } from "react-bootstrap";
import logo from "../assets/logo.svg";
export default function Header({name}) {
  return (
    <Stack direction="horizontal" className="w-100" gap={3}>
      <div className="w-50 d-flex justify-content-between">
        <div className="p-2 fw-bold">{name}</div>
        <div className="p-2">
          <Image className="w-50" src={logo} />
        </div>
      </div>
    </Stack>
  );
}
