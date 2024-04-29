import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import pokerChip from "../assets/pokerChip.png";
import useLiveStream from "../context/LiveStreamContext";

function EmbossedColorMobile({ index, color, onClick }) {
  const { mirrorArray, clearBetsOnColor } = useLiveStream();

  const [isPressed, setIsPressed] = useState(false);

  const onGoingBets = localStorage.getItem("onGoingBets");
  const parsedOnGoingBets = onGoingBets ? JSON.parse(onGoingBets) : [];

  const handlePress = () => {
    setIsPressed(true);
    setTimeout(() => {
      setIsPressed(false);
    }, 100);
  };

  const buttonStyle = {
    className: `h-12 w-full ${
      isPressed ? "shadow-pressed" : "shadow-unpressed"
    } rounded-md`,
    style: { backgroundColor: color },
  };

  return (
    <div
      {...buttonStyle}
      onClick={() => {
        handlePress();
        onClick();
      }}
    >
      {/* TODO: uncomment this after */}
      {/* {(mirrorArray.find((bet) => bet.colorIndex === index) ||
        parsedOnGoingBets.find((bet) => bet.colorIndex === index)) && (
        <div className="flex flex-col justify-center items-center gap-1 relative w-full h-full ">
          <div className="rounded-full p-1 z-10">
            <p className="text-xs text-black font-bold">
              {mirrorArray.find((bet) => bet.colorIndex === index)?.amount ||
                parsedOnGoingBets.find((bet) => bet.colorIndex === index)
                  ?.amount}
            </p>
          </div>
          <img src={pokerChip} className="absolute w-[30%]" />
        </div>
      )} */}
    </div>
  );
}

export default EmbossedColorMobile;
