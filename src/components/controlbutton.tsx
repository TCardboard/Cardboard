"use client";

import { cn } from "@/components/libs/utils";
import type { ButtonHTMLAttributes } from "react";

type ControlButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  symbol: string;
  variant?: "close" | "default";
};

export function ControlButton({
  symbol,
  className,
  variant = "default",
  ...props
}: ControlButtonProps) {
  const baseStyle = `
    w-6 h-6
    flex items-center justify-center
    text-xs
    font-bold
    text-black
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
      {symbol}
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
      <ControlButton symbol="□" title="Maximize" onClick={onMaximize} />
      <ControlButton
        symbol="✕"
        title="Close"
        variant="close"
        onClick={onClose}
      />
    </div>
  );
}
