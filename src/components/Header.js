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
    <Stack direction="horizontal" className="w-100 sticky-top" gap={3}>
      <div className="w-100 d-flex justify-content-between align-items-baseline">
        <div className="p-2 gap-2 fw-bold d-flex align-items-baseline fs-1">
          <FaUserCircle onClick={openSideBar} />
          <p className="fs-4 align-self-center">{name}</p>
        </div>
        <div className="p-2 align-self-center ms-auto">
          <Image className="w-75" src={logo} />
        </div>
      </div>
      <SideBar open={sideBar} closeBar={closeSideBar}/>
    </Stack>
  );
}
