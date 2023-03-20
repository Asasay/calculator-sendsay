import React from "react";
import imgImport from "../images/imgImport.svg";

function Constructor() {
  return (
    <div className="constructor">
      <figure>
        <img src={imgImport} alt="import icon" />
        <figcaption>
          <p>Перетащите сюда</p>
          <p>
            любой элемент <br /> из левой панели
          </p>
        </figcaption>
      </figure>
    </div>
  );
}

export default Constructor;
