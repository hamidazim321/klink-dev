import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  uid: null
}
const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setUser: (state, {payload}) => {
      if (payload){
        return {
          ...state,
          uid: payload
        }
      }else {
        return {
          ...state
        }
      }
    }
  }
})

export default currentUserSlice.reducer
export const {setUser} = currentUserSlice.actions

