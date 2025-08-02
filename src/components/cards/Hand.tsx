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
        "fixed bottom-0 left-0 z-50 w-full",
        "flex min-h-[140px] flex-row items-center justify-center gap-2 rounded-t-lg p-2",
        isOver
          ? "bg-gradient-to-t from-green-300 to-transparent"
          : "bg-gradient-to-t from-green-200 to-transparent"
      )}
    >
      <div className="mr-2 font-bold text-black-800">Hand</div>
      {children}
    </div>
  );
}
