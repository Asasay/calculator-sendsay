import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculate, selectMode } from "../calculatorRedux/calculatorSlice";
import { SectionContext } from "./Section";

function Button(props) {
  const context = useContext(SectionContext);
  const mode = useSelector(selectMode);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    if (mode === "constructor" || context === "elements") return;
    else dispatch(calculate(e.target.value));
  };

  return (
    <input
      type="button"
      className="btn"
      value={props.type}
      onClick={handleClick}
    />
  );
}

export default Button;
