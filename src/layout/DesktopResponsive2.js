/* eslint-disable */
import React, { useEffect, useState, useRef } from "react";

import { Alert, Button, ButtonGroup, IconButton } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

import ColorInputs from "./ColorInputs";
import LiveStreamFrame from "./LiveStreamFrame";
import useLiveStream from "../context/LiveStreamContext";
import LiveChat from "../components/LiveChat";
import GameHistory from "./GameHistory";
import HotCold from "./HotCold";
import GameWinners from "./GameWinners";
import NumberAndSlider from "../components/NumberAndSlider";

//redux
import { useSelector, useDispatch } from "react-redux";
import { handleWalletOpen } from "../Slice/ModalSlice";

function DesktopResponsive2({ empty, setEmpty }) {
  const {
    handleInputChange,
    handleConfirmBet,
    handleRepeatBet,
    handleClearBet,
  } = useLiveStream();

  //redux
  const dispatch = useDispatch();
  const credits = 1000;
  // alert(credits);
  const colorHex = useSelector((state) => state.button.colorHex);
  const betStatus = useSelector((state) => state.betting.betStatus);
  const betAmount = useSelector((state) => state.betting.betAmount);
  const multiplier = useSelector((state) => state.betting.multiplier);
  const initialBet = useSelector((state) => state.betting.initialBet);
  const confirmedBet = useSelector((state) => state.betting.confirmedBet);
  const selectedColorIndex = useSelector(
    (state) => state.button.selectedColorIndex
  );

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

  useEffect(() => {
    if (
      parseInt(betAmount) > 0 ||
      initialBet.length !== 0 ||
      confirmedBet.length !== 0
    ) {
      setEmpty(false);
    } else {
      setEmpty(true);
    }
  }, [betAmount, initialBet, confirmedBet]);

  return (
    <div
      className="main-container h-full w-full"
      style={{
        boxShadow: "0px 15px 30px 0px rgba(0,0,0,0.7)",
      }}
    >
      <div className="top-sub-container w-full h-[60%] flex justify-center gap-2 backdrop-blur-md bg-white/30">
        <div className="left-panel w-[15%] flex flex-col gap-2 items-center rounded-md h-full py-4">
          <div className="w-full flex-1 flex flex-col gap-2 rounded-lg items-center p-2 bg-white/50">
            <GameHistory />
          </div>
          <div className=" w-full flex-1 flex flex-col gap-2 rounded-lg p-2 bg-white/50">
            <HotCold />
          </div>
        </div>
        <div className="middle-panel w-[65%] aspect-video">
          <LiveStreamFrame />
        </div>
        <div className="right-panel w-[15%] flex flex-col gap-2 items-center rounded-md h-full py-4">
          <div className="w-full flex-1 flex flex-col gap-2 rounded-lg items-center p-2 bg-white/50">
            <GameWinners />
          </div>
        </div>
      </div>
      <div className="bottom-sub-container w-full h-[40%] flex flex-col">
        <div className="color-grid-container relative h-[25%]">
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
          <ColorInputs />
        </div>

        <div className="input-grid-container grid grid-cols-3 flex-1 bg-[#60c9ff] ">
          <div className="flex flex-col relative gap-1 2xl:gap-2 justify-center items-center p-2 2xl:p-5 ">
            {/* BLOCKING OVERLAY WHEN BET STATUS BECOMES CLOSED. */}
            {betStatus === "Closed" && (
              <div className="absolute inset-0 z-10 "></div>
            )}
            <NumberAndSlider />
          </div>
          <div className="bet-info relative p-2 ">
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
                          dispatch(handleWalletOpen());
                        }}
                        data-cy="addCredits"
                      >
                        <AddCircleRoundedIcon />
                      </IconButton>
                    </div>
                    <p className="font-bold text-[#1057a8] 2xl:text-2xl xl:text-xl lg:text-md">
                      credits:
                    </p>
                    <div className="flex items-center font-bold 2xl:text-2xl xl:text-xl lg:text-md text-[#E26226] 2xl:px-2 xl:px-1 w-1/2">
                      {credits && credits !== 0
                        ? `₱ ${parseFloat(credits).toLocaleString()}`
                        : "0"}
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-full  ">
                    <p className="font-bold text-[#1057a8] 2xl:text-2xl xl:text-xl lg:text-md">
                      Bet Amount:
                    </p>
                    <div className="text-[#E26226] w-1/2 font-['Poppins'] rounded-full shadow-inner">
                      <input
                        type="text"
                        data-cy="type-bet"
                        value={
                          betAmount !== ""
                            ? `₱ ${(
                                parseFloat(betAmount) * parseFloat(multiplier)
                              ).toLocaleString()}`
                            : "₱ 0"
                        }
                        className="2xl:text-2xl xl:text-xl lg:text-md w-full text-[#E26226] border-2 rounded-full 2xl:p-2 xl:p-1"
                        onChange={handleInputChange}
                      ></input>
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-full  ">
                    <p className="font-bold text-[#1057a8] 2xl:text-2xl xl:text-xl lg:text-md">
                      color:
                    </p>
                    <div
                      className="w-1/2 h-5 bg-white rounded-full 2xl:p-6 xl:p-4"
                      style={{
                        backgroundColor: colorHex[selectedColorIndex],
                        boxShadow: "0px 0px 15px 2px rgba(0,0,0,0.3) inset",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-between items-center gap-4 px-5">
                <Button
                  disableRipple
                  className={repeatButtonClassName}
                  style={{
                    backgroundColor: repeatIsHovered ? "#036be2" : "#0474f2",
                    color: "white",
                    fontSize: ".75rem",
                    padding: "2%",
                    fontWeight: "bold",
                    borderRadius: 50,
                  }}
                  onClick={() => {
                    handlePress("repeat");
                    handleRepeatBet();
                    setEmpty(false);
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
                    repeat
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
                        ? "transition translate-x-[3px] translate-y-[3px]"
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
                  data-cy="clear-bets"
                >
                  <p
                    className={`${
                      clearIsPressed
                        ? "transition translate-x-[3px] translate-y-[3px] "
                        : ""
                    } `}
                  >
                    clear
                  </p>
                </Button>
              </div>
            </div>
          </div>
          <LiveChat />
        </div>
      </div>
    </div>
  );
}

export default DesktopResponsive2;
