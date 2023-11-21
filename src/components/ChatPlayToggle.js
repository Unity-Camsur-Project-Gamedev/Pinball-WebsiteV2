import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function ChatPlayToggle({ setToggle }) {
  const [alignment, setAlignment] = React.useState("play");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton
        value="play"
        style={{
          fontSize: ".8rem",
          // border: "2px solid red",
          // padding: "0",
          height: "1.5rem",
        }}
        onClick={() => setToggle("play")}
      >
        Play
      </ToggleButton>
      <ToggleButton
        value="chat"
        style={{
          fontSize: ".8rem",
          // border: "2px solid red",
          // padding: "0",
          height: "1.5rem",
        }}
        onClick={() => setToggle("chat")}
      >
        Chat
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
