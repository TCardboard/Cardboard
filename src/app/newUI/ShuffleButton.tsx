import Button from "@/components/button";
import { api } from "@root/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";

export function ShuffleButton() {
  const newGame = useMutation(api.cards.newGame);
  const cards = useQuery(api.cards.getAllCards) ?? [];

  return (
    <Button
      label={cards.length > 0 ? "Shuffle" : "Deal"}
      onClick={() => newGame()}
      className="flex h-6 items-center"
    />
  );
}
