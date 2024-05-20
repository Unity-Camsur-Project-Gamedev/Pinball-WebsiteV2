import React, { useEffect, useState } from "react";
import pokerChip from "../assets/pokerChip.png";

//redux
import { useSelector, useDispatch } from "react-redux";
import { setMultiplier } from "../Slice/BettingSlice";

function MultiplierButton({ button }) {
  const dispatch = useDispatch();
  const multiplier = useSelector((state) => state.betting.multiplier);

  const buttonClassName = `relative py-2 rounded-full select-none cursor-pointer ${
    multiplier === button ? "shadow-pressed" : "shadow-chipUnpressed"
  } `;

  return (
    <>
      <div
        className={buttonClassName}
        style={{
          backgroundColor: "#ffffff", // Default white background color
        }}
        onClick={() => {
          dispatch(setMultiplier(button));
        }}
      >
        <div
          className={`absolute p-1 rounded-full top-[40%] left-[15%] hidden xl:block ${
            multiplier === button
              ? "bg-green-500 transition translate-x-[3px] translate-y-[3px]"
              : ""
          }`}
          style={{
            boxShadow: `${
              multiplier === button
                ? ""
                : "0px 0px 15px 2px rgba(0,0,0,0.2) inset"
            }`,
          }}
        ></div>
        <p
          className={`text-dynamicSmall font-semibold  ${
            multiplier === button
              ? "text-green-500 transition translate-x-[3px] translate-y-[3px]"
              : ""
          }`}
        >
          {button}X
        </p>
      </div>
    </>
  );
}

export default MultiplierButton;
