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

type XpWindowControlsProps = {
  controls?: ("minimize" | "maximize" | "close" | "logout")[];
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
  onLogout?: () => void;
};

export default function XpWindowControls({
  controls = ["minimize", "maximize", "close"], 
  onMinimize,
  onMaximize,
  onClose,
  onLogout,
}: XpWindowControlsProps) {
  return (
    <div className="flex gap-[2px]">
      {controls.includes("minimize") && (
        <ControlButton symbol="─" title="Minimize" onClick={onMinimize} />
      )}

      {controls.includes("maximize") && (
        <ControlButton
          title="Maximize"
          onClick={onMaximize}
          icon={
            <div className="relative h-3 w-3 border border-black">
              <div className="absolute top-0 left-0 h-[2px] w-full bg-black" />
            </div>
          }
        />
      )}

      {controls.includes("close") && (
        <ControlButton
          symbol="✕"
          title="Close"
          variant="close"
          onClick={onClose}
        />
      )}

      {controls.includes("logout") && (
        <ControlButton
          title="Logout"
          onClick={onLogout}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 stroke-black"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              role="img"
              aria-labelledby="logoutTitle"
            >
              <title id="logoutTitle">Logout icon</title>
              <path d="M16 17l5-5-5-5" />
              <path d="M21 12H9" />
              <path d="M12 19v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v2" />
            </svg>
          }
        />
      )}
    </div>
  );
}
