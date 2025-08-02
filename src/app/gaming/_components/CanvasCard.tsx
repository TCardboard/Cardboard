import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/libs/utils";

export type CanvasCardProps = {
  id: string;
  x: number;
  y: number;
  image?: string;
  children?: React.ReactNode;
};

export default function CanvasCard({
  id,
  x,
  y,
  image,
  children,
}: CanvasCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });

  const style = {
    left: x + (transform?.x ?? 0),
    top: y + (transform?.y ?? 0),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        "absolute flex items-center justify-center",
        "h-28 w-20 rounded-lg shadow-md",
        isDragging
          ? "z-50 cursor-grab bg-blue-200 transition-none"
          : "bg-gray-200 transition-shadow duration-200",
        image ? `bg-[url(${image})] bg-center bg-cover` : "bg-gray-200"
      )}
    >
      {children}
    </div>
  );
}
