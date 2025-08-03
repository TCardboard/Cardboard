"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/components/libs/utils";

type ControlButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  symbol?: string;
  icon?: ReactNode;
  variant?: "close" | "default";
};

export function ControlButton({
  symbol,
  icon,
  className,
  variant = "default",
  ...props
}: ControlButtonProps) {
  const baseStyle = `
    w-6 h-6
    flex items-center justify-center
    text-xs font-bold text-black
    bg-[#d4d0c8]
    border border-[#808080]
    shadow-[inset_1px_1px_0px_#fff,inset_-1px_-1px_0px_#404040]
    hover:shadow-[inset_-1px_-1px_0px_#fff,inset_1px_1px_0px_#404040]
    active:translate-y-[1px]
    transition-all
    rounded-sm
  `;

  const closeVariant =
    variant === "close"
      ? "text-white bg-[#ff3c3c] hover:bg-[#cc2e2e] border-[#800000]"
      : "";

  return (
    <button
      className={cn(baseStyle, closeVariant, className)}
      {...props}
      type={props.type ?? "button"}
    >
      {icon ?? symbol}
    </button>
  );
}

export default function XpWindowControls({
  onMinimize,
  onMaximize,
  onClose,
}: {
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
}) {
  return (
    <div className="flex gap-[2px]">
      <ControlButton symbol="─" title="Minimize" onClick={onMinimize} />
      <ControlButton
        title="Maximize"
        onClick={onMaximize}
        icon={
          <div className="relative h-3 w-3 border border-black">
            <div className="absolute top-0 left-0 h-[2px] w-full bg-black" />
          </div>
        }
      />
      <ControlButton
        symbol="✕"
        title="Close"
        variant="close"
        onClick={onClose}
      />
    </div>
  );
}
