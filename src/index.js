import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthProvider";
import store from "./store";
import { Provider } from "react-redux";
import { StyledEngineProvider } from "@mui/material/styles";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  //     <App />
  // </React.StrictMode>
  // <AuthProvider>
  //     <App />
  // </AuthProvider>
  <Provider store={store}>
    <App />
  </Provider>
);
