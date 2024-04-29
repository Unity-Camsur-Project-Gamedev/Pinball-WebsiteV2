import React, { useState } from "react";
import { useEffect } from "react";
import { getColorPercentage } from "../services/getColorPercentage";
import useLiveStream from "../context/LiveStreamContext";

//redux
import { useSelector } from "react-redux";

function HotCold() {
  const colorHex = useSelector((state) => state.button.colorHex);
  const colorName = useSelector((state) => state.button.colorName);
  const colorPercentage = useSelector((state) => state.betting.colorPercentage);

  const [count, setCount] = useState(false);
  const [colorNameHex, setColorNameHex] = useState([]);
  const [sortedColorPercentage, setSortedColorPercentage] = useState([]);

  useEffect(() => {
    const colors = colorName.map((name, index) => ({
      name,
      hex: colorHex[index],
    }));
    setColorNameHex(colors);

    const sortedPercentages = [...colorPercentage].sort(
      (a, b) => b.percentage - a.percentage
    );
    setSortedColorPercentage(sortedPercentages);
  }, [colorPercentage]);

  return (
    <>
      <p className="text-xl font-bold text-black font-['Poppins']">Hot:</p>
      <div className="flex flex-wrap gap-2">
        {sortedColorPercentage.slice(0, 3).map((colorObject, key) => {
          // Find the corresponding hex value for the color name
          const colorHex = colorNameHex.find(
            (c) => c.name === colorObject.result
          )?.hex;

          return (
            <div
              key={key}
              className="w-[10vw] h-[5vh] lg:w-[3vw] lg:h-[4.5vh] rounded-md flex justify-center items-center cursor-pointer hover:scale-110 transition ease-in-out"
              style={{
                backgroundColor: colorHex,
                boxShadow: "-3px 4px 2px 0px rgba(0,0,0,0.4)",
              }}
              onClick={() => setCount(!count)}
            >
              <p className="text-xs font-bold font-['Poppins']">
                {!count
                  ? colorObject.occurrences
                  : colorObject.percentage.toFixed(1) + "%"}
              </p>
            </div>
          );
        })}
      </div>
      <p className="text-xl font-bold text-black font-['Poppins']">Cold:</p>
      <div className="flex flex-wrap gap-2">
        {sortedColorPercentage.slice(3).map((colorObject, key) => {
          // Find the corresponding hex value for the color name
          const colorHex = colorNameHex.find(
            (c) => c.name === colorObject.result
          )?.hex;

          return (
            <div
              key={key}
              className="w-[10vw] h-[5vh] lg:w-[3vw] lg:h-[4.5vh] rounded-md flex justify-center items-center cursor-pointer hover:scale-110 transition ease-in-out"
              style={{
                backgroundColor: colorHex,
                boxShadow: "-3px 4px 2px 0px rgba(0,0,0,0.4)",
              }}
              onClick={() => setCount(!count)}
            >
              <p className="text-xs font-bold font-['Poppins']">
                {!count
                  ? colorObject.occurrences
                  : colorObject.percentage.toFixed(1) + "%"}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default HotCold;
