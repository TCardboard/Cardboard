import { DropBox } from "./DropBox";
import { PlayerWindow } from "./PlayerWindow";

export const GameRoom = () => {
  return (
    <>
      {/* top */}
      <PlayerWindow className="-translate-x-1/2 -translate-y-1/2 absolute top-0 left-1/2" />
      {/* left */}
      <PlayerWindow className="-translate-x-1/4 -translate-y-1/2 absolute top-1/2 left-0" />
      {/* right */}
      <PlayerWindow className="-translate-y-1/2 absolute top-1/2 right-0 translate-x-1/4" />
      <DropBox />
    </>
  );
};
