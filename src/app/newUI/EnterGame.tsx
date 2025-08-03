import { api } from "@root/convex/_generated/api";
import type { Id } from "@root/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useState } from "react";
import Button from "@/components/button";
import { Input } from "@/components/ui/input";
import { useLocalPlayer } from "@/libs/utils/hooks";

// TODO
export const EnterGame = () => {
  const login = useMutation(api.users.login);
  const { setPlayer } = useLocalPlayer();
  const [inputName, setInputName] = useState("");
  const [inputRoom, setInputRoom] = useState("");

  const handleSetName = async () => {
    const loginDetails = { name: inputName, room: inputRoom };
    const user = await login(loginDetails);
    if (!user) {
      console.error("Failed to login with user:", JSON.stringify(loginDetails));
      return;
    }
    setPlayer(user);
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
            <Input
              value={inputRoom}
              onChange={(e) => setInputRoom(e.target.value)}
            />
          </div>
          <Button label="Enter" className="bg-blue-600 text-white hover:bg-blue-700" onClick={handleSetName} />
        </div>
      </div>
    </div>
  );
};
