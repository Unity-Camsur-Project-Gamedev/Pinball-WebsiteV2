import React, { useState, useEffect } from "react";

import { io } from "socket.io-client";
import Cookies from "js-cookie";

function LiveChat() {
  //chat states
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);

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

  return (
    <>
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
          <button type="submit" className="text-cyan-600 font-semibold">
            Send
          </button>
        </form>
      </div>
    </>
  );
}

export default LiveChat;
