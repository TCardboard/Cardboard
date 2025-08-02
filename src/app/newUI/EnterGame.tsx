import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePlayer } from "./PlayerContext";

export const EnterGame = () => {
  const { setName } = usePlayer();
  const [inputName, setInputName] = useState("");
  const [room, setRoom] = useState("");

  const handleSetName = () => {
    setName(inputName);
  };

  return (
    <div className="flex size-full items-center justify-center gap-6">
      <div className="flex gap-6">
        <Image
          src="/carddeck.png"
          alt="carddeck"
          width={150}
          height={150}
          className="aspect-square size-[150px] opacity-80 bg-blend-multiply"
        />
        <div className="w-px flex-1 bg-secondary"></div>
        <div className="flex flex-col gap-2 pl-12">
          <div className="flex flex-col">
            <p>Name:</p>
            <Input
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <p>Room Id:</p>
            <Input value={room} onChange={(e) => setRoom(e.target.value)} />
          </div>
          <Button className="mt-2" onClick={handleSetName}>
            Enter
          </Button>
        </div>
      </div>
    </div>
  );
};
