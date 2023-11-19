import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/CurrentUser/currentUser";
import PrivateRoute from "./PrivateRoute";
import Header from "./Header";
import { onAuthStateChanged } from "firebase/auth";
import Footer from "./Footer";
import MakePost from "./MakePost";
import Dashboard from "./Dashboard";
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";
import MyPosts from "./MyPosts";

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
      {currentUser.uid && <Header name={currentUser.username} />}
      {currentUser.uid && <Footer />}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/Login"
          element={currentUser.uid ? <Navigate replace to={`/Home`} /> : <Login />}
        />
        <Route
          path="/SignUp"
          element={currentUser.uid ? <Navigate replace to={`/Home`} /> : <SignUp />}
        />
        <Route
          path="/Home"
          element={<PrivateRoute user={currentUser.uid} children={<Home />} />}
        />
        <Route
          path="/Post"
          element={<PrivateRoute user={currentUser.uid} children={<MakePost />} />}
        />
        <Route
          path="/My-Posts"
          element={<PrivateRoute user={currentUser.uid} children={<MyPosts />} />}
        />
      </Routes>
    </div>
  );
}

export default App;
