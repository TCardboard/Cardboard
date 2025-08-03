"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/libs/utils";
import { useLocalPlayer } from "@/libs/utils/hooks";
import { useMutation, useQuery } from "convex/react";
import { useEffect, useRef, useState } from "react";
import { api } from "../../../convex/_generated/api";
import { WindowContainer, WindowContent, WindowHeader } from "./Window";
import XpWindowControls from "@/components/controlbutton";

export const ChatRoom = () => {
  const { player } = useLocalPlayer();
  const messages = useQuery(api.chat.getMessages);
  const sendMessage = useMutation(api.chat.sendMessage);

  const [inputValue, setInputValue] = useState("");

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messages) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      if (!player) {
        console.log("Player not set, cannot send message");
        return;
      }

      sendMessage({ user: player.name, body: inputValue.trim() });
      setInputValue("");
    }
  };

  const [isMovedDown, setIsMovedDown] = useState(false);

  const handleTogglePosition = () => {
    setIsMovedDown((prev) => !prev);
  };

  const handleMinimize = () => {
    console.log("Minimize clicked");
    // Add minimize logic here
  };

  const handleMaximize = () => {
    console.log("Maximize clicked");
    // Add maximize logic here
  };

  const handleClose = () => {
    console.log("Close clicked");
    // Add close logic here
  };

  if (!player) return null;

  return (
    <WindowContainer className="absolute right-0 bottom-0 size-full h-min w-[300px] overflow-hidden transition-transform duration-300">
      <WindowHeader
        className="flex justify-between pr-1 hover:cursor-pointer"
        onClick={handleTogglePosition}
      >
        Game Room
        <XpWindowControls
          controls={["minimize", "maximize", "close"]}
          onMinimize={handleMinimize}
          onMaximize={handleMaximize}
          onClose={handleClose}
        />
      </WindowHeader>
      <WindowContent
        className={cn(isMovedDown && "min-h-0 py-0 transition *:hidden")}
      >
        <div
          className={cn(
            "max-h-[200px] min-h-[200px] space-y-1 overflow-y-scroll",
            isMovedDown && "min-h-0 py-0 transition"
          )}
        >
          {(messages ?? []).map((chat, index) => (
            <div key={index} className="w-full break-words">
              <span className="font-bold">{chat.user}: </span>
              <span className="whitespace-pre-wrap break-words">{chat.body}</span>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
        />
      </WindowContent>
    </WindowContainer>
  );
};
