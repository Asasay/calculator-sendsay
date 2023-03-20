import React from "react";

function Button(props) {
  return <input type="button" className="btn" value={props.type} />;
}

export default Button;
