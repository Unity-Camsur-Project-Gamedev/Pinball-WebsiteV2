import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  walletOpen: false,
};

const ModalSlice = createSlice({
  name: "modal", // Make sure to use a string for the name
  initialState,
  reducers: {
    handleWalletOpen: (state) => {
      state.walletOpen = true;
    },
    handleWalletClose: (state) => {
      state.walletOpen = false;
    },
  },
});

export const { handleWalletOpen, handleWalletClose } = ModalSlice.actions;

export default ModalSlice.reducer;
