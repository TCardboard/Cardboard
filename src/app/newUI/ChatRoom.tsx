"use client";

import { useMutation, useQuery } from "convex/react";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/libs/utils";
import { api } from "../../../convex/_generated/api";
import { WindowContainer, WindowContent, WindowHeader } from "./Window";

export const ChatRoom = ({ name }: { name: string }) => {
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
      sendMessage({ user: name, body: inputValue.trim() });
      setInputValue("");
    }
  };

  const [isMovedDown, setIsMovedDown] = useState(false);

  const handleTogglePosition = () => {
    setIsMovedDown((prev) => !prev);
  };

  if (!name) return null;

  return (
    <WindowContainer className="absolute right-0 bottom-0 size-full h-min w-[300px] overflow-hidden transition-transform duration-300 ">
      <WindowHeader
        className="flex justify-between hover:cursor-pointer "
        onClick={handleTogglePosition}
      >
        Game Room
        <button type="button">--</button>
      </WindowHeader>
      <WindowContent
        className={cn(isMovedDown && "min-h-0 py-0 transition *:hidden")}
      >
        <div
          className={cn(
            "max-h-[200px] min-h-[200px] space-y-1 overflow-y-scroll",
            isMovedDown && "min-h-0 py-0 transition "
          )}
        > 
          {(messages ?? []).map((chat, index) => (
            <div key={index} className="w-full break-words">
              <span className="font-bold">{chat.user}: </span>
              <span className="whitespace-pre-wrap break-words">
                {chat.body}
              </span>
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
