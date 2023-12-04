import React from "react";
import useLiveStream from "../context/LiveStreamContext";
import NumberInputGrid from "./NumberInputGrid";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import BetSlider from "./BetSlider";
import EmbossedButton from "./EmbossedButton";

function NumberAndSlider() {
  const { betButtons, handleInputButtonClick, handleMaxButton } =
    useLiveStream();

  return (
    <>
      <div className="grid grid-cols-3 gap-2 w-full text-center ">
        {betButtons.map((button, key) => (
          <div key={key}>
            <NumberInputGrid
              button={button}
              handlerFunction={() => handleInputButtonClick(button)}
            />
          </div>
        ))}
        <EmbossedButton
          handlerFunction={handleMaxButton}
          btnName={"max"}
          fontColor={"white"}
          btnColor={"#ee3231"}
          pressedColor={"#ec1313"}
        />
      </div>
      <div className="flex-1 flex justify-center items-center w-full ">
        <div className=" w-full flex gap-7 justify-between items-center">
          <BetSlider />
        </div>
      </div>
    </>
  );
}

export default NumberAndSlider;
