import React from "react";
import {Button} from "react-bootstrap";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../firebase";
import { setUser } from "../redux/CurrentUser/currentUser";

export default function Dashboard() {
  const dispatch = useDispatch()
  const handleLogOut = async() => {
    try {
      await signOut(auth)
      dispatch(setUser(null))
      console.log('logged out')
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <div>
      <Button
        variant="primary"
        type="button"
        onClick={handleLogOut}
        className="w-100 fs-4"
      >
        Logout
      </Button>
    </div>
  );
}
