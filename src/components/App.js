import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/CurrentUser/currentUser";
import PrivateRoute from "./PrivateRoute";
import { onAuthStateChanged } from "firebase/auth";
import MakePost from "./MakePost";
import Dashboard from "./Dashboard";
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";
import MyPosts from "./MyPosts";
import Inbox from "./Inbox";
import SideBar from "./SideBar";

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.uid !== currentUser.uid) {
        dispatch(
          setUser({
            id: user.uid,
            name: user.displayName,
          })
        );
      }
      setLoading(false)
    });
    return () => unsubscribe();
  }, [dispatch, currentUser]);

  if (loading) {
    return <div></div>; 
  }

  return (
    <div className="App">
      <Routes>
        <Route path="sidebar" element={<SideBar/>}/>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/login"
          element={currentUser.uid ? <Navigate replace to={`/home`} /> : <Login />}
        />
        <Route
          path="/signUp"
          element={currentUser.uid ? <Navigate replace to={`/home`} /> : <SignUp />}
        />
        <Route
          path="/home"
          element={<PrivateRoute user={currentUser.uid} children={<Home />} />}
        />
        <Route
          path="/post"
          element={<PrivateRoute user={currentUser.uid} children={<MakePost />} />}
        />
        <Route
          path="/myposts"
          element={<PrivateRoute user={currentUser.uid} children={<MyPosts />} />}
        />
        <Route
          path="/inbox"
          element={<PrivateRoute user={currentUser.uid} children={<Inbox />} />}
        />
      </Routes>
    </div>
  );
}

export default App;
