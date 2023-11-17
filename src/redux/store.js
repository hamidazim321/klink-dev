import {configureStore} from '@reduxjs/toolkit'
import currentUserReducer from './CurrentUser/currentUser'

const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
  }
});

export default store;