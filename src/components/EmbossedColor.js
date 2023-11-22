import React, { useEffect, useState } from "react";
import pokerChip from "../assets/pokerChip.png";
import useLiveStream from "../context/LiveStreamContext";

function EmbossedColor({ index, selectedButton, colorHex, handleBetOnColor }) {
  const { toBeConfirmedBetArray, confirmedBetArray } = useLiveStream();
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

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

  const buttonClassName = `flex gap-1 font-['Poppins'] justify-center items-center h-full w-full hover:-translate-y-1 duration-300 transition ease-in-out rounded-sm ${
    isPressed ? "shadow-pressed" : "shadow-unpressed"
  } `;

  const bothEmpty =
    confirmedBetArray.length === 0 && toBeConfirmedBetArray.length === 0;
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
          selectedButton == index
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
        {/* {(toBeConfirmedBetArray.find((bet) => bet.colorIndex === index) ||
          confirmedBetArray.find((bet) => bet.colorIndex === index)) && (
          <div className="flex flex-col justify-center items-center gap-1 border-2 border-black relative w-full h-full">
            <div className="rounded-full p-1 z-10">
              <p className="text-xl text-white font-bold">
                {toBeConfirmedBetArray.find((bet) => bet.colorIndex === index)
                  ?.amount ||
                  confirmedBetArray.find((bet) => bet.colorIndex === index)
                    ?.amount}
              </p>
            </div>
            <img src={pokerChip} className="absolute w-[80%]" />
          </div>
        )} */}
        {unconfirmed &&
          toBeConfirmedBetArray.find((bet) => bet.colorIndex === index) && (
            <div className="flex flex-col justify-center items-center gap-1 border-2 border-black relative w-full h-full">
              <div className="rounded-full p-1 z-10">
                <p className="text-xl text-white font-bold">
                  {toBeConfirmedBetArray.find((bet) => bet.colorIndex === index)
                    ?.amount ||
                    confirmedBetArray.find((bet) => bet.colorIndex === index)
                      ?.amount}
                </p>
              </div>
              <img src={pokerChip} className="absolute w-[80%]" />
            </div>
          )}
        {confirmed &&
          confirmedBetArray.find((bet) => bet.colorIndex === index) && (
            <div className="flex flex-col justify-center items-center gap-1 border-2 border-black relative w-full h-full">
              <div className="rounded-full p-1 z-10">
                <p className="text-xl text-white font-bold">
                  {toBeConfirmedBetArray.find((bet) => bet.colorIndex === index)
                    ?.amount ||
                    confirmedBetArray.find((bet) => bet.colorIndex === index)
                      ?.amount}
                </p>
              </div>
              <img src={pokerChip} className="absolute w-[80%]" />
            </div>
          )}
        {bothFilled &&
          (confirmedBetArray.find((bet) => bet.colorIndex === index) ||
            toBeConfirmedBetArray.find((bet) => bet.colorIndex === index)) && (
            <div className="flex flex-col justify-center items-center gap-1 border-2 border-black relative w-full h-full">
              <div className="rounded-full p-1 z-10">
                <p className="text-xl text-white font-bold">
                  {toBeConfirmedBetArray.find((bet) => bet.colorIndex === index)
                    ?.amount ||
                    confirmedBetArray.find((bet) => bet.colorIndex === index)
                      ?.amount}
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
