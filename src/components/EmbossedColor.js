import React, { useEffect, useState } from "react";
import pokerChip from "../assets/pokerChip.png";
import Coin from "../assets/coin.png";
import useLiveStream from "../context/LiveStreamContext";

function EmbossedColor({ index, selectedButton, colorHex, handleBetOnColor }) {
  const {
    toBeConfirmedBetArray,
    confirmedBetArray,
    mirrorArray,
    clearBetsOnColor,
  } = useLiveStream();
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [animate, setAnimate] = useState(false);

  const status = localStorage.getItem("betStatus");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimate(true);
    }, index * 200);

    return () => clearTimeout(timeout);
  }, [clearBetsOnColor]); //ito yon

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  const handlePress = () => {
    setIsPressed(true);
    setTimeout(() => {
      setIsPressed(false);
    }, 100);
  };

  const buttonClassName = `flex gap-1 font-['Poppins'] justify-center items-center h-full w-full hover:-translate-y-1 duration-300 transition ease-in-out rounded-md relative ${
    isPressed ? "shadow-pressed" : "shadow-unpressed"
  } ${animate ? "button-animation" : ""}`;

  // const bothEmpty =
  //   mirrorArray.length === 0 && toBeConfirmedBetArray.length === 0;

  const unconfirmed =
    confirmedBetArray.length === 0 && toBeConfirmedBetArray.length > 0;
  const confirmed =
    confirmedBetArray.length > 0 && toBeConfirmedBetArray.length === 0;

  const bothFilled =
    confirmedBetArray.length > 0 && toBeConfirmedBetArray.length > 0;

  return (
    <>
      <div
        variant="contained"
        className={buttonClassName}
        style={
          selectedButton === index
            ? {
                backgroundColor: colorHex[index],

                borderStyle: "solid",
                borderWidth: "2px",
                borderColor: "black",
              }
            : {
                backgroundColor: colorHex[index],
              }
        }
        onClick={() => handleBetOnColor(index)}
      >
        {mirrorArray.find((bet) => bet.colorIndex === index) && (
          <div className="flex flex-col justify-center items-center gap-1 border-2 border-black relative w-full h-full">
            <div className="rounded-full p-1 z-10">
              <p className="text-xl text-white font-bold">
                {mirrorArray.find((bet) => bet.colorIndex === index)?.amount}
              </p>
            </div>
            <img src={pokerChip} className="absolute w-[80%]" />
          </div>
        )}
      </div>
    </>
  );
}

export default EmbossedColor;
