/* eslint-disable */
import React, { useEffect, useState } from "react";

import { Alert, Button, ButtonGroup, IconButton } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

import ColorInputs from "./ColorInputs";
import NumberInput from "./NumberInput";
import LiveStreamFrame from "./LiveStreamFrame";
import useLiveStream from "../context/LiveStreamContext";
import LiveChat from "../components/LiveChat";

function DesktopResponsive2({ betStatus }) {
  const {
    isOpen,
    colorHex,
    numGroup1,
    numGroup2,
    numGroup3,
    totalCredits,
    betAmount,
    selectedButton,
    betButtons,
    setIsOpen,
    handleInputChange,
    handleConfirmBet,
    handleClearBet,
    handleBetOnColor,
    handleButtonClick,
    handleClearButton,
    handleMaxButton,
    handleInputButtonClick,
  } = useLiveStream();

  const [popUp, setPopUp] = useState(false);

  const [isHovered, setIsHovered] = useState(false);
  const [repeatIsHovered, setRepeatIsHovered] = useState(false);
  const [clearIsHovered, setClearIsHovered] = useState(false);

  const [isPressed, setIsPressed] = useState(false);
  const [repeatIsPressed, setRepeatIsPressed] = useState(false);
  const [clearIsPressed, setClearIsPressed] = useState(false);

  const handleHover = (button) => {
    if (button === "confirm") {
      setIsHovered(true);
    } else if (button === "repeat") {
      setRepeatIsHovered(true);
    } else {
      setClearIsHovered(true);
    }
  };

  const handleLeave = (button) => {
    if (button === "confirm") {
      setIsHovered(false);
    } else if (button === "repeat") {
      setRepeatIsHovered(false);
    } else {
      setClearIsHovered(false);
    }
  };

  const handlePress = (button) => {
    if (button === "confirm") {
      setIsPressed(true);
      setTimeout(() => {
        setIsPressed(false);
      }, 100);
    } else if (button === "repeat") {
      setRepeatIsPressed(true);
      setTimeout(() => {
        setRepeatIsPressed(false);
      }, 100);
    } else {
      setClearIsPressed(true);
      setTimeout(() => {
        setClearIsPressed(false);
      }, 100);
    }
  };

  const confirmButtonClassName = `w-[70%]  ${
    isPressed ? "shadow-pressed" : "shadow-unpressed"
  } `;
  const repeatButtonClassName = `w-[20%]  ${
    repeatIsPressed ? "shadow-pressed" : "shadow-unpressed"
  } `;
  const clearButtonClassName = `w-[20%]  ${
    clearIsPressed ? "shadow-pressed" : "shadow-unpressed"
  } `;

  return (
    <div className="border-2 border-black h-full w-full">
      <div className="flex justify-center items-center h-full border-2 border-green-600">
        <div className="main-container flex flex-col w-full h-full border-2 border-blue-600">
          <div className="sub-container w-full  flex justify-center items-center bg-[#b0ecfa]">
            <LiveStreamFrame />
          </div>

          <div className="sub-container flex flex-col flex-1  ">
            <div className="color-grid-container h-[5rem]  relative">
              {/* BLOCKING OVERLAY WHEN BET STATUS BECOMES CLOSED. */}
              {betStatus === "Closed" && (
                <div className="absolute inset-0 z-10 "></div>
              )}
              <ColorInputs
                selectedButton={selectedButton}
                colorHex={colorHex}
                handleBetOnColor={handleBetOnColor}
              />
            </div>
            <div className="input-grid-container grid grid-cols-3 flex-1 bg-[#60c9ff]">
              <div className="border-2 border-green-600 relative">
                {/* BLOCKING OVERLAY WHEN BET STATUS BECOMES CLOSED. */}
                {betStatus === "Closed" && (
                  <div className="absolute inset-0 z-10 "></div>
                )}
                <NumberInput
                  numGroup1={numGroup1}
                  numGroup2={numGroup2}
                  numGroup3={numGroup3}
                  betAmount={betAmount}
                  handleButtonClick={handleButtonClick}
                  handleClearButton={handleClearButton}
                  handleMaxButton={handleMaxButton}
                />
              </div>
              <div className="bet-info border-2 border-green-600 p-2 relative">
                {/* BLOCKING OVERLAY WHEN BET STATUS BECOMES CLOSED. */}
                {betStatus === "Closed" && (
                  <div className="absolute inset-0 z-10 "></div>
                )}
                <div
                  className="bg-[#ffdf01] h-full flex flex-col xl:gap-2 2xl:gap-3 items-center justify-center uppercase font-extrabold shadow-unpressed"
                  style={{ borderRadius: 35 }}
                >
                  <div className=" w-[85%] text-dynamicLarge">
                    <div className=" flex flex-col gap-4 ">
                      <div className="relative flex items-center justify-between w-full ">
                        <div className="absolute right-0 ">
                          <IconButton
                            aria-label="delete"
                            color="primary"
                            size="small"
                            onClick={() => {
                              setIsOpen(!isOpen);
                            }}
                          >
                            <AddCircleRoundedIcon />
                          </IconButton>
                        </div>
                        <p className="font-bold text-[#1057a8] 2xl:text-2xl xl:text-xl lg:text-md">
                          credits:{" "}
                        </p>
                        <div className="flex items-center font-bold 2xl:text-2xl xl:text-xl lg:text-md text-[#E26226] 2xl:px-2 xl:px-1 w-1/2">
                          {totalCredits !== 0
                            ? `₱ ${parseFloat(totalCredits).toLocaleString()}`
                            : "0"}
                        </div>
                      </div>
                      <div className="flex items-center justify-between w-full  ">
                        <p className="font-bold text-[#1057a8] 2xl:text-2xl xl:text-xl lg:text-md">
                          Bet Amount:{" "}
                        </p>
                        <div className="text-[#E26226] w-1/2 font-['Poppins'] rounded-full shadow-inner">
                          <input
                            type="text"
                            value={
                              betAmount !== ""
                                ? `₱ ${parseFloat(betAmount).toLocaleString()}`
                                : "₱ 0"
                            }
                            className="2xl:text-2xl xl:text-xl lg:text-md w-full text-[#E26226] border-2 rounded-full 2xl:p-2 xl:p-1"
                            onChange={handleInputChange}
                          ></input>
                        </div>
                      </div>
                      <div className="flex items-center justify-between w-full  ">
                        <p className="font-bold text-[#1057a8] 2xl:text-2xl xl:text-xl lg:text-md">
                          color:{" "}
                        </p>
                        <div
                          className="w-1/2 h-5 bg-white rounded-full 2xl:p-6 xl:p-4 shadow-inner"
                          style={{ backgroundColor: colorHex[selectedButton] }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex justify-between items-center gap-4 px-5">
                    <Button
                      disableRipple
                      className={repeatButtonClassName}
                      style={{
                        backgroundColor: repeatIsHovered
                          ? "#036be2"
                          : "#0474f2",
                        color: "white",
                        fontSize: ".75rem",
                        padding: "2%",
                        fontWeight: "bold",
                        borderRadius: 50,
                      }}
                      onClick={() => {
                        handlePress("repeat");
                        handleConfirmBet();
                      }}
                      onMouseEnter={() => handleHover("repeat")}
                      onMouseLeave={() => handleLeave("repeat")}
                    >
                      <p
                        className={`${
                          repeatIsPressed
                            ? "transition translate-x-[3px] translate-y-[3px] "
                            : ""
                        } `}
                      >
                        repeat bet
                      </p>
                    </Button>
                    <Button
                      disableRipple
                      className={confirmButtonClassName}
                      style={{
                        backgroundColor: isHovered ? "#036be2" : "#0474f2",
                        color: "white",
                        fontSize: "1.5rem",
                        padding: "2%",
                        fontWeight: "bold",
                        borderRadius: 50,
                      }}
                      onClick={() => {
                        handlePress("confirm");
                        handleConfirmBet();
                      }}
                      onMouseEnter={() => handleHover("confirm")}
                      onMouseLeave={() => handleLeave("confirm")}
                    >
                      <p
                        className={`${
                          isPressed
                            ? "transition translate-x-[3px] translate-y-[3px] "
                            : ""
                        } `}
                      >
                        confirm
                      </p>
                    </Button>
                    <Button
                      disableRipple
                      className={clearButtonClassName}
                      style={{
                        backgroundColor: clearIsHovered ? "#036be2" : "#0474f2",
                        color: "white",
                        fontSize: ".75rem",
                        padding: "2%",
                        fontWeight: "bold",
                        borderRadius: 50,
                      }}
                      onClick={() => {
                        handlePress("clear");
                        handleClearBet();
                        // handleConfirmBet();
                      }}
                      onMouseEnter={() => handleHover("clear")}
                      onMouseLeave={() => handleLeave("clear")}
                    >
                      <p
                        className={`${
                          clearIsPressed
                            ? "transition translate-x-[3px] translate-y-[3px] "
                            : ""
                        } `}
                      >
                        clear bet
                      </p>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="border-2 border-green-600 ">
                <LiveChat />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesktopResponsive2;
