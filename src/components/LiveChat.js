import React, { useState, useEffect, useRef } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { io } from "socket.io-client";
import Cookies from "js-cookie";

function LiveChat() {
  //chat states
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const messagesListRef = useRef(null);

  const userId = Cookies.get("username");

  //chat hook
  useEffect(() => {
    // Connect to the Socket.IO server
    const baseURL = process.env.REACT_APP_BACKEND_URL;
    const newSocket = io(baseURL, { query: { userId } });

    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  //chat hook
  useEffect(() => {
    if (socket) {
      // Listen for 'chatMessage' events from the server
      socket.on("chatMessage", ({ userId, message }) => {
        console.log("Received chat message from user", userId, ":", message);
        setMessages((prevMessages) => [...prevMessages, { userId, message }]);
      });
    }

    // Clean up the socket listener when the component unmounts
    return () => {
      if (socket) {
        socket.off("chatMessage");
      }
    };
  }, [socket]); // Make sure to include socket in the dependency array

  //chat function
  const sendMessage = (e) => {
    e.preventDefault();
    if (socket && newMessage && userId) {
      // Emit 'chatMessage' event to the server with userId and newMessage
      socket.emit("chatMessage", { userId, message: newMessage });
      setNewMessage("");
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the messages list when it updates
    if (messagesListRef.current) {
      messagesListRef.current.scrollTop = messagesListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <div className="h-full chat-feed flex flex-col gap-2 border-2 border-black py-2 px-2 bg-[#0d4fa3]">
        <ul
          className="h-[160px] 2xl:h-[210px] w-full overflow-y-auto border-2 border-red-600"
          ref={messagesListRef}
        >
          {messages.map((message, index) => (
            <li key={index} className=" p-2  w-fit rounded-md break-words">
              <p>
                <AccountCircleIcon style={{ color: "white" }} />
                <strong className="ml-1 text-white font-semibold">
                  {message.userId}:{" "}
                </strong>{" "}
                <span className="text-white">{message.message.message}</span>
              </p>
            </li>
          ))}
        </ul>
        <form
          onSubmit={sendMessage}
          className="bg-white rounded-md border-2 border-green-600"
        >
          <input
            type="text"
            className="w-5/6 decoration-transparent mr-2 h-full border-none p-2 rounded-md"
            placeholder="Write a comment..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="submit" className="text-cyan-600 font-semibold">
            Send
          </button>
        </form>
      </div>
    </>
  );
}

export default LiveChat;
