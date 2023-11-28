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

import ColorInputGrid from "./ColorInputGrid";
import useLiveStream from "../context/LiveStreamContext";

function MobileResponsive2({ betStatus, empty, setEmpty }) {
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
  const [userCount, setUserCount] = useState("");
  const userId = Cookies.get("username");
  const shouldBlink =
    betStatus === "Open" ? "animate-blink2 text-green-700" : "text-red-700";
  const Blink = betStatus === "Open" ? `border-pulse` : "";

  // FETCH SOCKETS
  useEffect(() => {
    // console.log('userId changed:', userId);
    const baseUrl = process.env.REACT_APP_BACKEND_URL;
    const socket = io(baseUrl, { query: { userId } });

    socket.on("connect", () => {
      console.log("Socket connected!");
    });

    socket.on("numberOfUsers", (data) => {
      // console.log("User's count", data)
      setUserCount(data);
    });
    return () => {
      socket.disconnect();
    };
  }, [userId]);

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
    <div className="lg:gap-0 h-auto w-full flex flex-col items-center head-div">
      <div className="head-div flex justify-center items-center py-4 w-full h-auto uppercase text-dynamicSmall font-semibold backdrop-blur-md bg-white/30">
        <div className="w-[85%] flex justify-center items-center">
          <div className="flex flex-2 items-center justify-between gap-2 ">
            <p className="w-full text-2xl font-bold font-[Poppins] uppercase">
              pinball game
            </p>
          </div>
        </div>
      </div>
      <div className="relative w-full pb-[56.25%]">
        <div class="absolute right-0 top-4 flex items-center">
          <div class="relative">
            <div class="absolute bg-gradient-to-r from-blue-400 to-purple-500 opacity-75 inset-0 rounded-l-md"></div>
            <div class="relative z-10 text-black border-2 bg-gray-50 rounded-l-md p-1 shadow-md flex items-center justify-center">
              <p class="font-bold text-md mr-2">{userCount}</p>
              <img src={icon} alt="#" class="w-4 h-4" />
            </div>
          </div>
        </div>
        <iframe
          //We'll use the padding bottom technique to maintain 16:9 ratio
          className=" absolute w-full h-full"
          allow="fullscreen"
          // width="1280"
          // height="720"
          src="https://demo.nanocosmos.de/nanoplayer/embed/1.3.3/nanoplayer.html?group.id=94396fd0-0e85-435e-8392-bbe3c8b7908e&options.adaption.rule=deviationOfMean2&startIndex=0&playback.latencyControlMode=classic"
        ></iframe>
      </div>
      <div className="head-div flex justify-center items-center py-4 w-full h-auto uppercase text-dynamicSmall font-semibold backdrop-blur-md bg-white/30 ">
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
      <div className="flex flex-col w-full py-5 items-center rounded-t-3xl backdrop-blur-md bg-white/50  relative ">
        <div className="card mt-1 absolute left-3 top-3 p-1 text-sm rounded-md">
          <p className={`font-bold uppercase ${shouldBlink}`}>
            {betStatus} BETTING
          </p>
          <div className="top"></div>
          <div className="bottom"></div>
          <div className="right"></div>
          <div className="left"></div>
        </div>
        <div className="pb-2">
          <ChatPlayToggle setToggle={setToggle} />
        </div>

        {toggle === "play" ? (
          <div className="flex flex-col-reverse gap-4 w-full px-4 py-2 ">
            <div className="uppercase text-dynamicSmall font-semibold flex flex-col items-center justify-center gap-3 relative">
              {/* BLOCKING OVERLAY WHEN BET STATUS BECOMES CLOSED. */}
              {betStatus === "Closed" && (
                <div className="absolute inset-0 z-10"></div>
              )}
              <p>enter bet amount:</p>
              <div className="flex items-center justify-center px-2 gap-2">
                <p
                  // onClick={() => handleRepeatBet()}
                  style={{
                    fontWeight: 100,
                    fontSize: ".75rem",
                    fontWeight: "bold",
                    fontFamily: "Poppins",
                  }}
                >
                  repeat
                </p>
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

            <div
              className={`uppercase text-dynamicSmall font-semibold flex flex-col items-center justify-center gap-3 relative p-4 bg-gray-50 rounded-lg ${Blink}`}
            >
              {/* Your content */}
              <p>select a color:</p>
              {/* BLOCKING OVERLAY WHEN BET STATUS BECOMES CLOSED. */}
              {betStatus === "Closed" && (
                <div className="absolute inset-0 z-10"></div>
              )}
              <ColorInputGrid
                selectedButton={selectedButton}
                colorHex={colorHex}
                handleBetOnColor={handleBetOnColor}
              />
            </div>
          </div>
        ) : (
          <div className="h-[61vh] w-full py-2 px-4 rounded-lg">
            <LiveChat />
          </div>
        )}
      </div>
    </div>
  );
}

export default MobileResponsive2;
