/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Alert, Button, ButtonGroup } from "@mui/material";
import { getBetHistory } from "../services/getBetHistory";
import useLiveStream from "../context/LiveStreamContext";

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
    <div className="grid grid-cols-9 h-full gap-1">
      <div
        variant="contained"
        className="flex justify-center items-center h-full w-full hover:scale-110 transition ease-in-out rounded-sm"
        style={
          selectedButton == 0
            ? {
                backgroundColor: colorHex[0],

                borderStyle: "solid",
                borderWidth: "4px",
                borderColor: "black",
              }
            : {
                backgroundColor: colorHex[0],
              }
        }
        onClick={() => handleBetOnColor(0)}
      >
        {/* <div className="border-2 border-black rounded-full py-1 px-2 ">
          <p className="text-2xl font-bold">{redBetArray}</p>
        </div> */}
      </div>
      <div
        variant="contained"
        className="flex justify-center items-center h-full w-full hover:scale-110 transition ease-in-out rounded-sm"
        style={
          selectedButton == 1
            ? {
                backgroundColor: colorHex[1],

                borderStyle: "solid",
                borderWidth: "4px",
                borderColor: "black",
              }
            : {
                backgroundColor: colorHex[1],
              }
        }
        onClick={() => handleBetOnColor(1)}
      >
        {/* <div className="border-2 border-black rounded-full py-1 px-2 ">
          <p className="text-2xl font-bold">{blueBetArray}</p>
        </div> */}
      </div>
      <div
        variant="contained"
        className="flex justify-center items-center h-full w-full hover:scale-110 transition ease-in-out rounded-sm"
        style={
          selectedButton == 2
            ? {
                backgroundColor: colorHex[2],

                borderStyle: "solid",
                borderWidth: "4px",
                borderColor: "black",
              }
            : {
                backgroundColor: colorHex[2],
              }
        }
        onClick={() => handleBetOnColor(2)}
      >
        {/* <div className="border-2 border-black rounded-full py-1 px-2 ">
          <p className="text-2xl font-bold">{yellowBetArray}</p>
        </div> */}
      </div>
      <div
        variant="contained"
        className="flex justify-center items-center h-full w-full hover:scale-110 transition ease-in-out rounded-sm"
        style={
          selectedButton == 3
            ? {
                backgroundColor: colorHex[3],

                borderStyle: "solid",
                borderWidth: "4px",
                borderColor: "black",
              }
            : {
                backgroundColor: colorHex[3],
              }
        }
        onClick={() => handleBetOnColor(3)}
      >
        {/* <div className="border-2 border-black rounded-full py-1 px-2 ">
          <p className="text-2xl font-bold">{greenBetArray}</p>
        </div> */}
      </div>
      <div
        variant="contained"
        className="flex justify-center items-center h-full w-full hover:scale-110 transition ease-in-out rounded-sm"
        style={
          selectedButton == 4
            ? {
                backgroundColor: colorHex[4],

                borderStyle: "solid",
                borderWidth: "4px",
                borderColor: "black",
              }
            : {
                backgroundColor: colorHex[4],
              }
        }
        onClick={() => handleBetOnColor(4)}
      >
        {/* <div className="border-2 border-black rounded-full py-1 px-2 ">
          <p className="text-2xl font-bold">{goldBetArray}</p>
        </div> */}
      </div>
      <div
        variant="contained"
        className="flex justify-center items-center h-full w-full hover:scale-110 transition ease-in-out rounded-sm"
        style={
          selectedButton == 5
            ? {
                backgroundColor: colorHex[5],

                borderStyle: "solid",
                borderWidth: "4px",
                borderColor: "black",
              }
            : {
                backgroundColor: colorHex[5],
              }
        }
        onClick={() => handleBetOnColor(5)}
      >
        {/* <div className="border-2 border-black rounded-full py-1 px-2 ">
          <p className="text-2xl font-bold">{violetBetArray}</p>
        </div> */}
      </div>
      <div
        variant="contained"
        className="flex justify-center items-center h-full w-full hover:scale-110 transition ease-in-out rounded-sm"
        style={
          selectedButton == 6
            ? {
                backgroundColor: colorHex[6],

                borderStyle: "solid",
                borderWidth: "4px",
                borderColor: "black",
              }
            : {
                backgroundColor: colorHex[6],
              }
        }
        onClick={() => handleBetOnColor(6)}
      >
        {/* <div className="border-2 border-black rounded-full py-1 px-2 ">
          <p className="text-2xl font-bold">{orangeBetArray}</p>
        </div> */}
      </div>
      <div
        variant="contained"
        className="flex justify-center items-center h-full w-full hover:scale-110 transition ease-in-out rounded-sm"
        style={
          selectedButton == 7
            ? {
                backgroundColor: colorHex[7],

                borderStyle: "solid",
                borderWidth: "4px",
                borderColor: "black",
              }
            : {
                backgroundColor: colorHex[7],
              }
        }
        onClick={() => handleBetOnColor(7)}
      >
        {/* <div className="border-2 border-black rounded-full py-1 px-2 ">
          <p className="text-2xl font-bold">{pinkBetArray}</p>
        </div> */}
      </div>
      <div
        variant="contained"
        className="flex justify-center items-center h-full w-full hover:scale-110 transition ease-in-out rounded-sm"
        style={
          selectedButton == 8
            ? {
                backgroundColor: colorHex[8],

                borderStyle: "solid",
                borderWidth: "4px",
                borderColor: "black",
              }
            : {
                backgroundColor: colorHex[8],
              }
        }
        onClick={() => handleBetOnColor(8)}
      >
        {/* <div className="border-2 border-black rounded-full py-1 px-2 ">
          <p className="text-2xl font-bold">{cyanBetArray}</p>
        </div> */}
      </div>
    </div>
  );
};

export default ColorInputs;
