import React, { useState } from "react";

function EmbossedColor({ index, selectedButton, colorHex, handleBetOnColor }) {
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

  const buttonClassName = `flex justify-center items-center h-full w-full hover:-translate-y-1 duration-300 transition ease-in-out rounded-sm ${
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
        {/* <div className="border-2 border-black rounded-full py-1 px-2 ">
          <p className="text-2xl font-bold">{redBetArray}</p>
        </div> */}
      </div>
    </>
  );
}

export default EmbossedColor;
