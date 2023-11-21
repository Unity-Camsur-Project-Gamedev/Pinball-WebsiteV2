/* eslint-disable */
import React, { useState } from "react";
import EmbossedMobile from "../components/EmbossedMobile";

import { IconButton } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ChatPlayToggle from "../components/ChatPlayToggle";
import LiveChat from "../components/LiveChat";

import ColorInputGrid from "./ColorInputGrid";
import useLiveStream from "../context/LiveStreamContext";

function MobileResponsive2() {
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
    handleBetOnColor,
    handleButtonClick,
    handleClearButton,
    handleMaxButton,
    handleInputButtonClick,
  } = useLiveStream();

  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [toggle, setToggle] = useState("play");

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

  const buttonClassName = `flex items-center justify-center rounded-full bg-gradient-to-r from-green-400  to-green-500 ${
    isPressed ? "shadow-pressed" : "shadow-unpressed"
  } `;

  return (
    <div className="lg:gap-0 h-auto w-full flex flex-col items-center  bg-white ">
      <div className="flex justify-center items-center py-4 w-full h-auto uppercase text-dynamicSmall font-semibold bg-white">
        <div className="w-[85%] flex justify-center items-center">
          <div className="flex flex-2 items-center justify-between gap-2 ">
            <p className="w-full text-2xl font-bold font-[Poppins] uppercase">
              pinball game
            </p>
          </div>
        </div>
      </div>
      <div className="relative w-full pb-[56.25%] border-2 border-yellow-600">
        <iframe
          //We'll use the padding bottom technique to maintain 16:9 ratio
          className=" absolute w-full h-full"
          allow="fullscreen"
          // width="1280"
          // height="720"
          src="https://demo.nanocosmos.de/nanoplayer/embed/1.3.3/nanoplayer.html?group.id=f41e0c23-d082-4426-b79e-3eac9d5070b1&options.adaption.rule=deviationOfMean2&startIndex=0&playback.latencyControlMode=classic"
        ></iframe>
      </div>
      <div className="flex justify-center items-center py-4 w-full h-auto uppercase text-dynamicSmall font-semibold bg-white">
        <div className="w-[90%] flex">
          <div className="flex flex-2 items-center justify-between gap-2 font-['Poppins'] ">
            <p className="w-full text-md font-bold">credits:</p>
            <div className="flex justify-center items-center">
              <div className="text-[#e26629] text-md ">
                {totalCredits !== 0
                  ? ` ${parseFloat(totalCredits).toLocaleString()}.00`
                  : "0.00"}
              </div>
              <div>
                <IconButton
                  aria-label="delete"
                  color="primary"
                  style={{ fontSize: "5rem" }}
                  onClick={() => {
                    setIsOpen(!isOpen);
                    // console.log(isOpen);
                  }}
                >
                  <AddCircleRoundedIcon style={{ fontSize: "1.2rem" }} />
                </IconButton>
              </div>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-end gap-2 font-['Poppins']">
            <p className="text-md font-bold">color:</p>
            <div
              className="w-16 h-8 rounded-sm"
              style={{
                backgroundColor: colorHex[selectedButton] || "#FFFFFF",
                boxShadow: "inset gray 0px 0px 20px -12px",
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full h-[62vh] pt-4 items-center rounded-t-3xl  bg-[#a0dfff]">
        <div className="">
          <ChatPlayToggle setToggle={setToggle} />
        </div>
        {toggle === "play" ? (
          <div className="flex flex-col-reverse gap-4 w-full px-4 py-2 ">
            <div className="uppercase text-dynamicSmall font-semibold flex flex-col items-center justify-center gap-3">
              <p>enter bet amount:</p>
              <div className="flex items-center justify-center px-2 gap-2">
                <input
                  type="text"
                  value={
                    betAmount !== ""
                      ? `₱ ${parseFloat(betAmount).toLocaleString()}`
                      : "₱ 0"
                  }
                  className="text-dynamicMid text-center w-full mx-auto text-[#E26226] outline-none border-none py-1 rounded-2xl"
                  onChange={handleInputChange}
                />
                <p
                  onClick={() => handleClearButton()}
                  style={{
                    fontWeight: 100,
                    fontSize: ".75rem",
                    fontWeight: "bold",
                    fontFamily: "Poppins",
                  }}
                >
                  clear
                </p>
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
                  onMouseEnter={handleHover}
                  onMouseLeave={handleLeave}
                >
                  <p className="text-white">confirm</p>
                </div>
              </div>
            </div>
            <div className="uppercase text-dynamicSmall font-semibold flex flex-col items-center justify-center gap-3">
              <p>select a color:</p>
              <ColorInputGrid
                selectedButton={selectedButton}
                colorHex={colorHex}
                handleBetOnColor={handleBetOnColor}
              />
            </div>
          </div>
        ) : (
          <div className="h-[90%] w-full py-2 px-4 rounded-lg">
            <LiveChat />
          </div>
        )}
      </div>
    </div>
  );
}

export default MobileResponsive2;
