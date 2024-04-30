import React, { useState } from "react";
import pokerChip from "../assets/pokerChip.png";

//redux
import { useSelector } from "react-redux";

function EmbossedColorMobile({ index, incrementingBets }) {
  const colorHex = useSelector((state) => state.button.colorHex);
  const [isPressed, setIsPressed] = useState(false);

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
        className={`h-12 w-full ${
          isPressed ? "shadow-pressed" : "shadow-unpressed"
        } rounded-md`}
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
                className={`text-black font-semibold text-['Poppins']${
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
              className="absolute w-[45%] shadow-unpressed p-1 rounded-full"
            />
          </div>
        )}
      </div>
    </>
  );
}

export default EmbossedColorMobile;
