/* eslint-disable */
import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
// import Player from './components/Player';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LiveGameStreamPage from "./pages/LiveGameStreamPage";
import { ToastContainer } from 'react-toastify';
import Login from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <ToastContainer position="top-center" autoClose={3000} />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* <Route path="/game/pinball" element={<LiveGameStreamPage />} /> */}
          <Route exact path="/game/pinball" element={<ProtectedRoute />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
