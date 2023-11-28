/* eslint-disable */
import React, { useEffect, useState } from "react";

import { Alert, Button, ButtonGroup, IconButton } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

import ColorInputs from "./ColorInputs";
import NumberInput from "./NumberInput";
import LiveStreamFrame from "./LiveStreamFrame";
import useLiveStream from "../context/LiveStreamContext";
import LiveChat from "../components/LiveChat";

function DesktopResponsive2({ betStatus, empty, setEmpty, history }) {
  const {
    isOpen,
    colorHex,
    colorName,
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
    handleRepeatBet,
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
  const [displayedHistory, setDisplayedHistory] = useState([]);

  useEffect(() => {
    const updatedHistory = history.map((item) => {
      const colorIndex = colorName.indexOf(item);
      if (colorIndex !== -1) {
        return {
          colorName: item,
          colorHex: colorHex[colorIndex],
        };
      }
      return {
        colorName: item,
        colorHex: 'No matching color',
      };
    });
    setDisplayedHistory(updatedHistory);
  }, [history, colorName, colorHex]);

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

  const confirmButtonClassName = `w-[70%]  ${isPressed ? "shadow-pressed" : "shadow-unpressed"
    } `;
  const repeatButtonClassName = `w-[20%]  ${repeatIsPressed ? "shadow-pressed" : "shadow-unpressed"
    } `;
  const clearButtonClassName = `w-[20%]  ${clearIsPressed ? "shadow-pressed" : "shadow-unpressed"
    } `;

  const groupConsecutiveColors = (historyItems) => {
    const groupedColors = [];
    let currentGroup = [];
    for (let i = 0; i < historyItems.length; i++) {
      if (i === 0 || historyItems[i].colorName === historyItems[i - 1].colorName) {
        currentGroup.push(historyItems[i]);
      } else {
        if (currentGroup.length > 6) {
          groupedColors.push(currentGroup.slice(0, 6));
          currentGroup = currentGroup.slice(6);
        }
        groupedColors.push(currentGroup);
        currentGroup = [historyItems[i]];
      }
    }
    if (currentGroup.length > 6) {
      groupedColors.push(currentGroup.slice(0, 6));
      currentGroup = currentGroup.slice(6);
    }
    if (currentGroup.length > 0) {
      groupedColors.push(currentGroup);
    }
    return groupedColors;
  };

  const groupedColors = groupConsecutiveColors(displayedHistory);

  return (
    <div
      className=" h-full w-full"
      style={{
        boxShadow: "0px 15px 30px 0px rgba(0,0,0,0.7)",
      }}
    >
      <div className="flex justify-center items-center h-full ">
        <div className="main-container flex flex-col w-full h-full">
          <div className="sub-container w-full  flex justify-center items-center backdrop-blur-md bg-white/30 border-2 border-red-600">
            <div className="flex flex-1 flex-col items-center border-2 border-green-600 h-full">
              <p className="text-lg font-bold text-gray-100">Game History:</p>
              <div className="grid grid-cols-auto grid-flow-col gap-2 h-fit max-h-[30vh] w-[20vh] overflow-x-auto custom-scrollbar px-2 bg-white/50">
                {groupedColors.map((group, index) => (
                  <div key={index} className="flex flex-col items-center">
                    {group.map((item, idx) => (
                      <div
                        key={idx}
                        style={{ backgroundColor: item.colorHex }}
                        className="mb-1 border-2 w-[40px] h-[40px]"
                      ></div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative lg:w-[70%] xl:w-[65%] 2xl:w-[67%] aspect-video">
              <LiveStreamFrame />
            </div>
            <div className="flex flex-1 border-2 border-green-600 h-full"></div>
          </div>

          <div className="sub-container flex flex-col flex-1  ">
            <div className="color-grid-container h-[5rem]  relative">
              {/* BLOCKING OVERLAY WHEN BET STATUS BECOMES CLOSED. */}
              {betStatus === "Open" && empty && (
                <div
                  className="absolute inset-0 flex justify-center items-center z-10 bg-gray-400 bg-opacity-50 cursor-pointer"
                  onClick={(e) => setEmpty(false)}
                >
                  <p className="text-center text-3xl font-bold text-yellow-50 animate-blink">
                    PLEASE PLACE YOUR BETS HERE
                  </p>
                </div>
              )}
              {betStatus === "Closed" && (
                <div className="absolute inset-0 z-10 flex justify-center items-center bg-gray-400 bg-opacity-50 cursor-not-allowed">
                  <p className="text-center text-3xl font-bold text-yellow-50 animate-blink">
                    BET IS CLOSED
                  </p>
                </div>
              )}
              <ColorInputs
                selectedButton={selectedButton}
                colorHex={colorHex}
                handleBetOnColor={handleBetOnColor}
              />
            </div>
            <div className="input-grid-container grid grid-cols-3 flex-1 bg-[#60c9ff]">
              <div className=" relative px-2 py-2">
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
              <div className="bet-info  p-2 relative">
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
                        // handleRepeatBet();
                      }}
                      onMouseEnter={() => handleHover("repeat")}
                      onMouseLeave={() => handleLeave("repeat")}
                    >
                      <p
                        className={`${repeatIsPressed
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
                        className={`${isPressed
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
                        className={`${clearIsPressed
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
              <div className="">
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
