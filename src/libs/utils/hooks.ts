"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { UserType } from "@/utils/types";

export const useLocalPlayer = () => {
  const [player, setPlayer] = useLocalStorage<UserType | null>("player", null);
  return { player, setPlayer };
};
