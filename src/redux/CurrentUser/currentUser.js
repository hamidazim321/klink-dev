import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: null,
  username: null,
};
const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      if (payload) {
        return {
          ...state,
          uid: payload.id,
          username: payload.name,
        };
      } else {
        return {
          ...state,
          uid: null,
          username: null,
        };
      }
    },
  },
});

export default currentUserSlice.reducer;
export const { setUser } = currentUserSlice.actions;
