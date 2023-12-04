import React, { useState } from "react";
import pokerChip from "../assets/pokerChip.png";

function NumberInputGrid({ button, handlerFunction }) {
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

  const buttonClassName = `py-2 rounded-full select-none cursor-pointer ${
    isPressed ? "shadow-pressed" : "shadow-chipUnpressed"
  } `;
  return (
    <>
      <div
        className={buttonClassName}
        style={{
          backgroundColor: "#ffffff", // Default white background color
        }}
        onClick={() => {
          handlerFunction();
          handlePress();
        }}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      >
        <p
          className={`text-dynamicMid font-semibold ${
            isPressed ? "transition translate-x-[3px] translate-y-[3px] " : ""
          } `}
        >
          ₱{button}
        </p>
      </div>
    </>
  );
}

export default NumberInputGrid;
