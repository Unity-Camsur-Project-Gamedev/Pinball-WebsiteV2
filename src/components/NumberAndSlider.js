import React from "react";
import useLiveStream from "../context/LiveStreamContext";
import NumberInputGrid from "./NumberInputGrid";
import MultiplierButton from "./MultiplierButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import BetSlider from "./BetSlider";
import EmbossedButton from "./EmbossedButton";

//redux
import { useSelector } from "react-redux";

function NumberAndSlider() {
  const { handleInputButtonClick, handleMaxButton } = useLiveStream();

  // const betButtons = ["5", "10", "20", "50", "100"];
  const betButtons = useSelector((state) => state.button.betButtons);
  const multiplierButtons = useSelector(
    (state) => state.button.multiplierButtons
  );

  return (
    <>
      <div className="w-full grid grid-cols-4 gap-2 text-center">
        {multiplierButtons.map((button, key) => (
          <div key={key} data-multiplierButton={key}>
            <MultiplierButton button={button} />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2 w-full text-center">
        {betButtons.map((button, key) => (
          <div key={key} data-betButton={key}>
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
      <div className=" w-full flex gap-7 justify-between items-center">
        <BetSlider />
      </div>
    </>
  );
}

export default NumberAndSlider;
