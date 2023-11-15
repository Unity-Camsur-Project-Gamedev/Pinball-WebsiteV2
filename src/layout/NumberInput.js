/* eslint-disable */
import React from "react";
import { Alert, Button, ButtonGroup } from "@mui/material";

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

  return (
    <div className="flex flex-col w-full h-full items-center gap-2 py-1">
      <ButtonGroup
        variant="outlined"
        aria-label="outlined button group"
        className="w-full h-full gap-2"
      >
        {numGroup1.map((number, index) => (
          <Button
            key={index}
            className="w-full h-full"
            style={{
              position: "relative",
              borderRadius: 50,
              backgroundColor: "#ffffff",
              boxShadow:
                "4px 4px 4px rgba(0, 0, 0, 0.4), 0px 2px 4px rgba(0, 0, 0, 0.1)", // Add an embossed box shadow
              border: "1px solid rgba(255, 255, 255, 0.5)", // Add a light border for depth
            }}
            onClick={() => handleButtonClick(number)}
          >
            <p style={numStyle} className="absolute">
              {number}
            </p>
          </Button>
        ))}
      </ButtonGroup>
      <ButtonGroup
        variant="outlined"
        aria-label="outlined button group"
        className="w-full h-full gap-2"
      >
        {numGroup2.map((number, index) => (
          <Button
            key={index}
            size="large"
            className="w-full h-full"
            style={{
              position: "relative",
              borderRadius: 50,
              backgroundColor: "#ffffff",
              boxShadow:
                "4px 4px 4px rgba(0, 0, 0, 0.4), 0px 2px 4px rgba(0, 0, 0, 0.1)", // Add an embossed box shadow
              border: "1px solid rgba(255, 255, 255, 0.5)", // Add a light border for depth
            }}
            onClick={() => handleButtonClick(number)}
          >
            <p style={numStyle} className="absolute">
              {number}
            </p>
          </Button>
        ))}
      </ButtonGroup>
      <ButtonGroup
        variant="outlined"
        aria-label="outlined button group"
        className="w-full h-full gap-2"
      >
        {numGroup3.map((number, index) => (
          <Button
            key={index}
            size="large"
            className="w-full h-full"
            style={{
              position: "relative",
              borderRadius: 50,
              backgroundColor: "#ffffff",
              boxShadow:
                "4px 4px 4px rgba(0, 0, 0, 0.4), 0px 2px 4px rgba(0, 0, 0, 0.1)", // Add an embossed box shadow
              border: "1px solid rgba(255, 255, 255, 0.5)", // Add a light border for depth
            }}
            onClick={() => handleButtonClick(number)}
          >
            <p style={numStyle} className="absolute">
              {number}
            </p>
          </Button>
        ))}
      </ButtonGroup>
      <ButtonGroup
        variant="outlined"
        aria-label="outlined button group"
        className="w-full h-full gap-2"
      >
        <Button
          size="large"
          className="w-full h-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 "
          style={{
            backgroundColor: "#FFFF00",
            color: "white",
            fontSize: "clamp(1.5rem, 1.5rem + 0vw, 1.5rem)",
            fontWeight: "bold",
            borderRadius: 50,
            backgroundColor: "#0474f2",
          }}
          onClick={() => handleClearButton()}
        >
          clear
        </Button>
        <Button
          size="large"
          className="w-full h-full"
          style={{
            color: "black",
            fontSize: "clamp(1.75rem, 1.25rem + 0.7813vw, 2.5rem)",
            fontWeight: "bold",
            position: "relative",
            borderRadius: 50,
            backgroundColor: "#ffffff",
            boxShadow:
              "4px 4px 4px rgba(0, 0, 0, 0.4), 0px 2px 4px rgba(0, 0, 0, 0.1)", // Add an embossed box shadow
            border: "1px solid rgba(255, 255, 255, 0.5)", // Add a light border for depth
          }}
          onClick={() => {
            if (betAmount !== "") {
              handleButtonClick("0");
            }
          }}
        >
          <p className="absolute">0</p>
        </Button>
        <Button
          size="large"
          className="w-full h-full bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800"
          style={{
            backgroundColor: "#FF0000",
            color: "white",
            fontSize: "clamp(1.5rem, 1.5rem + 0vw, 1.5rem)",
            fontWeight: "bold",
            borderRadius: 50,
            backgroundColor: "#ee3231",
          }}
          onClick={handleMaxButton}
        >
          max
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default NumberInput;
