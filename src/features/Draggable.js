import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { selectMode } from "../calculatorRedux/calculatorSlice";
import { useSelector } from "react-redux";

export function Draggable(props) {
  const mode = useSelector(selectMode);
  const isInConstructor =
    props.constructorBars &&
    props.constructorBars.findIndex((b) => b.bar === props.data.bar) !== -1;
  const displayInConstructor = props.id === "Display_constructor";

  const { attributes, listeners, setNodeRef, transform, transition, isOver } =
    useSortable({
      id: props.id,
      data: props.data,
      disabled: mode === "runtime" || isInConstructor || displayInConstructor,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isInConstructor ? 0.5 : 1,
    cursor: displayInConstructor ? "not-allowed" : "",
  };

  const deleteItem = () => {
    if (mode === "runtime" || props.data.container === "Elements") return;
    props.setConstructorBars((bars) => {
      var newBars = bars.slice();
      newBars.splice(
        bars.findIndex((b) => b.barId === props.id),
        1
      );
      return newBars;
    });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onDoubleClick={deleteItem}
    >
      {isOver && <div className="divider"></div>}
      {props.children}
    </div>
  );
}
