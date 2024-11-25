/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

//API
import authService from "../services/auth/auth.service";

//redux
import { useDispatch } from "react-redux";
import { setUser } from "../Slice/UserSlice";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/dashboard">
        Pinball Breddas
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    navigate("/game/pinball");
    // e.preventDefault(); // Prevent default form submission

    // const data = new FormData(e.currentTarget);
    // const username = data.get("username");
    // const password = data.get("password");

    // const response = await authService.loginUser(username, password);

    // if (response.token) {
    //   Cookies.set("token", response.token, { expires: 4 });
    //   toast.success("Successfully logged in.");
    //   navigate("/game/pinball");
    // } else {
    //   toast.error("Invalid Credentials");
    // }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        justifyContent: "center",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: "600",
            fontSize: "2rem",
          }}
        >
          Pinball Login
        </Typography>
        <Typography
          component="h1"
          variant="h5"
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: "300",
            fontSize: "1rem",
          }}
        >
          Welcome!
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            inputProps={{ style: { fontFamily: "Poppins, sans serif" } }}
            InputLabelProps={{ style: { fontFamily: "Poppins, sans serif" } }}
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            inputProps={{ style: { fontFamily: "Poppins, sans serif" } }}
            InputLabelProps={{ style: { fontFamily: "Poppins, sans serif" } }}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4, fontFamily: "Poppins, sans serif" }} />
    </Container>
  );
};

export default LoginPage;
