import { api } from "@root/convex/_generated/api";
import { useQuery } from "convex/react";
import { DropBox } from "./DropBox";
import { PlayerWindow } from "./PlayerWindow";

export const GameRoom = () => {
  const users = useQuery(api.users.getAllUsers) ?? [];
  return (
    <>
      {/* top */}
      <PlayerWindow
        className="-translate-x-1/2 -translate-y-1/2 absolute top-0 left-1/2"
        user={users[0]}
      />
      {/* left */}
      <PlayerWindow
        className="-translate-x-1/4 -translate-y-1/2 absolute top-1/2 left-0"
        user={users[1]}
      />
      {/* right */}
      <PlayerWindow
        className="-translate-y-1/2 absolute top-1/2 right-0 translate-x-1/4"
        user={users[2]}
      />
      <DropBox />
    </>
  );
};
