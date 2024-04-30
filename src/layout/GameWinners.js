import React, { useEffect } from "react";
import useLiveStream from "../context/LiveStreamContext";

//redux
import { useSelector } from "react-redux";

function GameWinners() {
  const winners = useSelector((state) => state.betting.winners);

  return (
    <>
      <p className="text-xl font-bold text-black font-['Poppins']">Winners:</p>
      <div className="w-full flex-1 flex flex-col items-start gap-4 overflow-y-auto ">
        {winners.slice(0, 10).map((winner, index) => (
          <div
            key={index}
            className="w-full flex justify-between items-center gap-5 text-sm "
          >
            <div className="flex justify-center items-center gap-2">
              <p
                className="font-semibold"
                style={
                  index === 0
                    ? {
                        backgroundColor: "#FFD700",
                        padding: "1px 7px",
                        borderRadius: "50px",
                        //   color: "white",
                      }
                    : index === 1
                    ? {
                        backgroundColor: "#C0C0C0",
                        padding: "1px 7px",
                        borderRadius: "50px",
                        //   color: "white",
                      }
                    : index === 2
                    ? {
                        backgroundColor: "#CD7F32",
                        padding: "1px 7px",
                        borderRadius: "50px",
                        //   color: "white",
                      }
                    : null
                }
              >
                {index < 3 ? index + 1 : null}
              </p>
              <p className="text-lg font-semibold">{winner.username}</p>
            </div>
            <p className="text-green-600">+{winner.amountWon}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default GameWinners;
