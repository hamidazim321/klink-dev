import React from "react";
import { Stack } from "react-bootstrap";
import { GoHomeFill } from "react-icons/go";
import { IoSearchSharp } from "react-icons/io5";
import { FaBell, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <div>
      <Stack
        direction="horizontal"
        className="w-100 sticky-bottom position-fixed bottom-0 border border-2 p-2 fs-3 d-flex justify-content-between"
      >
        <div>
          <GoHomeFill />
        </div>
        <div>
          <IoSearchSharp />
        </div>
        <div>
          <FaBell />
        </div>
        <div>
          <FaEnvelope />
        </div>
      </Stack>
    </div>
  );
}
