"use client";

import { useDroppable } from "@dnd-kit/core";
import type React from "react";
import { cn } from "@/components/libs/utils";

type TestDroppableProps = {
  children: React.ReactNode;
  id?: string;
};

export default function TestDroppable(props: TestDroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id ?? "droppable",
  });

  return (
    <div
      ref={setNodeRef}
      className={cn("m-2 border p-4", isOver ? "bg-green-700" : "bg-gray-200")}
    >
      {props.children}
    </div>
  );
}
