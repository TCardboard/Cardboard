"use client";

import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/components/libs/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

export default function Button({
  label,
  className,
  ...props
}: ButtonProps) {
  const xpStyles = `
    px-3 py-1.5
    text-sm
    font-sans
    text-black
    bg-[#d4d0c8]
    border border-[#808080]
    shadow-[inset_-1px_-1px_0px_#fff,inset_1px_1px_0px_#404040]
    hover:shadow-[inset_1px_1px_0px_#fff,inset_-1px_-1px_0px_#404040]
    active:translate-y-[1px]
    transition-all
    rounded-sm
  `;

  return (
    <button
      className={cn(xpStyles, className)}
      {...props}
    >
      {label}
    </button>
  );
}
