"use client";

import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/components/libs/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  variant?: "primary" | "secondary";
};

export default function Button({
  label,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    "px-4 py-2 rounded-lg font-semibold transition-colors duration-200";
  const variants = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-white text-black border border-black hover:bg-gray-100",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {label}
    </button>
  );
}
