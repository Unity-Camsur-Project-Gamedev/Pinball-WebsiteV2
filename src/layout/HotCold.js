import React, { useState } from "react";
import { useEffect } from "react";
import { getColorPercentage } from "../services/getColorPercentage";
import useLiveStream from "../context/LiveStreamContext";

function HotCold() {
  const { colorHex, colorName } = useLiveStream();
  const [donutColor, setDonutColor] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const { mostPopularColor, maxCount, colorCount } =
          await getColorPercentage();

        // Array of objects combining count and hex values
        const combinedArray = Object.values(colorCount).map((count, index) => ({
          count,
          hex: colorHex[index],
        }));

        const sortedArray = combinedArray.sort((a, b) => b.count - a.count);

        setDonutColor(sortedArray);
      } catch (error) {
        console.error("Error:", error.message);
        window.alert("An error occurred. Please try again later.");
      }
    };

    getData();
  }, []);

  //   useEffect(() => {
  //     console.log(donutColor);
  //   }, [donutColor]);

  return (
    <>
      <p className="text-xl font-bold text-black font-['Poppins']">Hot:</p>
      <div className="flex flex-wrap gap-2">
        {donutColor.slice(0, 3).map((colorObject, key) => {
          const percentage =
            (colorObject.count /
              donutColor.reduce((acc, val) => acc + val.count, 0)) *
            100;

          return (
            <div
              key={key}
              className="w-[3vw] h-[4.5vh] rounded-md flex justify-center items-center"
              style={{
                backgroundColor: colorObject.hex,
                boxShadow: "-3px 4px 2px 0px rgba(0,0,0,0.4)",
              }}
            >
              <p className="text-xs font-bold font-['Poppins']">
                {percentage.toFixed(1)}%
              </p>
            </div>
          );
        })}
      </div>
      <p className="text-xl font-bold text-black font-['Poppins']">Cold:</p>
      <div className="flex flex-wrap gap-2">
        {donutColor.slice(3).map((colorObject, key) => {
          const percentage =
            (colorObject.count /
              donutColor.reduce((acc, val) => acc + val.count, 0)) *
            100;

          return (
            <div
              key={key}
              className="w-[3vw] h-[4.5vh] rounded-md flex justify-center items-center"
              style={{
                backgroundColor: colorObject.hex,
                boxShadow: "-3px 4px 2px 0px rgba(0,0,0,0.4)",
              }}
            >
              <p className="text-xs font-bold font-['Poppins']">
                {percentage.toFixed(1)}%
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default HotCold;
