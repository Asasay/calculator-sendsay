import React from "react";
import Button from "./Button";

function Operators(props) {
  return (
    <div className="bar bar-operators">
      {["/", "*", "-", "+"].map((e, i) => (
        <Button type={e} key={i + 10} />
      ))}
    </div>
  );
}

export default Operators;
