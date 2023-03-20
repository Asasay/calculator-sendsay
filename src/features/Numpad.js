import React from "react";
import Button from "./Button";

function Numpad(props) {
  return (
    <div className="bar bar-numpad">
      {["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ","].map((e, i) => (
        <Button type={e} key={i} />
      ))}
    </div>
  );
}

export default Numpad;
