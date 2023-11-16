/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Alert, Button, ButtonGroup } from "@mui/material";
import { getBetHistory } from "../services/getBetHistory";
import useLiveStream from "../context/LiveStreamContext";
import EmbossedColor from "../components/EmbossedColor";

const ColorInputs = ({ selectedButton, colorHex, handleBetOnColor }) => {
  const { userBets } = useLiveStream();
  const [redBetArray, setRedBetArray] = useState([]);
  const [blueBetArray, setBlueBetArray] = useState([]);
  const [yellowBetArray, setYellowBetArray] = useState([]);
  const [greenBetArray, setGreenBetArray] = useState([]);
  const [goldBetArray, setGoldBetArray] = useState([]);
  const [violetBetArray, setVioletBetArray] = useState([]);
  const [orangeBetArray, setOrangeBetArray] = useState([]);
  const [pinkBetArray, setPinkBetArray] = useState([]);
  const [cyanBetArray, setCyanBetArray] = useState([]);

  // useEffect(() => {
  //   const ongoingRows = userBets
  //     .filter((item) => item.winLose === "On going")
  //     .map((item) => ({
  //       betColor: item.bet,
  //       betAmount: item.betAmount,
  //       status: item.winLose,
  //     }));

  //   ongoingRows.forEach((row) => {
  //     if (row.betColor === "Red") {
  //       setRedBetArray((prevArray) => [...prevArray, row.betAmount]);
  //     } else if (row.betColor === "Blue") {
  //       setBlueBetArray((prevArray) => [...prevArray, row.betAmount]);
  //     } else if (row.betColor === "Yellow") {
  //       setYellowBetArray((prevArray) => [...prevArray, row.betAmount]);
  //     } else if (row.betColor === "Green") {
  //       setGreenBetArray((prevArray) => [...prevArray, row.betAmount]);
  //     } else if (row.betColor === "Gold") {
  //       setGoldBetArray((prevArray) => [...prevArray, row.betAmount]);
  //     } else if (row.betColor === "Violet") {
  //       setVioletBetArray((prevArray) => [...prevArray, row.betAmount]);
  //     } else if (row.betColor === "Orange") {
  //       setOrangeBetArray((prevArray) => [...prevArray, row.betAmount]);
  //     } else if (row.betColor === "Pink") {
  //       setPinkBetArray((prevArray) => [...prevArray, row.betAmount]);
  //     } else if (row.betColor === "Cyan") {
  //       setCyanBetArray((prevArray) => [...prevArray, row.betAmount]);
  //     }
  //   });
  // }, [selectedButton]);

  return (
    <div className="grid grid-cols-9 h-full ">
      {/* <div
        variant="contained"
        className="flex justify-center items-center h-full w-full hover:-translate-y-2 duration-300 transition ease-in-out rounded-sm shadow-unpressed"
        style={
          selectedButton == 0
            ? {
                backgroundColor: colorHex[0],

                borderStyle: "solid",
                borderWidth: "2px",
                borderColor: "black",
              }
            : {
                backgroundColor: colorHex[0],
              }
        }
        onClick={() => handleBetOnColor(0)}
      >
        <div className="border-2 border-black rounded-full py-1 px-2 ">
          <p className="text-2xl font-bold">{redBetArray}</p>
        </div>
      </div> */}
      <EmbossedColor
        index={0}
        selectedButton={selectedButton}
        colorHex={colorHex}
        handleBetOnColor={handleBetOnColor}
      />
      <EmbossedColor
        index={1}
        selectedButton={selectedButton}
        colorHex={colorHex}
        handleBetOnColor={handleBetOnColor}
      />
      <EmbossedColor
        index={2}
        selectedButton={selectedButton}
        colorHex={colorHex}
        handleBetOnColor={handleBetOnColor}
      />
      <EmbossedColor
        index={3}
        selectedButton={selectedButton}
        colorHex={colorHex}
        handleBetOnColor={handleBetOnColor}
      />
      <EmbossedColor
        index={4}
        selectedButton={selectedButton}
        colorHex={colorHex}
        handleBetOnColor={handleBetOnColor}
      />
      <EmbossedColor
        index={5}
        selectedButton={selectedButton}
        colorHex={colorHex}
        handleBetOnColor={handleBetOnColor}
      />
      <EmbossedColor
        index={6}
        selectedButton={selectedButton}
        colorHex={colorHex}
        handleBetOnColor={handleBetOnColor}
      />
      <EmbossedColor
        index={7}
        selectedButton={selectedButton}
        colorHex={colorHex}
        handleBetOnColor={handleBetOnColor}
      />
      <EmbossedColor
        index={8}
        selectedButton={selectedButton}
        colorHex={colorHex}
        handleBetOnColor={handleBetOnColor}
      />
    </div>
  );
};

export default ColorInputs;
