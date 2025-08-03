import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { UserType } from "@/utils/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stripUnknownFields(
  obj: Record<string, unknown>,
  allowedKeys: Record<string, unknown>,
) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => Object.hasOwn(allowedKeys, key)),
  );
}
