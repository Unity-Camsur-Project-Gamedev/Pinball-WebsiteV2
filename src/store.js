import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slice/UserSlice";
import bettingReducer from "./Slice/BettingSlice";
import buttonReducer from "./Slice/ButtonSlice";
import modalReducer from "./Slice/ModalSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    betting: bettingReducer,
    button: buttonReducer,
    modal: modalReducer,
  },
});
