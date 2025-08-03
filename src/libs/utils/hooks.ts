"use client";

import type { UserType } from "@/utils/types";
import { useLocalStorage } from "@uidotdev/usehooks";

export const useLocalPlayer = () => {
  const [player, setPlayer] = useLocalStorage<UserType | null>("player", null);
  return { player, setPlayer };
};
