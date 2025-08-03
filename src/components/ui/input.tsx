import type * as React from "react";
import { cn } from "@/libs/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full h-8 px-2 py-[2px] border text-sm text-black",
        "bg-[#F0F0F0] border border-[#A0A0A0] rounded-[2px] shadow-inner",
        "font-[Tahoma] placeholder:text-gray-600",
        "disabled:cursor-not-allowed disabled:opacity-60",
        "focus:outline focus:outline-[1px] focus:outline-[#316AC5]",

        className,
      )}
      {...props}
    />
  );
}

export { Input };