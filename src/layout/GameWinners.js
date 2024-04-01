import React, { useEffect } from "react";
import useLiveStream from "../context/LiveStreamContext";

function GameWinners() {
  const { winnersArray } = useLiveStream();
  const winners = [
    { username: "Josh Mojica", amountWon: 752 },
    { username: "Alice Johnson", amountWon: 421 },
    { username: "Bob Smith", amountWon: 593 },
    { username: "Emma Davis", amountWon: 168 },
    { username: "John Doe", amountWon: 899 },
    { username: "Josh Mojica", amountWon: 315 },
    { username: "Alice Johnson", amountWon: 725 },
    { username: "Bob Smith", amountWon: 482 },
    { username: "Emma Davis", amountWon: 638 },
    { username: "John Doe", amountWon: 244 },
    { username: "Josh Mojica", amountWon: 507 },
    { username: "Alice Johnson", amountWon: 913 },
    { username: "Bob Smith", amountWon: 761 },
    { username: "Emma Davis", amountWon: 128 },
    { username: "John Doe", amountWon: 379 },
  ];

  useEffect(() => {
    // console.log("winnersArray:", winnersArray);
  }, [winnersArray]);

  return (
    <>
      <p className="text-xl font-bold text-black font-['Poppins']">Winners:</p>
      <div className="w-full h-[45vh] flex flex-col items-start gap-4 overflow-y-auto ">
        {winnersArray.slice(0, 10).map((winner, index) => (
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
