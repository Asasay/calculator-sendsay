import React from "react";
import { useDroppable } from "@dnd-kit/core";
import imgImport from "../images/imgImport.svg";

function ConstructorBlank(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    backgroundColor: isOver ? "#F0F9FF" : "",
  };
  return (
    <div className="constructorBlank" style={style} ref={setNodeRef}>
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

export default ConstructorBlank;
