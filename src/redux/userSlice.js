import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users:[],
    currentUser: null,
    isLoading: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.error = true;
    },
    logout:(state)=>{
     state.currentUser=null
    },
    fetchUser:(state,action)=>{
     state.users=action.payload
    }
  },
});
export const { loginStart, loginSuccess, loginFailure,fetchUser } = userSlice.actions;
export default userSlice.reducer;
