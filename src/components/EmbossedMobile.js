import React, { useState } from "react";

function EmbossedMobile({ button, handlerFunction }) {
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

  const buttonClassName = `p-3 rounded-full ${
    isPressed ? "shadow-pressed" : "shadow-unpressed"
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
          className={`text-dynamicMid ${
            isPressed ? "transition translate-x-[3px] translate-y-[3px] " : ""
          } `}
        >
          {button}
        </p>
      </div>
    </>
  );
}

export default EmbossedMobile;
