import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  colorName: [
    "Red",
    "Blue",
    "Yellow",
    "Green",
    "Gold",
    "Violet",
    "Orange",
    "Pink",
    "Cyan",
  ],
  colorHex: [
    "#ED3130",
    "#276ADD",
    "#F4FF63",
    "#56DE33",
    "#FFD700",
    "#9A3FBC",
    "#F08F40",
    "#DC63D0",
    "#33C5ED",
  ],
  selectedColorIndex: null,
};

const ButtonSlice = createSlice({
  name: "button",
  initialState,
  reducers: {
    setSelectedColorIndex: (state, action) => {
      const selectedColorIndex = action.payload;
      state.selectedColorIndex = selectedColorIndex;
    },
  },
});

export const { setSelectedColorIndex } = ButtonSlice.actions;

export default ButtonSlice.reducer;
