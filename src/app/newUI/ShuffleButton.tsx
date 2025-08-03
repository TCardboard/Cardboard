import Button from "@/components/button";
import { api } from "@root/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";

export function ShuffleButton() {
  const shuffle = useMutation(api.cards.shuffleCards);
  const cards = useQuery(api.cards.getAllCards) ?? [];

  return (
    <Button
      label={cards.length > 0 ? "Shuffle" : "Deal"}
      onClick={() => shuffle()}
    />
  );
}
