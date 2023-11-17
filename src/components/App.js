import { useEffect, useState } from 'react';
import Dashboard from './Dashboard';
import Login from './Login';
import SignUp from './SignUp';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/CurrentUser/currentUser';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uid } = useSelector((state) => state.currentUser);
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  useEffect(() => {
    // Perform the initial API call only if the uid is null or it's the first check
    if (!uid || !initialCheckDone) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch(setUser(user.uid));
          console.log('making request')
        } else {
          dispatch(setUser(null));
          navigate('/Login');
        }

        // Set the initialCheckDone flag to true after the first check
        setInitialCheckDone(true);
      });

      // Clean up the subscription when the component unmounts
      return () => unsubscribe();
    }
  }, [dispatch, navigate, uid, initialCheckDone]);

  // Render your Routes
  return (
    <div className="App">
      <Routes>
        <Route path="Login" element={<Login />} />
        <Route path="SignUp" element={<SignUp />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
