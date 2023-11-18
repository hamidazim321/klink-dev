import { useEffect, useState } from 'react';
import Dashboard from './Dashboard';
import Login from './Login';
import SignUp from './SignUp';
import Home from './Home'
import { Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/CurrentUser/currentUser';

function App() {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.currentUser);
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  const [userOut, setUserOut] = useState(false)

  useEffect(() => {
    if (!uid || !initialCheckDone) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch(
            setUser({
              id: user.uid,
              name: user.displayName,
            })
          )
          setUserOut(false)
        } else {
          dispatch(setUser(null));
          setUserOut(true)
        }
        setInitialCheckDone(true);
      });
      return () => unsubscribe();
    }
  }, [dispatch, uid, initialCheckDone]);


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/Login" element={
          !userOut ? (
            <Navigate replace to={`/Home`}/>
          ) : (
            <Login />
          )
        } />
        <Route path="/SignUp" element={
          !userOut ? (
            <Navigate replace to={`/Home`}/>
          ) : (
            <SignUp />
          )
        } />
        <Route path="/Home" element={
          userOut ? (
            <Navigate replace to="/Login"/>
          ) : (
            <Home />
          )
        } />
      </Routes>
    </div>
  );
}

export default App;
