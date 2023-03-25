import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { selectDisplay } from "../calculatorRedux/calculatorSlice";
import { SectionContext } from "./Section";

function Display() {
  const context = useContext(SectionContext);
  const displayState = useSelector(selectDisplay);
  const display = context === "constructor" ? displayState : 0;

  const style = {
    fontSize: display.length > 9 ? 32 - (display.length - 9) * 1.5 + "px" : "",
  };

  return (
    <div className="bar bar-display">
      <p style={style}>{display ? display : 0}</p>
    </div>
  );
}

export default Display;
