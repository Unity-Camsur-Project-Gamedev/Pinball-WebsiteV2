import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

export const getGameID = async () => {
  try {
    const response = await axios.get(`${baseUrl}/game/current/gameID`);
    // console.log('Response api:', response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      "An error occurred while creating a bet. Please try again later."
    );
  }
};
