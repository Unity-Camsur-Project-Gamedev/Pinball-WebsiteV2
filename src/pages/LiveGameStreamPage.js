/* eslint-disable */
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import OBSWebSocket from "obs-websocket-js";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";

//API
import authService from "../services/auth/auth.service";

//redux
import { useDispatch, useSelector } from "react-redux";
import { setCredits, setUser, setBetHistory } from "../Slice/UserSlice";
import {
  setBetStatus,
  setGameHistory,
  setColorPercentage,
  setWinners,
} from "../Slice/BettingSlice";

import Confetti from "../components/Confetti ";
import websiteBg from "../assets/website-bg.png";
import newGame from "../assets/newGame.gif";
import pinballTime from "../assets/pinballTime.gif";
import BetHistory from "../layout/BetHistory";
import BetHistory2 from "../layout/BetHistory2";
import TopUpModal from "../layout/TopUpModal";
import DesktopResponsive2 from "../layout/DesktopResponsive2";
import MobileResponsive2 from "../layout/MobileResponsive2";
import { ModalProvider } from "../context/AddCreditsModalContext";
import { LiveStreamProvider } from "../context/LiveStreamContext";

const LiveGameStreamPage = () => {
  const userToken = Cookies.get("token");
  const dispatch = useDispatch();
  const betStatus = useSelector((state) => state.betting.betStatus);
  const userId = useSelector((state) => state.user.uid);
  const [clearBetsOnColor, setClearBetsOnColor] = useState(false);

  const [showContent, setShowContent] = useState(false);
  const [showContentClosed, setShowContentClosed] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [empty, setEmpty] = useState(false);

  const OBS_ADDRESS = "ws://127.0.0.1:4455";
  const obs = new OBSWebSocket();

  //DECODE TOKEN EVERY RENDER
  useEffect(() => {
    const decodedToken = jwtDecode(userToken);
    const { uid, username, email, number } = decodedToken;

    dispatch(
      setUser({
        uid,
        username,
        email,
        number,
      })
    );
  }, []);

  //CHECK USER SESSION
  useEffect(() => {
    const checkSession = async () => {
      const response = await authService.checkSession(userToken);
    };
    checkSession();
  }, []);

  // FETCH SOCKETS
  useEffect(() => {
    const BASE_URL = process.env.REACT_APP_BACKEND_URL;

    const socket = io(BASE_URL, { query: { userId } });

    socket.on("connect", () => {
      console.log("Socket connected!");
    });

    socket.on("walletUpdate", (data) => {
      setConfetti(false);
      dispatch(setCredits(data.balance));
    });

    socket.on("walletUpdateWin", (data) => {
      setTimeout(() => {
        dispatch(setCredits(data.balance));
        console.log(data);
        toast.success(`You win a total of ${data.winningAmount}! 🎉`);
      }, 2000);
      if (window.innerWidth > 768) {
        setConfetti(true);
      }
    });

    socket.on("bettingStatusUpdate", (data) => {
      dispatch(setBetStatus(data.status));

      setTimeout(() => {
        setShowContent(true);

        setTimeout(() => {
          setShowContent(false);
        }, 1500);
      }, 6000);

      setTimeout(() => {
        setShowContentClosed(true);

        setTimeout(() => {
          setShowContentClosed(false);
        }, 1500);
      }, 2500);

      localStorage.setItem("betStatus", data.status);
    });

    socket.on("bettingHistoryUpdate", (data) => {
      dispatch(setBetHistory(data.combinedDetails));
    });

    socket.on("clearBetCounts", () => {
      setClearBetsOnColor((prevClearBetsOnColor) => !prevClearBetsOnColor);
      localStorage.clear();
    });

    socket.on("historyUpdated", (data) => {
      dispatch(setGameHistory(data.resultData));
      dispatch(setColorPercentage(data.percentages));
    });

    socket.on("Winners:", (data) => {
      dispatch(setWinners(data.formattedWinners));
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
        await obs.connect(OBS_ADDRESS);
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
      <ModalProvider>
        <TopUpModal />
      </ModalProvider>

      <LiveStreamProvider clearBetsOnColor={clearBetsOnColor}>
        {/* BANNERS */}
        {betStatus === "Open" && showContent && (
          <div className="absolute inset-0 z-10 flex justify-center items-center bg-gray-400 bg-opacity-50 cursor-not-allowed h-[100%]">
            <img src={newGame} alt="#" className="mb-20"></img>
          </div>
        )}
        {betStatus === "Closed" && showContentClosed && (
          <div className="absolute inset-0 z-10 flex justify-center items-center bg-gray-400 bg-opacity-50 cursor-not-allowed h-[100%]">
            <img src={pinballTime} alt="#" className="mb-20"></img>
          </div>
        )}
        {/* DESKTOP UI */}
        <div className="hidden max-h-[150vh] xl:w-[90%] 2xl:w-[80%] lg:flex flex-col gap-10">
          {confetti && <Confetti />}
          <DesktopResponsive2 empty={empty} setEmpty={setEmpty} />
          <BetHistory2 />
        </div>
        {/* MOBILE UI */}
        <div className="lg:hidden flex flex-col gap-10  h-auto w-full pb-10">
          <MobileResponsive2 />
          <BetHistory2 />
        </div>
      </LiveStreamProvider>
    </div>
  );
};

export default LiveGameStreamPage;
