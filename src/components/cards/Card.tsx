"use client";

import { useDraggable } from "@dnd-kit/core";
import type React from "react";

export type CardProps = {
  id: string;
  image?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

export default function Card({ id, image, children, style }: CardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });
  const cardStyle: React.CSSProperties = {
    width: 80,
    height: 120,
    borderRadius: 8,
    boxShadow: isDragging ? "0 0 8px #333" : "0 2px 6px #aaa",
    background: image ? `url(${image}) center/cover` : "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "grab",
    position: "absolute",
    ...style,
    transform: transform
      ? `translate3d(${transform.x}px,${transform.y}px,0)`
      : undefined,
    zIndex: isDragging ? 100 : undefined,
  };
  return (
    <div ref={setNodeRef} style={cardStyle} {...listeners} {...attributes}>
      {children}
    </div>
  );
}
