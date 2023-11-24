/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Alert, Button, ButtonGroup } from "@mui/material";
import { getBetHistory } from "../services/getBetHistory";
import useLiveStream from "../context/LiveStreamContext";
import EmbossedColor from "../components/EmbossedColor";

const ColorInputs = ({ selectedButton, colorHex, handleBetOnColor }) => {
  const { userBets, toBeConfirmedBetArray, setToBeConfirmedBetArray } =
    useLiveStream();

  //ADD ALL THE BET OF THE SPECIFIC COLOR ARRAY
  const handleSum = (array) => {
    const numericArray = array.map(Number);
    const sum = numericArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    return sum;
  };

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
