import type { HTMLAttributes } from "react";
import { cn } from "@/libs/utils";

export const WindowContainer = ({
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={cn("flex flex-col border border-secondary", props.className)}
    >
      {children}
    </div>
  );
};
export const WindowHeader = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props} className={cn(" bg-nol px-4 py-1 text-white", className)}>
      {children}
    </div>
  );
};

export const WindowContent = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={cn(
        "relative flex flex-1 flex-col gap-4 bg-white/85 p-4",
        className,
      )}
    >
      {children}
    </div>
  );
};
