"use client";

import { DndContext } from "@dnd-kit/core";
import { useState } from "react";
import TestDraggable from "./_components/TestDraggable";
import TestDroppable from "./_components/TestDroppable";

export default function AlsoTestPage() {
  const containers = ["A", "B", "C"];
  const [parent, setParent] = useState(null);
  const draggableMarkup = <TestDraggable id="draggable">Drag me</TestDraggable>;

  function handleDragEnd(event: { over: any }) {
    const { over } = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {parent === null ? draggableMarkup : null}

      {containers.map((id) => (
        // We updated the Droppable component so it would accept an `id`
        // prop and pass it to `useDroppable`
        <TestDroppable key={id} id={id}>
          {parent === id ? draggableMarkup : "Drop here"}
        </TestDroppable>
      ))}
    </DndContext>
  );
}
