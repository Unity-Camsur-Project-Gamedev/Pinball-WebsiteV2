import React, { useState } from "react";

import { Alert, Button, ButtonGroup } from "@mui/material";

function EmbossedButton({
  handlerFunction,
  btnName,
  fontColor = "black",
  btnColor = "#ffffff",
  pressedColor = "#f2f2f2",
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

  const buttonClassName = `w-full h-full ${
    isPressed ? "shadow-pressed" : "shadow-unpressed"
  } `;

  return (
    <>
      <Button
        disableRipple
        size="large"
        className={buttonClassName}
        style={{
          color: fontColor,
          fontSize: "clamp(1.5rem, 1.5rem + 0vw, 1.5rem)",
          fontWeight: "bold",
          borderRadius: 50,
          border: 0,
          backgroundColor: isHovered ? pressedColor : btnColor,
        }}
        onClick={() => {
          handlerFunction();
          handlePress();
        }}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      >
        <p
          className={
            isPressed ? "transition translate-x-[3px] translate-y-[3px] " : ""
          }
        >
          {btnName}
        </p>
      </Button>
    </>
  );
}

export default EmbossedButton;
