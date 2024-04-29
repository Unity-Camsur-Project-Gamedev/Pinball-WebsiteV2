/* eslint-disable */
import React from "react";
import { Alert, Button, ButtonGroup } from "@mui/material";
import EmbossedColorMobile from "../components/EmbossedColorMobile";

const ColorInputGrid = ({ colorHex, handleBetOnColor }) => {
  return (
    <div className="flex-1 grid grid-cols-3 gap-2 w-full ">
      <EmbossedColorMobile
        index={0}
        color={colorHex[0]}
        onClick={() => handleBetOnColor(0)}
      />
      <EmbossedColorMobile
        index={1}
        color={colorHex[1]}
        onClick={() => handleBetOnColor(1)}
      />
      <EmbossedColorMobile
        index={2}
        color={colorHex[2]}
        onClick={() => handleBetOnColor(2)}
      />
      <EmbossedColorMobile
        index={3}
        color={colorHex[3]}
        onClick={() => handleBetOnColor(3)}
      />
      <EmbossedColorMobile
        index={4}
        color={colorHex[4]}
        onClick={() => handleBetOnColor(4)}
      />
      <EmbossedColorMobile
        index={5}
        color={colorHex[5]}
        onClick={() => handleBetOnColor(5)}
      />
      <EmbossedColorMobile
        index={6}
        color={colorHex[6]}
        onClick={() => handleBetOnColor(6)}
      />
      <EmbossedColorMobile
        index={7}
        color={colorHex[7]}
        onClick={() => handleBetOnColor(7)}
      />
      <EmbossedColorMobile
        index={8}
        color={colorHex[8]}
        onClick={() => handleBetOnColor(8)}
      />
    </div>
  );
};

export default ColorInputGrid;
