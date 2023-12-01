/* eslint-disable */
import React, { useEffect, useState } from "react";
import icon from "../assets/group.png";
import { io } from "socket.io-client";
import Cookies from "js-cookie";

const LiveStreamFrame = () => {
  const [userCount, setUserCount] = useState("");
  const userId = Cookies.get("username");

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

  return (
    <>
      <div className="absolute right-0 top-4 flex items-center">
        <div className="relative">
          <div className="absolute bg-gradient-to-r from-blue-400 to-purple-500 opacity-75 inset-0 rounded-l-md"></div>
          <div className="relative z-10 text-black border-2 bg-gray-50 rounded-l-md w-auto p-2 h-10 shadow-md flex items-center justify-center">
            <p className="font-bold text-lg mr-2">{userCount}</p>
            <img src={icon} alt="#" class="w-6 h-6" />
          </div>
        </div>
      </div>
      <iframe
        // We'll use the padding bottom technique to maintain 16:9 ratio
        className="absolute w-full h-full"
        allow="fullscreen"
        width="1280"
        height="720"
        src="https://demo.nanocosmos.de/nanoplayer/embed/1.3.3/nanoplayer.html?group.id=85cafc04-d52d-4bd1-970d-540dfd706832&options.adaption.rule=deviationOfMean2&startIndex=0&playback.latencyControlMode=classic"
      ></iframe>
    </>
  );
};

export default LiveStreamFrame;
