import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import React from "react";
import ConstructorBlank from "./features/ConstructorBlank";
import Display from "./features/Display";
import { Draggable } from "./features/dnd/Draggable";
import Equal from "./features/Equal";
import Numpad from "./features/Numpad";
import Operators from "./features/Operators";
import Section from "./features/Section";
import Slider from "./features/slider/Slider";
import "./styles/Calculator.scss";

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSelector } from "react-redux";
import { selectMode } from "./calculator/calculatorSlice";

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
    if (over.data.current?.container === "Elements") return;
    if (active.id === over.id) return;

    const newConstructorBar = active.data.current;
    newConstructorBar.barId = newConstructorBar.barId.substring(
      0,
      newConstructorBar.barId.indexOf("_")
    );
    newConstructorBar.barId += "_constructor";
    newConstructorBar.container = "Constructor";

    if (constructorBars.length === 0) {
      setConstructorBars([newConstructorBar]);
    } else
      setConstructorBars((constructorBars) => {
        const oldIndex = constructorBars.findIndex(
          (cb) => cb.barId === active.id
        );
        const newIndex = constructorBars.findIndex(
          (cb) => cb.barId === over.id
        );

        if (oldIndex === -1) {
          if (newIndex === -1)
            return constructorBars.slice().push(newConstructorBar);
          else {
            var constructorBarsArray = constructorBars.slice();
            constructorBarsArray.splice(newIndex, 0, newConstructorBar);
            return constructorBarsArray;
          }
        }

        return arrayMove(constructorBars, oldIndex, newIndex);
      });

    setActiveComp(null);
  }
}

export default Calculator;
