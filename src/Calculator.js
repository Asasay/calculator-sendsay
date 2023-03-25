import {
  closestCenter,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import React from "react";
import ConstructorBlank from "./features/ConstructorBlank";
import Display from "./features/Display";
import { Draggable } from "./features/Draggable";
import Equal from "./features/Equal";
import Numpad from "./features/Numpad";
import Operators from "./features/Operators";
import Section from "./features/Section";
import Slider from "./features/Slider";
import "./styles/Calculator.scss";

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSelector } from "react-redux";
import { selectMode } from "./calculatorRedux/calculatorSlice";

function Calculator() {
  const mode = useSelector(selectMode);
  const [activeComp, setActiveComp] = React.useState(null);

  const [bars] = React.useState([
    { barId: "Display_Element", bar: <Display />, container: "Elements" },
    { barId: "Operators_Element", bar: <Operators />, container: "Elements" },
    { barId: "Numpad_Element", bar: <Numpad />, container: "Elements" },
    { barId: "Equal_Element", bar: <Equal />, container: "Elements" },
  ]);
  const [constructorBars, setConstructorBars] = React.useState([]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { delay: 200, tolerance: 5 },
    })
  );

  return (
    <div id="calc-wrapper">
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <Section className="block-wrapper" context="elements">
          {bars.map((comp, ind) => {
            return (
              <Draggable
                key={ind}
                id={comp.barId}
                data={comp}
                constructorBars={constructorBars}
              >
                {comp.bar}
              </Draggable>
            );
          })}
        </Section>

        <Section className={`block-wrapper ${mode}`} context="constructor">
          <Slider className="slider" />
          <SortableContext
            items={constructorBars}
            strategy={verticalListSortingStrategy}
          >
            {constructorBars.length === 0 && (
              <ConstructorBlank id="constructorBlank" />
            )}
            {constructorBars.length > 0 &&
              constructorBars.map((comp, ind) => {
                return (
                  <Draggable
                    key={ind}
                    id={comp.barId}
                    data={comp}
                    setConstructorBars={setConstructorBars}
                  >
                    {comp.bar}
                  </Draggable>
                );
              })}
          </SortableContext>
        </Section>
        <DragOverlay style={{ opacity: 0.5, cursor: "move" }}>
          {activeComp ? activeComp : null}
        </DragOverlay>
      </DndContext>
    </div>
  );

  function handleDragStart(event) {
    setActiveComp(event.active.data.current.bar);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    // Skip if the active and over elements are the same OR over a left container OR its display in  the right panel
    if (active.id === over.id || over.data.current?.container === "Elements")
      return;

    // Clone the active bar and update its properties
    const newConstructorBar = { ...active.data.current };
    newConstructorBar.barId =
      newConstructorBar.barId.substring(
        0,
        newConstructorBar.barId.indexOf("_")
      ) + "_constructor";
    newConstructorBar.container = "Constructor";

    // Create an invisible anchor element for sorting to be placed at the end of right panel
    const anchor = {
      barId: "anchor",
      bar: <React.Fragment />,
      container: "Constructor",
    };

    // If right panel is empty place active bar and anchor
    if (constructorBars.length === 0) {
      setConstructorBars([newConstructorBar, anchor]);
    } else {
      // Else update the constructor bars array, which represents right panel
      setConstructorBars((constructorBars) => {
        // Get the indices of the active and over bars
        const oldIndex = constructorBars.findIndex(
          (cb) => cb.barId === active.id
        );
        const newIndex = constructorBars.findIndex(
          (cb) => cb.barId === over.id
        );
        // Clone the constructor bars state array to avoid mutating the state directly
        var constructorBarsArray = constructorBars.slice();
        // Insert the new bar if the active bar is from the left panel
        if (active.data.current.container === "Elements") {
          // Display can be only on top
          if (active.id === "Display_Element") {
            constructorBarsArray.splice(0, 0, newConstructorBar);
          } else {
            constructorBarsArray.splice(newIndex, 0, newConstructorBar);
          }
          return constructorBarsArray;
        }
        // Else move the active bar to the new position
        if (newIndex > oldIndex) {
          // Move Down in the list
          return arrayMove(constructorBars, oldIndex, newIndex - 1);
        }
        // Move Up in the list
        else return arrayMove(constructorBars, oldIndex, newIndex);
      });
    }
    setActiveComp(null);
  }
}

export default Calculator;
