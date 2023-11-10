/* eslint-disable */
import React, { useState, useEffect } from "react";
import { StreamChat } from 'stream-chat';
import { Chat, Channel, Window, ChannelHeader, MessageList, MessageInput, Thread } from 'stream-chat-react';
import { io } from 'socket.io-client';

import { Alert, Button, ButtonGroup, IconButton } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

import ColorInputs from "./ColorInputs";
import NumberInput from "./NumberInput";
import LiveStreamFrame from "./LiveStreamFrame";
import useLiveStream from "../context/LiveStreamContext";
import Confetti from "../components/Confetti ";
import PopUp from "../components/PopUp";
import { getGameID } from "../services/getGameId"
import Cookies from "js-cookie";


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
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [currentGameID, setCurrentGameID] = useState("");

  const baseURL = process.env.REACT_APP_BACKEND_URL

  const userId = Cookies.get('username')


  useEffect(() => {
    // Connect to the Socket.IO server
    const baseURL = process.env.REACT_APP_BACKEND_URL;
    const newSocket = io(baseURL, { query: { userId } });

    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      // Listen for 'chatMessage' events from the server
      socket.on('chatMessage', ({ userId, message }) => {
        console.log('Received chat message from user', userId, ':', message);
        setMessages((prevMessages) => [...prevMessages, { userId, message }]);
      });
    }

    // Clean up the socket listener when the component unmounts
    return () => {
      if (socket) {
        socket.off('chatMessage');
      }
    };
  }, [socket]); // Make sure to include socket in the dependency array

  const sendMessage = (e) => {
    e.preventDefault();
    if (socket && newMessage && userId) {
      // Emit 'chatMessage' event to the server with userId and newMessage
      socket.emit('chatMessage', { userId, message: newMessage });
      setNewMessage('');
    }
  };
  // console.log(messages)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gameIDData = await getGameID();
        setCurrentGameID(gameIDData.game_id);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 10000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);


  return (
    <div className="hidden h-screen w-dynamicBorder lg:flex flex-col items-center border-2 border-blue-600">
      <div className="absolute z-10 flex flex-col justify-center items-center border-2 border-red-600">
        <p className="font-[Poppins] font-bold text-3xl p-2">Game Id {currentGameID} </p>
        <div className="flex gap-2">
          {/* <Button variant="contained" onClick={() => setConfetti(true)}>
            Confetti
          </Button>
          <Button variant="contained" onClick={() => setPopUp(true)}>
            Pop Up
          </Button> */}
        </div>
      </div>

      {confetti && <Confetti />}
      {popUp && <PopUp />}

      <LiveStreamFrame />
      <div className="flex-1 flex flex-col w-full h-auto ">
        <ColorInputs
          selectedButton={selectedButton}
          colorHex={colorHex}
          handleBetOnColor={handleBetOnColor}
        />
        <div className=" flex-1 grid grid-cols-3">
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

          <div className="bet-info  flex flex-col gap-2 items-center justify-center uppercase font-extrabold">
            <div className=" w-[90%] text-dynamicLarge ">
              <div className=" flex flex-col items-center gap-4 ">
                <div className="relative flex items-center justify-between w-4/5 ">
                  <div className="absolute right-0">
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
                  <p className="font-['Poppins']">credits: </p>
                  <div className="flex items-center  text-[#E26226] font-['Poppins'] w-1/2">
                    {totalCredits !== 0
                      ? `₱ ${parseFloat(totalCredits).toLocaleString()}.00`
                      : "0.00"}
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
                    // onKeyDown={handleKeyDown}
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
              {/* <div className="flex flex-col gap-4 border-2 border-blue-600">
                                    <div className="text-[#E26226] font-['Poppins']">
                                        {totalCredits !== 0
                                            ? `₱ ${parseFloat(totalCredits).toLocaleString()}.00`
                                            : '0.00'}
                                    </div>
                                    <div className="text-[#E26226] font-['Poppins']">
                                        <input
                                            type="text"
                                            value={
                                                betAmount !== '' ? `₱ ${parseFloat(betAmount).toLocaleString()}` : '₱ 0'
                                            }
                                            className="text-dynamicLarge w-full mx-auto text-[#E26226] border-2"
                                            onChange={handleInputChange}
                                            // onKeyDown={handleKeyDown}
                                        ></input>
                                    </div>
                                    <div
                                        className="w-full h-5 "
                                        style={{ backgroundColor: colorHex[selectedButton] }}
                                    ></div>
                                </div> */}
            </div>
            <Button
              variant="contained"
              className="w-[90%]"
              style={{
                backgroundColor: "#14C61B",
                color: "white",
                // border: '2px solid magenta',
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
            {/* <div className="bg-[#14C61B] w-[90%] py-2 text-lg text-center font-semibold">confirm</div> */}
          </div>
          {/* Live Chat here */}
          <div className="chat-feed border-2 border-black p-2 bg-gray-200">
            <ul className="h-5/6 overflow-y-auto">
              {messages.map((message, index) => (
                <li key={index} className="mb-2 p-2 bg-white w-fit rounded-md">
                  <strong>{message.userId}: </strong> {message.message.message}
                </li>
              ))}
            </ul>
            <form onSubmit={sendMessage} className="bg-white rounded-md">
              <input
                type="text"
                className="w-5/6 decoration-transparent mr-2 h-full border-none p-2 rounded-md"
                placeholder="Input Your Comment Here"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button type="submit" className="text-cyan-600 font-semibold">Send</button>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default DesktopResponsive;
