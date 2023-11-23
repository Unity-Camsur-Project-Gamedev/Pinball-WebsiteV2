/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Alert, Button, ButtonGroup } from "@mui/material";
import { getBetHistory } from "../services/getBetHistory";
import useLiveStream from "../context/LiveStreamContext";
import EmbossedColor from "../components/EmbossedColor";

const ColorInputs = ({ selectedButton, colorHex, handleBetOnColor }) => {
  const { userBets, toBeConfirmedBetArray, setToBeConfirmedBetArray } =
    useLiveStream();

  //EVERY COLOR HAVE THEIR OWN BET ARRAY TO STORE
  // const [redBetArray, setRedBetArray] = useState([]);
  // const [blueBetArray, setBlueBetArray] = useState([]);
  // const [yellowBetArray, setYellowBetArray] = useState([]);
  // const [greenBetArray, setGreenBetArray] = useState([]);
  // const [goldBetArray, setGoldBetArray] = useState([]);
  // const [violetBetArray, setVioletBetArray] = useState([]);
  // const [orangeBetArray, setOrangeBetArray] = useState([]);
  // const [pinkBetArray, setPinkBetArray] = useState([]);
  // const [cyanBetArray, setCyanBetArray] = useState([]);

  // useEffect(() => {
  //   //CLEAR
  //   setRedBetArray([]);
  //   setBlueBetArray([]);
  //   setYellowBetArray([]);
  //   setGreenBetArray([]);
  //   setGoldBetArray([]);
  //   setVioletBetArray([]);
  //   setOrangeBetArray([]);
  //   setPinkBetArray([]);
  //   setCyanBetArray([]);

  //   //AND FETCH
  //   userBets.forEach((row) => {
  //     if (row.colorIndex === 0) {
  //       setRedBetArray((prevArray) => [...prevArray, row.amount]);
  //     } else if (row.colorIndex === 1) {
  //       setBlueBetArray((prevArray) => [...prevArray, row.amount]);
  //     } else if (row.colorIndex === 2) {
  //       setYellowBetArray((prevArray) => [...prevArray, row.amount]);
  //     } else if (row.colorIndex === 3) {
  //       setGreenBetArray((prevArray) => [...prevArray, row.amount]);
  //     } else if (row.colorIndex === 4) {
  //       setGoldBetArray((prevArray) => [...prevArray, row.amount]);
  //     } else if (row.colorIndex === 5) {
  //       setVioletBetArray((prevArray) => [...prevArray, row.amount]);
  //     } else if (row.colorIndex === 6) {
  //       setOrangeBetArray((prevArray) => [...prevArray, row.amount]);
  //     } else if (row.colorIndex === 7) {
  //       setPinkBetArray((prevArray) => [...prevArray, row.amount]);
  //     } else if (row.colorIndex === 8) {
  //       setCyanBetArray((prevArray) => [...prevArray, row.amount]);
  //     }
  //   });
  // }, [userBets]);

  //SEND THE REFINED BETS TO THE CONFIRM BUTTON TO POST
  // useEffect(() => {
  //   const updateConfirmBetArray = () => {
  //     const updatedArray = [];

  //     userBets.forEach((bet) => {
  //       const existingBet = updatedArray.find(
  //         (confirmedBet) => confirmedBet.colorIndex === bet.colorIndex
  //       );

  //       if (existingBet) {
  //         existingBet.amount += bet.amount;
  //       } else {
  //         updatedArray.push({ colorIndex: bet.colorIndex, amount: bet.amount });
  //       }
  //     });

  //     setToBeConfirmedBetArray(updatedArray);
  //   };

  //   updateConfirmBetArray();
  // }, [userBets]);

  //ADD ALL THE BET OF THE SPECIFIC COLOR ARRAY
  const handleSum = (array) => {
    const numericArray = array.map(Number);
    const sum = numericArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    return sum;
  };

  // useEffect(() => {
  //   console.log("redBetArray", redBetArray);
  // }, [redBetArray]);

  // useEffect(() => {
  //   console.log("userBets", userBets);
  // }, [userBets]);

  return (

      <div className="grid grid-cols-9 h-full border-2 cursor-pointer">
        <EmbossedColor
          index={0}
          selectedButton={selectedButton}
          colorHex={colorHex}
          handleBetOnColor={handleBetOnColor}
        // totalBetOnColor={handleSum(redBetArray)}
        />
        <EmbossedColor
          index={1}
          selectedButton={selectedButton}
          colorHex={colorHex}
          handleBetOnColor={handleBetOnColor}
        // totalBetOnColor={handleSum(blueBetArray)}
        />
        <EmbossedColor
          index={2}
          selectedButton={selectedButton}
          colorHex={colorHex}
          handleBetOnColor={handleBetOnColor}
        // totalBetOnColor={handleSum(yellowBetArray)}
        />
        <EmbossedColor
          index={3}
          selectedButton={selectedButton}
          colorHex={colorHex}
          handleBetOnColor={handleBetOnColor}
        // totalBetOnColor={handleSum(greenBetArray)}
        />
        <EmbossedColor
          index={4}
          selectedButton={selectedButton}
          colorHex={colorHex}
          handleBetOnColor={handleBetOnColor}
        // totalBetOnColor={handleSum(goldBetArray)}
        />
        <EmbossedColor
          index={5}
          selectedButton={selectedButton}
          colorHex={colorHex}
          handleBetOnColor={handleBetOnColor}
        // totalBetOnColor={handleSum(violetBetArray)}
        />
        <EmbossedColor
          index={6}
          selectedButton={selectedButton}
          colorHex={colorHex}
          handleBetOnColor={handleBetOnColor}
        // totalBetOnColor={handleSum(orangeBetArray)}
        />
        <EmbossedColor
          index={7}
          selectedButton={selectedButton}
          colorHex={colorHex}
          handleBetOnColor={handleBetOnColor}
        // totalBetOnColor={handleSum(pinkBetArray)}
        />
        <EmbossedColor
          index={8}
          selectedButton={selectedButton}
          colorHex={colorHex}
          handleBetOnColor={handleBetOnColor}
        // totalBetOnColor={handleSum(cyanBetArray)}
        />
      </div>


  );
};

export default ColorInputs;
