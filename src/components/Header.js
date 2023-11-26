import React,{useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Stack, Image,} from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import logo from "../assets/logo.svg";
import SideBar from "./SideBar";
export default function Header({ name }) {
  const [sideBar, sideBarState ] = useState(false)
  const closeSideBar = () => {
    sideBarState(false)
  }

  const openSideBar = () => {
    sideBarState(true)
  }
  return (
    <Stack direction="horizontal" className="w-100 sticky-top px-3 border-bottom border-3 bg-white" gap={3}>
      <div className="w-100 d-flex justify-content-between align-items-center">
        <div className="p-2 gap-2 fw-bold d-flex fs-1 align-items-center">
          <FaUserCircle />
          <p className="fs-4 my-auto">{name}</p>
        </div>
        <div className="p-2  ms-auto" onClick={openSideBar}>
          <Image className="w-75" src={logo} />
        </div>
      </div>
      <SideBar open={sideBar} closeBar={closeSideBar}/>
    </Stack>
  );
}
