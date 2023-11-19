import React from "react";
import { Stack } from "react-bootstrap";
import { GoHomeFill } from "react-icons/go";
import { IoSearchSharp } from "react-icons/io5";
import { FaBell, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate()

  return (
    <div>
      <Stack
        direction="horizontal"
        className="w-100 sticky-bottom position-fixed bottom-0 border border-2 p-2 fs-3 d-flex justify-content-between"
      >
        <div onClick={()=>navigate('/Home')}>
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
