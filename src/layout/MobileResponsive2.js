/* eslint-disable */
import React, { useState, useEffect } from "react";
import EmbossedMobile from "../components/EmbossedMobile";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import { IconButton } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ChatPlayToggle from "../components/ChatPlayToggle";
import LiveChat from "../components/LiveChat";
import icon from "../assets/group.png";
import pinBallLogo from "../assets/pinBallLogo.png";

import ColorInputGrid from "./ColorInputGrid";
import useLiveStream from "../context/LiveStreamContext";
import GameWinners from "./GameWinners";
import GameHistory from "./GameHistory";
import HotCold from "./HotCold";

// new imports
import LiveStreamFrame from "./LiveStreamFrame";

//redux
import { useSelector, useDispatch } from "react-redux";
import { handleWalletOpen, handleWalletClose } from "../Slice/ModalSlice";
import MultiplierButton from "../components/MultiplierButton";

function MobileResponsive2() {
  const {
    isOpen,
    setIsOpen,
    handleInputChange,
    handleConfirmBet,
    handleBetOnColor,
    handleClearButtonMobile,
    handleInputButtonClick,
    handleRepeatBet,
  } = useLiveStream();

  //redux
  const dispatch = useDispatch();
  const credits = useSelector((state) => state.user.credits);
  const colorHex = useSelector((state) => state.button.colorHex);
  const betButtons = useSelector((state) => state.button.betButtons);
  const betStatus = useSelector((state) => state.betting.betStatus);
  const betAmount = useSelector((state) => state.betting.betAmount);
  const multiplier = useSelector((state) => state.betting.multiplier);
  const multiplierButtons = useSelector(
    (state) => state.button.multiplierButtons
  );
  const toggle = useSelector((state) => state.button.toggle);
  const selectedColorIndex = useSelector(
    (state) => state.button.selectedColorIndex
  );
  const [isPressed, setIsPressed] = useState(false);
  const shouldBlink =
    betStatus === "Open" ? "animate-blink2 text-green-700" : "text-red-700";
  const Blink = betStatus === "Open" ? `border-pulse` : "";

  const handlePress = () => {
    setIsPressed(true);
    setTimeout(() => {
      setIsPressed(false);
    }, 100);
  };
  const buttonClassName = `flex items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-green-500 ${
    isPressed ? "shadow-pressed" : "shadow-unpressed"
  } `;

  return (
    <div className="w-full flex flex-col items-center head-div">
      <div className="logo-container head-div flex justify-center items-center py-4 w-full backdrop-blur-md bg-white/30">
        <img src={pinBallLogo} className="h-14" />
      </div>
      <div className="stream-panel w-full aspect-video">
        <LiveStreamFrame />
      </div>
      <div className="credits-color-container head-div flex justify-around items-center py-4 w-full h-auto uppercase text-dynamicSmall font-semibold backdrop-blur-md bg-white/30">
        <div className="credits-container flex items-center justify-between gap-2 font-['Poppins']">
          <p className="w-full text-md font-bold">credits:</p>
          <div className="flex justify-center items-center">
            <div className="text-[#e26629] text-md ">
              {credits !== 0
                ? ` ${parseFloat(credits).toLocaleString()}.00`
                : "0.00"}
            </div>
            <div>
              <IconButton
                aria-label="delete"
                color="primary"
                style={{ fontSize: "5rem" }}
                onClick={() => {
                  // setIsOpen(!isOpen);
                  dispatch(handleWalletOpen());
                  // console.log(isOpen);
                }}
              >
                <AddCircleRoundedIcon style={{ fontSize: "1.2rem" }} />
              </IconButton>
            </div>
          </div>
        </div>
        <div className="color-container flex items-center gap-2 font-['Poppins']">
          <p className="text-md font-bold">color:</p>
          <div
            className="w-14 h-7 rounded-full"
            style={{
              backgroundColor: colorHex[selectedColorIndex] || "#FFFFFF",
              boxShadow: "inset gray 0px 0px 20px -12px",
            }}
          ></div>
        </div>
      </div>
      <div className="toggle-container flex flex-col w-full py-5 items-center rounded-t-3xl backdrop-blur-md bg-white/50 relative">
        <div className="betInfo-toggle-container flex justify-between items-center w-full px-4">
          <div className="card text-sm rounded-md">
            <p className={`font-bold uppercase ${shouldBlink}`}>
              {betStatus} betting
            </p>
            <div className="top"></div>
            <div className="bottom"></div>
            <div className="right"></div>
            <div className="left"></div>
          </div>
          <div className="pb-2">
            <ChatPlayToggle />
          </div>
        </div>
        {toggle === "play" ? (
          <div className="play-toggle-container flex flex-col gap-4 w-full px-4 py-2">
            <div
              className={`uppercase text-dynamicSmall font-semibold flex flex-col items-center justify-center gap-3 relative p-4 bg-gray-50 rounded-lg ${Blink}`}
            >
              <p>select a color:</p>
              {/* BLOCKING OVERLAY WHEN BET STATUS BECOMES CLOSED. */}
              {betStatus === "Closed" && (
                <div className="absolute inset-0 z-10"></div>
              )}
              <ColorInputGrid />
            </div>
            <div className="bet-input-container flex flex-col items-center justify-center gap-3">
              {/* BLOCKING OVERLAY WHEN BET STATUS BECOMES CLOSED. */}
              {betStatus === "Closed" && (
                <div className="absolute inset-0 z-10"></div>
              )}
              <p className="uppercase text-dynamicSmall font-semibold">
                enter bet amount:
              </p>
              <div className="flex items-center justify-center px-2 gap-2">
                {/* Repeat Bet Button */}
                <button
                  onClick={() => handleRepeatBet()}
                  style={{
                    fontWeight: 100,
                    fontSize: ".75rem",
                    fontWeight: "bold",
                    fontFamily: "Poppins",
                  }}
                  className="select-none uppercase"
                >
                  repeat
                </button>
                {/* Bet Amount Input */}
                <input
                  type="text"
                  value={
                    betAmount !== ""
                      ? `₱ ${(
                          parseFloat(betAmount) * parseFloat(multiplier)
                        ).toLocaleString()}`
                      : "₱ 0"
                  }
                  className="text-dynamicMid text-center w-full mx-auto text-[#E26226] outline-none border-none py-1 rounded-2xl"
                  onChange={handleInputChange}
                />
                {/* Clear Bet Button */}
                <button
                  onClick={() => handleClearButtonMobile()}
                  style={{
                    fontWeight: 100,
                    fontSize: ".75rem",
                    fontWeight: "bold",
                    fontFamily: "Poppins",
                  }}
                  className="select-none uppercase"
                >
                  clear
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2 w-full text-center">
                {multiplierButtons.map((button, key) => (
                  <div key={key}>
                    <MultiplierButton button={button} />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2 w-full text-center">
                {betButtons.map((button, key) => (
                  <div key={key}>
                    <EmbossedMobile
                      button={button}
                      handlerFunction={() => handleInputButtonClick(button)}
                    />
                  </div>
                ))}
                <div
                  className={buttonClassName}
                  onClick={() => {
                    handleConfirmBet();
                    handlePress();
                  }}
                >
                  <p className="text-white uppercase text-dynamicSmall font-semibold">
                    confirm
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : toggle === "stats" ? (
          <div className="h-[61vh] flex flex-col justify-center items-center gap-2 w-full p-4 rounded-lg">
            <div className=" w-[90%] flex-1 flex flex-col gap-2 rounded-lg items-center py-3 px-4 bg-white/50">
              <GameHistory />
            </div>
            <div className=" w-[90%] flex-1 flex flex-col gap-2 rounded-lg py-4 px-4 bg-white/50">
              <HotCold />
            </div>
          </div>
        ) : (
          <div className="h-[61vh] w-full p-4 rounded-lg">
            <LiveChat />
          </div>
        )}
      </div>
    </div>
  );
}

export default MobileResponsive2;
