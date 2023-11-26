import React from "react";
import { useDispatch } from "react-redux";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { setUser } from "../redux/CurrentUser/currentUser";
import { useNavigate } from "react-router-dom";
import { Container, Stack, CloseButton } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import "../styleUtils/utils.css";
import "../styleUtils/animations.css";

export default function SideBar({closeBar, open}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(setUser(null));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Container 
    style={{display: open ? "block" : "none"}}
    className="border border-2 width-75 p-3 width-s-50 width-md-25 width-lg-25 position-fixed z-3 bg-white end-0 top-0 inRight"
    >
      <div className="d-flex justify-content-between align-items-center border-bottom py-3">
        <FaUserCircle className="fs-1" />
        <CloseButton className="fs-4" onClick={closeBar} />
      </div>
      <Stack>
        <span className="p-2" onClick={() => navigate('/post')}>Post</span>
        <span className="p-2" onClick={() => navigate('/myposts')}>My Posts</span>
        <span className="p-2" onClick={handleLogout}>Logout</span>
      </Stack>
    </Container>
  );
}
