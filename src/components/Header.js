import React from "react";
import { signOut } from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import { Stack, Image, Button, Dropdown } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import logo from "../assets/logo.svg";
import { useDispatch } from "react-redux";
import { auth } from "../firebase";
import { setUser } from "../redux/CurrentUser/currentUser";
import { useNavigate } from "react-router-dom";
export default function Header({ name }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = async() => {
    try {
      await signOut(auth)
      dispatch(setUser(null))
      console.log('logged out')
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <Stack direction="horizontal" className="w-100 sticky-top" gap={3}>
      <div className="w-100 d-flex justify-content-between align-items-baseline">
        <div className="p-2 gap-2 fw-bold d-flex align-items-center">
          <Dropdown >
            <Dropdown.Toggle
              variant="outline"
              id="dropdown-basic"
              className="fs-1 p-2"
            >
              <FaUserCircle />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item className="fs-3 border-bottom">
                <Button type="button" variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </Dropdown.Item>
              <Dropdown.Item>
                <Button type="button" variant="outline" onClick={() => navigate('/Post')}>
                  Post
                </Button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <p className="fs-4 align-self-end">{name}</p>
        </div>
        <div className="p-2 align-self-center ms-auto">
          <Image className="w-75" src={logo} />
        </div>
      </div>
    </Stack>
  );
}