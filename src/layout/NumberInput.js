/* eslint-disable */
import React, { useState } from "react";
import { Alert, Button, ButtonGroup } from "@mui/material";
import EmbossedButton from "../components/EmbossedButton";
import EmbossedNumbers from "../components/EmbossedNumbers";

const NumberInput = ({
  numGroup1,
  numGroup2,
  numGroup3,
  betAmount,
  handleButtonClick,
  handleClearButton,
  handleMaxButton,
}) => {
  const numStyle = {
    color: "black",
    fontSize: "clamp(1.75rem, 1.25rem + 0.7813vw, 2.5rem)",
    fontWeight: "bold",
  };

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
    <div className="flex flex-col w-full h-full items-center gap-1 py-1">
      <ButtonGroup
        variant="outlined"
        aria-label="outlined button group"
        className="w-full h-full gap-1"
      >
        {numGroup1.map((number, index) => (
          <EmbossedNumbers
            key={index}
            handlerFunction={() => handleButtonClick(number)} // Pass a function reference
            btnName={number}
          />
        ))}
      </ButtonGroup>
      <ButtonGroup
        variant="outlined"
        aria-label="outlined button group"
        className="w-full h-full gap-1"
      >
        {numGroup2.map((number, index) => (
          <EmbossedNumbers
            key={index}
            handlerFunction={() => handleButtonClick(number)} // Pass a function reference
            btnName={number}
          />
        ))}
      </ButtonGroup>
      <ButtonGroup
        variant="outlined"
        aria-label="outlined button group"
        className="w-full h-full gap-1"
      >
        {numGroup3.map((number, index) => (
          <EmbossedNumbers
            key={index}
            handlerFunction={() => handleButtonClick(number)} // Pass a function reference
            btnName={number}
          />
        ))}
      </ButtonGroup>
      <ButtonGroup
        variant="outlined"
        aria-label="outlined button group"
        className="w-full h-full gap-1"
      >
        <EmbossedButton
          handlerFunction={handleClearButton}
          btnName={"clear"}
          fontColor={"white"}
          btnColor={"#0474f2"}
          pressedColor={"#036be2"}
        />
        <Button
          disableRipple
          size="large"
          className={buttonClassName}
          style={{
            color: "#0d4fa3",
            fontSize: "clamp(1.75rem, 1.25rem + 0.7813vw, 2.5rem)",
            fontWeight: "bold",
            position: "relative",
            borderRadius: 50,
            border: 0,
            backgroundColor: isHovered ? "#f2f2f2" : "#ffffff",
          }}
          onClick={() => {
            if (betAmount !== "") {
              handleButtonClick("0");
              handlePress();
            }
          }}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          <p className="absolute">0</p>
        </Button>
        {/* <EmbossedNumbers
          handlerFunction={() => handleButtonClick("0")} // Pass a function reference
          betAmount={betAmount}
          btnName={"0"}
        /> */}

        <EmbossedButton
          handlerFunction={handleMaxButton}
          btnName={"max"}
          fontColor={"white"}
          btnColor={"#ee3231"}
          pressedColor={"#ec1313"}
        />
      </ButtonGroup>
    </div>
  );
};

export default NumberInput;
