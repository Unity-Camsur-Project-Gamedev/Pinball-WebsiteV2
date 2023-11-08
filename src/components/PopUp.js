import React, { useEffect, useState } from "react";
import newGame from "../assets/newGame.gif";

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

function PopUp() {
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    setShowImage(true);

    setTimeout(() => {
      setShowImage(false);
    }, 3000); // Set timeout for 3 seconds (3000 milliseconds)
  }, []);

  const handleShowImage = () => {
    setShowImage(true);

    setTimeout(() => {
      setShowImage(false);
    }, 3000); // Set timeout for 3 seconds (3000 milliseconds)
  };
  return (
    <>
      {showImage && (
        <img
          src={newGame}
          alt="Centered Image"
          className="mx-auto"
          style={canvasStyles}
        />
      )}
    </>
  );
}

export default PopUp;
