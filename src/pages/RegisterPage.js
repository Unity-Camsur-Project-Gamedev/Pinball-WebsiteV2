/* eslint-disable */
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    // console.log(username, email, number, password);
    e.preventDefault();
    const baseUrl = process.env.REACT_APP_BACKEND_URL;

    try {
      const register = await axios.post(
        `${baseUrl}/user/authentication/register`,
        {
          username: username,
          email: email,
          number: number,
          password: password,
        }
      );
      if (register.data) {
        alert("Created Successfully");
        const userToken = register.data.token;
        Cookies.set("userToken", userToken);
        navigate("/");
      } else {
        alert("Register failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during register:", error);

      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessage = error.response.data.message;
        alert(errorMessage);
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="lg:w-1/5 md:w-1/4 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-8 text-center uppercase">
          Register Account
        </h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-600 text-sm font-medium mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full border rounded-lg p-2"
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-600 text-sm font-medium mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              className="w-full border rounded-lg p-2"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-600 text-sm font-medium mb-2"
              htmlFor="number"
            >
              Number
            </label>
            <input
              type="text"
              id="number"
              placeholder="+63X XXXX XXXX"
              className="w-full border rounded-lg p-2"
              onChange={(e) => {
                setNumber(e.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-600 text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border rounded-lg p-2"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <button
            className="w-full bg-blue-500 text-white font-semibold p-2 rounded-lg hover:bg-blue-600"
            onClick={handleRegister}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
