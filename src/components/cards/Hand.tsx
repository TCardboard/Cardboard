"use client";

import { useDroppable } from "@dnd-kit/core";
import type React from "react";
import { cn } from "@/components/libs/utils";

export type HandProps = {
  id: string;
  children?: React.ReactNode;
};

export default function Hand({ id, children }: HandProps) {
  const { isOver, setNodeRef } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex min-h-[140px] flex-row items-center justify-center gap-2 rounded-lg border-2 p-2",
        isOver
          ? "border-yellow-500 bg-yellow-200"
          : "border-gray-300 bg-gray-100"
      )}
    >
      <div className="mr-2 font-bold">Hand</div>
      {children}
    </div>
  );
}
