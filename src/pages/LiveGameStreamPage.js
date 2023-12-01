/* eslint-disable */
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import OBSWebSocket from "obs-websocket-js";
import { io } from "socket.io-client";
// import jwt from 'jsonwebtoken';
import Confetti from "../components/Confetti ";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import websiteBg from "../assets/website-bg.png";
import newGame from "../assets/NEWGAME.gif"
import pinball from "../assets/PINBALL.gif"

//LAYOUTS FOLDER
import BetHistory from "../layout/BetHistory";

//SERVICES API FOLDER
import TopUpModal from "../layout/TopUpModal";
import DesktopResponsive2 from "../layout/DesktopResponsive2";
import MobileResponsive2 from "../layout/MobileResponsive2";

//CONTEXT
import { ModalProvider } from "../context/AddCreditsModalContext";
import { LiveStreamProvider } from "../context/LiveStreamContext";

const LiveGameStreamPage = ({ userToken }) => {
  const [isOpen, setIsOpen] = useState(false); //modal state*
  const [userId, setUserId] = useState(""); //user id state*
  const [rows, setRows] = useState([]);
  const [totalCredits, setTotalCredits] = useState(0); //total credits amount*
  localStorage.setItem("totalCredits", totalCredits);
  const [currentProgramScene, setCurrentProgramScene] = useState(); //*
  const [confetti, setConfetti] = useState(false);
  const [betStatus, setBetStatus] = useState("");
  const [empty, setEmpty] = useState(true);
  const [clearBetsOnColor, setClearBetsOnColor] = useState(false);
  const [history, setHistory] = useState([]);
  const [percentages, setPercentages] = useState([]);
  const [winnersArray, setWinnersArray] = useState([]);

  const obsAddress = "ws://127.0.0.1:4455";
  const obs = new OBSWebSocket();
  const [showContent, setShowContent] = useState(false);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowContent(false); 
  //   }, 2000); 

  //   return () => clearTimeout(timer); 
  // }, []);

  //USER LOGIN CREDENTIAL
  useEffect(() => {
    const baseUrl = process.env.REACT_APP_BACKEND_URL;
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };
    axios
      .get(`${baseUrl}/user/check/session`, { headers })
      .then((response) => {
        if (response.status === 200) {
          setUserId(response.data.userSessionDets.user_id);
        } else {
          console.log("User session is not active.");
        }
      })
      .catch((error) => {
        console.error("Error checking user session:", error);
        console.log("Error checking user session.");
      });
  }, []);

  // BET STATUS CLEANER
  useEffect(() => {
    console.log("BetStatus: ", clearBetsOnColor);
  }, [clearBetsOnColor]);

  // FETCH SOCKETS
  useEffect(() => {
    // console.log('userId changed:', userId);
    const baseUrl = process.env.REACT_APP_BACKEND_URL;
    const socket = io(baseUrl, { query: { userId } });

    socket.on("connect", () => {
      console.log("Socket connected!");
    });

    socket.on("walletUpdate", (data) => {
      // console.log("Received wallet update:", data.balance);
      setConfetti(false);
      setTotalCredits(data.balance);
    });

    socket.on("walletUpdateWin", (data) => {
      console.log("UpdatedWalletBalance:", data);
      console.log(data);
      setTimeout(() => {
        setTotalCredits(data.balance);
        toast.success(`You win a total of ${data.winningAmount}! 🎉`);
      }, 2000);
      if (window.innerWidth > 768) {
        setConfetti(true);
      }
    });

    socket.on("bettingStatusUpdate", (data) => {
      setBetStatus(data.status);
      setTimeout(() => {
        setEmpty(true);

      }, 3000);
      setShowContent(true);
      localStorage.setItem("betStatus", data.status);
      setTimeout(() => {
        setShowContent(false);
      }, 1500);
    });

    socket.on("bettingHistoryUpdate", (data) => {
      setRows(data.combinedDetails);
    });

    socket.on("clearBetCounts", () => {
      setClearBetsOnColor((prevClearBetsOnColor) => !prevClearBetsOnColor);
      localStorage.clear();
    });

    socket.on("historyUpdated", (data) => {
      setHistory(data.resultData);
      setPercentages(data.percentages);
    });

    socket.on("Winners:", (data) => {
      setWinnersArray(data.formattedWinners);
      // console.log("Winners:", data.formattedWinners);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  //INITIALIZE OBS CONNECTION
  useEffect(() => {
    (async () => {
      try {
        //OBS websocket connection
        await obs.connect(obsAddress);
        console.log(`Connected to OBS`);

        //Scene change listener
        obs.on("CurrentProgramSceneChanged", onCurrentSceneChanged);
      } catch (error) {
        console.error("Failed to connect", error.code, error.message);
      }
    })();
  }, []);

  return (
    <div
      className="h-screen flex flex-col gap-10 items-center bg-scroll overflow-y-auto relative"
      style={{
        backgroundImage: `url(${websiteBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >

      <ModalProvider
        userToken={userToken}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <TopUpModal />
      </ModalProvider>

      <LiveStreamProvider
        userToken={userToken}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        totalCredits={totalCredits}
        clearBetsOnColor={clearBetsOnColor}
        history={history}
        percentages={percentages}
        winnersArray={winnersArray}
      >
        {betStatus === "Open" && showContent && (
          <div className="absolute inset-0 z-10 flex justify-center items-center bg-gray-400 bg-opacity-50 cursor-not-allowed h-[100%]">
            <img src={newGame} alt="#" className="mb-20"></img>
          </div>
        )}
        {betStatus === "Closed" && showContent && (
          <div className="absolute inset-0 z-10 flex justify-center items-center bg-gray-400 bg-opacity-50 cursor-not-allowed h-[100%]">
            <img src={pinball} alt="#" className="mb-20"></img>
          </div>
        )}
        <div className="hidden max-h-[150vh] xl:w-[90%] 2xl:w-[80%] lg:flex flex-col gap-10">
          {confetti && <Confetti />}
          <DesktopResponsive2
            betStatus={betStatus}
            empty={empty}
            setEmpty={setEmpty}
          />
          <BetHistory userToken={userToken} rows={rows} />
        </div>
        <div className="lg:hidden flex flex-col gap-10  h-auto w-full pb-10">
          <MobileResponsive2 betStatus={betStatus} />
          <BetHistory userToken={userToken} rows={rows} />
        </div>
      </LiveStreamProvider>
    </div>
  );
};

export default LiveGameStreamPage;
