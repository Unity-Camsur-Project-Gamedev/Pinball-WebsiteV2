import React from "react";
import useLiveStream from "../context/LiveStreamContext";
import NumberInputGrid from "./NumberInputGrid";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import BetSlider from "./BetSlider";

function NumberAndSlider() {
  const { betButtons, handleInputButtonClick, totalCredits } = useLiveStream();

  //   const hundreds = totalCredits < 1000;
  //   const thousand = totalCredits < 10000;
  //   const tenThousand = totalCredits < 100000;
  //   const hundredThousand = totalCredits < 1000000;

  return (
    <>
      <div className="grid grid-cols-3 gap-2 w-full text-center">
        {betButtons.map((button, key) => (
          <div key={key}>
            <NumberInputGrid
              button={button}
              handlerFunction={() => handleInputButtonClick(button)}
            />
          </div>
        ))}
        <div className="flex gap-2 items-center justify-center ">
          <AddCircleIcon
            style={{ color: "white", fontSize: "3rem" }}
            className="shadow-chipUnpressed rounded-full"
          />
          <RemoveCircleIcon
            style={{ color: "white", fontSize: "3rem" }}
            className="shadow-chipUnpressed rounded-full"
          />
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center w-full px-5 border-2 border-red-600">
        <div className="border-2 border-black w-full">
          {/* <BetSlider /> */}
        </div>
      </div>
    </>
  );
}

export default NumberAndSlider;
