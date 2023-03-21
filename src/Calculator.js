import React from "react";
import "./styles/Calculator.scss";
import Display from "./features/Display";
import Operators from "./features/Operators";
import Numpad from "./features/Numpad";
import Button from "./features/Button";
import Slider from "./features/slider/Slider";
import Constructor from "./features/Constructor";
import Section from "./features/Section";

function Calculator() {
  return (
    <div id="calc-wrapper">
      <Section className="block-wrapper">
        <Display />
        <Operators />
        <Numpad />
        <div className="bar bar-equal">
          <Button type="=" id="equal" />
        </div>
      </Section>
      <Section className="block-wrapper constructor">
        <Slider className="slider" />
        <Operators />
        <Display />
        <Numpad />
      </Section>
    </div>
  );
}

export default Calculator;
