import React from "react";
import "./styles/Calculator.scss";
import Display from "./features/Display";
import Operators from "./features/Operators";
import Numpad from "./features/Numpad";
import Button from "./features/Button";
import Slider from "./features/slider/Slider";
import Constructor from "./features/Constructor";

function Calculator() {
  return (
    <div id="calc-wrapper">
      <div className="block-wrapper">
        <Display />
        <Operators />
        <Numpad />
        <div className="bar bar-equal">
          <Button type="=" id="equal" />
        </div>
      </div>
      <div className="block-wrapper">
        <Slider className="slider" />
        <Constructor />
      </div>
    </div>
  );
}

export default Calculator;
