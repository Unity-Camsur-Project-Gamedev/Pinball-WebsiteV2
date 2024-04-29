import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: "",
  username: "",
  email: "",
  number: "",
  credits: 0,
  betHistory: [],
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { uid, username, email, number } = action.payload;
      state.uid = uid;
      state.username = username;
      state.email = email;
      state.number = number;
    },
    setCredits: (state, action) => {
      const credits = action.payload;
      state.credits = credits;
    },
    setBetHistory: (state, action) => {
      state.betHistory = action.payload;
    },
  },
});

export const { setUser, setCredits, setBetHistory } = UserSlice.actions;

export default UserSlice.reducer;
