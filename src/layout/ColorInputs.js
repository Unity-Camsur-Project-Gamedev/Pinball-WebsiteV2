/* eslint-disable */
import React, { useState, useEffect } from "react";
import { getBetHistory } from "../services/getBetHistory";
import EmbossedColor from "../components/EmbossedColor";
import useLiveStream from "../context/LiveStreamContext";

//redux
import { useSelector } from "react-redux";

const ColorInputs = () => {
  const { handleBetOnColor } = useLiveStream();
  const initialBet = useSelector((state) => state.betting.initialBet);
  const confirmedBet = useSelector((state) => state.betting.confirmedBet);

  //formatted versions
  const [incrementingBets, setIncrementingBets] = useState([]);
  const [formattedConfirmed, setFormattedConfirmed] = useState([]);

  //This will eliminate duplicated initialbets and will sum it
  useEffect(() => {
    const totalAmounts = initialBet.reduce((acc, bet) => {
      const { colorIndex, amount } = bet;
      if (!acc[colorIndex]) {
        acc[colorIndex] = { colorIndex, amount: 0 };
      }
      acc[colorIndex].amount += amount;
      return acc;
    }, {});

    const result = Object.values(totalAmounts);

    setIncrementingBets(result);
  }, [initialBet]);

  //This will eliminate duplicated confirmedbets and will sum it
  useEffect(() => {
    const totalAmounts = confirmedBet.reduce((acc, bet) => {
      const { colorIndex, amount } = bet;
      if (!acc[colorIndex]) {
        acc[colorIndex] = { colorIndex, amount: 0 };
      }
      acc[colorIndex].amount += amount;
      return acc;
    }, {});

    const result = Object.values(totalAmounts);

    setFormattedConfirmed(result);
  }, [confirmedBet]);

  const renderColorInputs = () => {
    return Array.from({ length: 9 }, (_, index) => (
      <div
        onClick={() => {
          handleBetOnColor(index);
        }}
        key={index}
        data-colorIndex={index}
      >
        <EmbossedColor
          index={index}
          incrementingBets={
            initialBet.length > 0 ? incrementingBets : formattedConfirmed
          }
        />
      </div>
    ));
  };

  return (
    <div className="grid grid-cols-9 h-full border-2 cursor-pointer">
      {renderColorInputs()}
    </div>
  );
};

export default ColorInputs;
