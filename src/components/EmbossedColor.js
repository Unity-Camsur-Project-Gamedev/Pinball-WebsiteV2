import React, { useState } from "react";
import pokerChip from "../assets/pokerChip.png";

function EmbossedColor({
  index,
  selectedButton,
  colorHex,
  handleBetOnColor,
  totalBetOnColor,
}) {
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
        {totalBetOnColor > 0 ? (
          <div className="flex flex-col justify-center items-center gap-1 border-2 border-black relative w-full h-full">
            <div className="rounded-full p-1 z-10" key={index}>
              <p className="text-xl text-white font-bold">{totalBetOnColor}</p>
            </div>
            <img src={pokerChip} className="absolute w-[80%]" />
          </div>
        ) : null}
      </div>
    </>
  );
}

export default EmbossedColor;
