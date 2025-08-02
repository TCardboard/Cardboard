import { useDraggable } from "@dnd-kit/core";

type DraggableCardProps = {
  id: string;
  x: number;
  y: number;
  children?: React.ReactNode;
  onMove: (id: string, x: number, y: number) => void;
  onDrop: (id: string) => void;
};

export default function DraggableCard({
  id,
  x,
  y,
  children,
  onMove,
  onDrop,
}: DraggableCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });
  const style: React.CSSProperties = {
    position: "absolute",
    left: x + (transform?.x ?? 0),
    top: y + (transform?.y ?? 0),
    width: 80,
    height: 120,
    borderRadius: 8,
    boxShadow: isDragging ? "0 0 8px #333" : "0 2px 6px #aaa",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "grab",
    zIndex: isDragging ? 100 : undefined,
    transition: isDragging ? "none" : "box-shadow 0.2s",
  };
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
}
