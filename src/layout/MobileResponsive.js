/* eslint-disable */
import React from "react";

import { IconButton } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

import ColorInputGrid from "./ColorInputGrid";
import useLiveStream from "../context/LiveStreamContext";

function MobileResponsive() {
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
  return (
    <div className="lg:hidden lg:gap-0 pb-14 h-auto w-full flex flex-col items-center border-4 border-blue-600">
      <div className="flex justify-center items-center py-4 w-full h-auto uppercase text-dynamicSmall font-semibold bg-gray-300 ">
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
      <div className="flex justify-center items-center py-4 w-full h-auto uppercase text-dynamicSmall font-semibold bg-gray-300 ">
        <div className="w-[85%] flex ">
          <div className="flex flex-2 items-center justify-between gap-2 ">
            <p className="w-full">credits:</p>
            <div className="text-[#E26226] font-['Poppins'] mt-1">
              {totalCredits !== 0
                ? ` ${parseFloat(totalCredits).toLocaleString()}.00`
                : "0.00"}
            </div>
            <div>
              <IconButton
                aria-label="delete"
                color="primary"
                size="small"
                onClick={() => {
                  setIsOpen(!isOpen);
                  // console.log(isOpen);
                }}
              >
                <AddCircleRoundedIcon />
              </IconButton>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-end gap-2 ">
            <p>color:</p>
            <div
              className="w-16 h-8 "
              style={{ backgroundColor: colorHex[selectedButton] }}
            ></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse w-[90%] p-2 gap-2 rounded-lg ">
        <div className="uppercase text-dynamicSmall font-semibold flex flex-col items-center justify-center gap-2 ">
          <p>enter bet amount:</p>
          <div className="flex items-center justify-center px-2 py-2 border-2 border-black">
            <input
              type="text"
              value={
                betAmount !== ""
                  ? `₱ ${parseFloat(betAmount).toLocaleString()}`
                  : "₱ 0"
              }
              className="text-dynamicMid text-center w-full mx-auto text-[#E26226] outline-none border-none"
              onChange={handleInputChange}
              // onKeyDown={handleKeyDown}
            />
            <p
              onClick={() => handleClearButton()}
              style={{ fontWeight: 100, fontSize: ".75rem" }}
            >
              clear
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 w-full text-center">
            {betButtons.map((button, key) => (
              <div
                key={key}
                className="p-2 rounded-full border-2 border-black"
                onClick={() => handleInputButtonClick(button)}
              >
                <p className="text-dynamicMid">{button}</p>
              </div>
            ))}
            <div
              className="flex items-center justify-center rounded-full bg-[#00FF19]"
              onClick={handleConfirmBet}
            >
              <p>confirm</p>
            </div>
          </div>
        </div>
        <div className="uppercase text-dynamicSmall font-semibold flex flex-col items-center justify-center gap-2 ">
          <p>select a color:</p>
          <ColorInputGrid
            selectedButton={selectedButton}
            colorHex={colorHex}
            handleBetOnColor={handleBetOnColor}
          />
        </div>
      </div>
    </div>
  );
}

export default MobileResponsive;
