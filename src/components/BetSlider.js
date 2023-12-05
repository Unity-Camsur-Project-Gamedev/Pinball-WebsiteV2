import React, { useState, useEffect } from "react";
import { Slider } from "@mui/material";
import useLiveStream from "../context/LiveStreamContext";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

export default function BetSlider() {
  const { totalCredits, setBetAmount, selectedButton } = useLiveStream();
  const [value, setValue] = React.useState(1);

  const [minusIsPressed, setMinusIsPressed] = useState(false);
  const [plusIsPressed, setPlusIsPressed] = useState(false);

  const handlePress = (button) => {
    if (button === "repeat") {
      setMinusIsPressed(true);
      setTimeout(() => {
        setMinusIsPressed(false);
      }, 100);
    } else {
      setPlusIsPressed(true);
      setTimeout(() => {
        setPlusIsPressed(false);
      }, 100);
    }
  };

  const decrementButtonStyle = `w-[20%] rounded-full cursor-pointer ${
    minusIsPressed ? "shadow-pressed" : "shadow-unpressed"
  } `;
  const incrementButtonStyle = `w-[20%]  rounded-full cursor-pointer ${
    plusIsPressed ? "shadow-pressed" : "shadow-unpressed"
  } `;

  const handleChange = (event, newValue) => {
    const roundedValue = Math.floor((newValue / 100) * totalCredits);
    setValue(newValue);
    // console.log(roundedValue);
    setBetAmount(roundedValue); // toLocaleString adds commas to the number
  };

  const handleIncrement = () => {
    // Increment the slider value by 25%
    const newValue = Math.min(value + 25, 100); // Ensure the value doesn't exceed 100
    handleChange(null, newValue); // Trigger the same handler as the slider
  };

  const handleDecrement = () => {
    const newValue = Math.max(value - 25, 0);
    handleChange(null, newValue);
  };

  const followersMarks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 25,
      label: "25%",
    },
    {
      value: 50,
      label: "50%",
    },
    {
      value: 75,
      label: "75%",
    },
    {
      value: 100,
      label: "100%",
    },
  ];

  const scaleCredits = (value) => {
    return (value / 100) * totalCredits;
  };

  function numFormatter(num) {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(0) + "K"; // convert to K for number from > 1000 < 1 million
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(0) + "M"; // convert to M for number from > 1 million
    } else if (num < 900) {
      return num; // if value < 1000, nothing to do
    }
  }

  useEffect(() => {
    const handleReset = () => {
      handleChange(null, 0);
    };

    handleReset();
  }, [selectedButton]);

  return (
    <>
      <div
        onClick={() => {
          handleDecrement();
          handlePress("repeat");
        }}
      >
        <RemoveCircleIcon
          style={{ color: "white", fontSize: "3rem" }}
          className={decrementButtonStyle}
        />
      </div>
      <Slider
        style={{ maxWidth: 500 }}
        value={value}
        min={0}
        step={1}
        max={100}
        valueLabelFormat={numFormatter}
        marks={followersMarks}
        scale={scaleCredits}
        onChange={handleChange}
        valueLabelDisplay="off"
        aria-labelledby="non-linear-slider"
        size="large"
      />
      <div
        onClick={() => {
          handleIncrement();
          handlePress("clear");
        }}
      >
        <AddCircleIcon
          style={{ color: "white", fontSize: "3rem" }}
          className={incrementButtonStyle}
        />
      </div>
    </>
  );
}
