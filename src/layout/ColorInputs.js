/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Alert, Button, ButtonGroup } from "@mui/material";
import { getBetHistory } from "../services/getBetHistory";
import useLiveStream from "../context/LiveStreamContext";
import EmbossedColor from "../components/EmbossedColor";

const ColorInputs = ({ selectedButton, colorHex, handleBetOnColor }) => {
  const { userBets } = useLiveStream();

  // useEffect(() => {
  //   console.log("OnGoingBets", userBets);
  // }, [userBets]);

  const [redBetArray, setRedBetArray] = useState([]);
  const [blueBetArray, setBlueBetArray] = useState([]);
  const [yellowBetArray, setYellowBetArray] = useState([]);
  const [greenBetArray, setGreenBetArray] = useState([]);
  const [goldBetArray, setGoldBetArray] = useState([]);
  const [violetBetArray, setVioletBetArray] = useState([]);
  const [orangeBetArray, setOrangeBetArray] = useState([]);
  const [pinkBetArray, setPinkBetArray] = useState([]);
  const [cyanBetArray, setCyanBetArray] = useState([]);

  useEffect(() => {
    setRedBetArray([]);
    setBlueBetArray([]);
    setYellowBetArray([]);
    setGreenBetArray([]);
    setGoldBetArray([]);
    setVioletBetArray([]);
    setOrangeBetArray([]);
    setPinkBetArray([]);
    setCyanBetArray([]);

    const ongoingRows = userBets.map((item) => ({
      betColor: item.bet,
      betAmount: item.betAmount,
      status: item.winLose,
    }));

    // console.log(ongoingRows);

    ongoingRows.forEach((row) => {
      if (row.betColor === "Red") {
        setRedBetArray((prevArray) => [...prevArray, row.betAmount]);
      } else if (row.betColor === "Blue") {
        setBlueBetArray((prevArray) => [...prevArray, row.betAmount]);
      } else if (row.betColor === "Yellow") {
        setYellowBetArray((prevArray) => [...prevArray, row.betAmount]);
      } else if (row.betColor === "Green") {
        setGreenBetArray((prevArray) => [...prevArray, row.betAmount]);
      } else if (row.betColor === "Gold") {
        setGoldBetArray((prevArray) => [...prevArray, row.betAmount]);
      } else if (row.betColor === "Violet") {
        setVioletBetArray((prevArray) => [...prevArray, row.betAmount]);
      } else if (row.betColor === "Orange") {
        setOrangeBetArray((prevArray) => [...prevArray, row.betAmount]);
      } else if (row.betColor === "Pink") {
        setPinkBetArray((prevArray) => [...prevArray, row.betAmount]);
      } else if (row.betColor === "Cyan") {
        setCyanBetArray((prevArray) => [...prevArray, row.betAmount]);
      }
    });
  }, [userBets]);

  const handleSum = (array) => {
    const numericArray = array.map(Number);
    const sum = numericArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    return sum;
  };

  // const redBetArray = [10, 20, 30, 40, 50, 60, 70, 80];

  // useEffect(() => {
  //   console.log(redBetArray);
  // }, [redBetArray]);

  return (
    <div className="grid grid-cols-9 h-full ">
      <EmbossedColor
        index={0}
        selectedButton={selectedButton}
        colorHex={colorHex}
        handleBetOnColor={handleBetOnColor}
        totalBetOnColor={handleSum(redBetArray)}
      />
      <EmbossedColor
        index={1}
        selectedButton={selectedButton}
        colorHex={colorHex}
        handleBetOnColor={handleBetOnColor}
        totalBetOnColor={handleSum(blueBetArray)}
      />
      <EmbossedColor
        index={2}
        selectedButton={selectedButton}
        colorHex={colorHex}
        handleBetOnColor={handleBetOnColor}
        totalBetOnColor={handleSum(yellowBetArray)}
      />
      <EmbossedColor
        index={3}
        selectedButton={selectedButton}
        colorHex={colorHex}
        handleBetOnColor={handleBetOnColor}
        totalBetOnColor={handleSum(greenBetArray)}
      />
      <EmbossedColor
        index={4}
        selectedButton={selectedButton}
        colorHex={colorHex}
        handleBetOnColor={handleBetOnColor}
        totalBetOnColor={handleSum(goldBetArray)}
      />
      <EmbossedColor
        index={5}
        selectedButton={selectedButton}
        colorHex={colorHex}
        handleBetOnColor={handleBetOnColor}
        totalBetOnColor={handleSum(violetBetArray)}
      />
      <EmbossedColor
        index={6}
        selectedButton={selectedButton}
        colorHex={colorHex}
        handleBetOnColor={handleBetOnColor}
        totalBetOnColor={handleSum(orangeBetArray)}
      />
      <EmbossedColor
        index={7}
        selectedButton={selectedButton}
        colorHex={colorHex}
        handleBetOnColor={handleBetOnColor}
        totalBetOnColor={handleSum(pinkBetArray)}
      />
      <EmbossedColor
        index={8}
        selectedButton={selectedButton}
        colorHex={colorHex}
        handleBetOnColor={handleBetOnColor}
        totalBetOnColor={handleSum(cyanBetArray)}
      />
    </div>
  );
};

export default ColorInputs;
