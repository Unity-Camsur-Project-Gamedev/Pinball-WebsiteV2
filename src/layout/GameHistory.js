import React, { useEffect, useState, useRef } from "react";
import useLiveStream from "../context/LiveStreamContext";

function GameHistory() {
  const { colorHex, colorName, history } = useLiveStream();
  const [displayedHistory, setDisplayedHistory] = useState([]);
  const messagesListRef = useRef(null);

  //Fetch color history
  useEffect(() => {
    const updatedHistory = history.map((item) => {
      const colorIndex = colorName.indexOf(item);
      if (colorIndex !== -1) {
        return {
          colorName: item,
          colorHex: colorHex[colorIndex],
        };
      }
      return {
        colorName: item,
        colorHex: "No matching color",
      };
    });
    setDisplayedHistory(updatedHistory);
  }, [history, colorName, colorHex]);

  //Group same colors
  const groupConsecutiveColors = (historyItems) => {
    const groupedColors = [];
    let currentGroup = [];
    for (let i = 0; i < historyItems.length; i++) {
      if (
        i === 0 ||
        historyItems[i].colorName === historyItems[i - 1].colorName
      ) {
        currentGroup.push(historyItems[i]);
      } else {
        if (currentGroup.length > 6) {
          groupedColors.push(currentGroup.slice(0, 6));
          currentGroup = currentGroup.slice(6);
        }
        groupedColors.push(currentGroup);
        currentGroup = [historyItems[i]];
      }
    }
    if (currentGroup.length > 6) {
      groupedColors.push(currentGroup.slice(0, 6));
      currentGroup = currentGroup.slice(6);
    }
    if (currentGroup.length > 0) {
      groupedColors.push(currentGroup);
    }
    return groupedColors;
  };

  const groupedColors = groupConsecutiveColors(displayedHistory);

  useEffect(() => {
    // Scroll to the left list when it updates
    if (messagesListRef.current) {
      messagesListRef.current.scrollLeft = messagesListRef.current.scrollWidth;
    }
  }, [groupedColors]);

  // useEffect(() => {
  //   console.log("history:", history);
  // }, [history]);

  return (
    <>
      <p className="text-xl font-bold text-black font-['Poppins']">
        Game History:
      </p>
      <div
        className=" w-full h-full grid grid-flow-col gap-2 overflow-x-auto px-2 custom-scrollbar"
        ref={messagesListRef}
      >
        <>
          {groupedColors
            .slice()
            .reverse()
            .map((group, index) => (
              <div
                key={index}
                className="grid grid-rows-4 grid-flow-col gap-2 "
              >
                {group.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: item.colorHex,
                      border:
                        index === groupedColors.length - 1 &&
                        idx === group.length - 1
                          ? "3px solid white"
                          : "none",
                      boxShadow: "-4px 4px 4px 0px rgba(0,0,0,0.5)",
                    }}
                    className="rounded-md w-[10vw] h-[5vh] lg:w-[2vw] lg:h-[4vh]"
                  ></div>
                ))}
              </div>
            ))}
        </>
      </div>
    </>
  );
}

export default GameHistory;
