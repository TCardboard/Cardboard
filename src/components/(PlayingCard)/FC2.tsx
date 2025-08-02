import { useState } from "react";
import FlipCard from "./FlipCard";
import { CardType } from "@/utils/types";
const FC2 = () => {

const basecard: CardType = {
      _id: "temp" as any,
      _creationTime: 0,
      x: 0,
      y: 0,
      type: "",
      playerId: null,
      visible: false,
      z: 0
  }
const [card, setCard] =useState<CardType>(basecard)

//   const [flipped, setFlipped] = useState(false);
//   const [position, setPosition] = useState({ x: 100, y: 100 });
//   const [zIndex, setZIndex] = useState(globalZIndex);

  return (
    <div>
      <FlipCard
        card={card}
        setCard={setCard}
        front={<div>Front Content</div>}
        back={<div>Back Content</div>}
      />
    </div>
  );
};

 
export default FC2;