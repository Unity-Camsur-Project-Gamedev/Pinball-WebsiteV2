/* eslint-disable */
import React, { useState } from "react";

import { Alert, Button, ButtonGroup, IconButton } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

import ColorInputs from "./ColorInputs";
import NumberInput from "./NumberInput";
import LiveStreamFrame from "./LiveStreamFrame";
import useLiveStream from "../context/LiveStreamContext";
import Confetti from "../components/Confetti ";
import PopUp from "../components/PopUp";
import LiveChat from "../components/LiveChat";

function DesktopResponsive({ confetti }) {
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

  // const [confetti, setConfetti] = useState(false);
  const [popUp, setPopUp] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center border-2 border-green-600 ">
        {confetti && <Confetti />}
        {popUp && <PopUp />}

        <LiveStreamFrame />
      </div>

      <div className=" flex flex-1 justify-center items-center h-56">
        <div className="flex flex-col w-full h-full ">
          <div className="h-[20%] z-10">
            <ColorInputs
              selectedButton={selectedButton}
              colorHex={colorHex}
              handleBetOnColor={handleBetOnColor}
            />
          </div>
          <div className="h-[85%] grid grid-cols-3 border-2 border-red-600">
            <div className="numpad ">
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

            <div className="bet-info  flex flex-col gap-4 items-center justify-center uppercase font-extrabold border-2 border-red-600">
              <div className=" w-[90%] text-dynamicLarge">
                <div className=" flex flex-col items-center gap-4 ">
                  <div className="relative flex items-center justify-between w-4/5 ">
                    <div className="absolute right-0">
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
                    <p className="font-['Poppins']">credits: </p>
                    <div className="flex items-center  text-[#E26226] font-['Poppins'] w-1/2">
                      {totalCredits !== 0
                        ? `₱ ${parseFloat(totalCredits).toLocaleString()}`
                        : "0"}
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-4/5 ">
                    <p className="font-['Poppins']">Bet Amount: </p>
                    <div className="text-[#E26226] w-1/2 font-['Poppins']">
                      <input
                        type="text"
                        value={
                          betAmount !== ""
                            ? `₱ ${parseFloat(betAmount).toLocaleString()}`
                            : "₱ 0"
                        }
                        className="text-dynamicLarge w-full text-[#E26226] border-2"
                        onChange={handleInputChange}
                      ></input>
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-4/5 ">
                    <p className="font-['Poppins']">color: </p>
                    <div
                      className="w-1/2 h-5 "
                      style={{ backgroundColor: colorHex[selectedButton] }}
                    ></div>
                  </div>
                </div>
              </div>
              <Button
                variant="contained"
                className="w-[90%]"
                style={{
                  backgroundColor: "#14C61B",
                  color: "white",
                  fontSize: "1rem",
                  paddingTop: "3%",
                  paddingBottom: "3%",
                  fontFamily: "Poppins",
                  fontWeight: "bold",
                }}
                onClick={handleConfirmBet}
              >
                confirm
              </Button>
            </div>
            <LiveChat />
          </div>
        </div>
      </div>
    </>
  );
}

export default DesktopResponsive;
