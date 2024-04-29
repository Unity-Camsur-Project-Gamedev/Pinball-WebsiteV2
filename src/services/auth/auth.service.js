import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

const loginUser = async (identifier, password) => {
  const body = {
    identifier,
    password,
  };

  try {
    const response = await axios.post(
      `${baseUrl}/user/authentication/login`,
      body
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const checkSession = async (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.get(`${baseUrl}/user/check/session`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default {
  loginUser,
  checkSession,
};
