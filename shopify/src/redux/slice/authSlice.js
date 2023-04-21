import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userName: null,
  email: null,
  userId: null,
};

const authSlice = createSlice({
  name: " auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER(state, action) {
      console.log(action.payload);
      const { email, userId, userName } = action.payload;
      state.isLoggedIn = true;
      state.email = email;
      state.userName = userName;
      state.userId = userId;
    },
    REMOVE_ACTIVE_USER(state, action) {
      state.isLoggedIn = false;
      state.email = null;
      state.userName = null;
      state.userId = null;
      console.log(state.isLoggedIn);
    },
  },
});

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = authSlice.actions;
export const selectIsLoggedIN = (state) => state.auth.isLoggedIn;
export const selectEmail = (state) => state.auth.email;
export const selectUserName = (state) => state.auth.userName;
export const selectUserId = (state) => state.auth.userId;
export default authSlice.reducer;
