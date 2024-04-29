import React, { useEffect, useState } from "react";
import pokerChip from "../assets/pokerChip.png";
import Coin from "../assets/coin.png";
import useLiveStream from "../context/LiveStreamContext";

//redux
import { useSelector } from "react-redux";

function EmbossedColor({ index, incrementingBets }) {
  const { clearBetsOnColor } = useLiveStream();
  const colorHex = useSelector((state) => state.button.colorHex);
  const [isPressed, setIsPressed] = useState(false);
  const [animate, setAnimate] = useState(false);

  const buttonClassName = `flex gap-1 font-['Poppins'] justify-center items-center h-full w-full hover:-translate-y-1 duration-100 transition ease-in-out rounded-md relative ${
    isPressed ? "shadow-pressed" : "shadow-unpressed"
  } ${animate ? "button-animation" : ""}`;

  // handle buttons ripple effect when reset
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimate(true);
    }, index * 200);

    const clearAnimateTimeout = setTimeout(() => {
      setAnimate(false);
    }, 5000);

    // Clean up function to clear the timeouts
    return () => {
      clearTimeout(timeout);
      clearTimeout(clearAnimateTimeout);
    };
  }, [clearBetsOnColor, index]);

  //handle button press animation
  const handlePress = () => {
    setIsPressed(true);
    setTimeout(() => {
      setIsPressed(false);
    }, 100);
  };

  return (
    <>
      <div
        variant="contained"
        className={buttonClassName}
        style={{
          backgroundColor: colorHex[index],
        }}
        onClick={() => {
          handlePress();
        }}
      >
        {incrementingBets.find((bet) => bet.colorIndex === index) && (
          <div className="flex flex-col justify-center items-center gap-1 relative w-full h-full">
            <div className="rounded-full p-1 z-10 ">
              <p
                className={`text-black font-bold ${
                  incrementingBets
                    .find((bet) => bet.colorIndex === index)
                    ?.amount.toString().length >= 4
                    ? "text-sm"
                    : "text-xl"
                }`}
                style={{
                  textShadow:
                    "-1px -1px rgba(0,0,0,0.1), 1px 1px rgba(255,255,255,0.5)",
                }}
              >
                {
                  incrementingBets.find((bet) => bet.colorIndex === index)
                    .amount
                }
              </p>
            </div>
            <img
              src={pokerChip}
              className="absolute w-[40%] shadow-unpressed p-1 rounded-full"
            />
          </div>
        )}
      </div>
    </>
  );
}

export default EmbossedColor;
