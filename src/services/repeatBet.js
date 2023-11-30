/* eslint-disable */
import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

export const repeatBet = async (userToken) => {
  const headers = {
    Authorization: `Bearer ${userToken}`,
  };

  try {
    const response = await axios.post(
      `${baseUrl}/user/repeat/create/bet`,
      {},
      { headers }
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      "An error occurred while creating a bet. Please try again later."
    );
  }
};
