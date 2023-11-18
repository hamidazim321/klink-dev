import { useEffect, useState } from 'react';
import Dashboard from './Dashboard';
import Login from './Login';
import SignUp from './SignUp';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/CurrentUser/currentUser';

function App() {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.currentUser);
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  const {pathname: location} = useLocation()
  const [userOut, setUserOut] = useState(false)

  useEffect(() => {
    // Perform the initial API call only if the uid is null or it's the first check
    if (!uid || !initialCheckDone) {
      console.log(location)
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch(setUser(user.uid));
          console.log('making request')
          setUserOut(false)
        } else {
          dispatch(setUser(null));
          setUserOut(true)
        }

        // Set the initialCheckDone flag to true after the first check
        setInitialCheckDone(true);
      });

      // Clean up the subscription when the component unmounts
      return () => unsubscribe();
    }
  }, [dispatch, uid, initialCheckDone, location]);

  // Render your Routes
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          userOut ? (
            <Navigate replace to="/Login"/>
          ) : (
            <Dashboard />
          )
        } />
        <Route path="/Login" element={
          !userOut ? (
            <Navigate replace to="/"/>
          ) : (
            <Login />
          )
        } />
        <Route path="/SignUp" element={
          !userOut ? (
            <Navigate replace to="/"/>
          ) : (
            <SignUp />
          )
        } />
      </Routes>
    </div>
  );
}

export default App;
