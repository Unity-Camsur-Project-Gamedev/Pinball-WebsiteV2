import React from "react";

function GameWinners() {
  const winners = [
    { name: "Josh Mojica", amount: 752 },
    { name: "Alice Johnson", amount: 421 },
    { name: "Bob Smith", amount: 593 },
    { name: "Emma Davis", amount: 168 },
    { name: "John Doe", amount: 899 },
    { name: "Josh Mojica", amount: 315 },
    { name: "Alice Johnson", amount: 725 },
    { name: "Bob Smith", amount: 482 },
    { name: "Emma Davis", amount: 638 },
    { name: "John Doe", amount: 244 },
    { name: "Josh Mojica", amount: 507 },
    { name: "Alice Johnson", amount: 913 },
    { name: "Bob Smith", amount: 761 },
    { name: "Emma Davis", amount: 128 },
    { name: "John Doe", amount: 379 },
  ];
  return (
    <>
      <p className="text-xl font-bold text-black font-['Poppins']">Winners:</p>
      <div className="w-full h-[45vh] flex flex-col items-start gap-4 overflow-y-auto ">
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
              <p className="text-lg font-semibold">{winner.name}</p>
            </div>
            <p className="text-green-600">+{winner.amount}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default GameWinners;
