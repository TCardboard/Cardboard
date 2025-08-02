"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { WindowContainer, WindowContent, WindowHeader } from "./Window";

type ChatMessage = {
  author: string;
  message: string;
};

export const ChatRoom = ({ name }: { name: string }) => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { author: "Player1", message: "Let's play a game!" },
    { author: "Player2", message: "I'm in!" },
    { author: "Player1", message: "Let's play a game!" },
  ]);
  const [inputValue, setInputValue] = useState("");

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      setChatMessages((prev) => [
        ...prev.slice(-19), // keep only last 20
        { author: name, message: inputValue.trim() },
      ]);
      setInputValue("");
    }
  };

  return (
    <WindowContainer className="absolute right-0 bottom-0 size-full h-min w-[300px]">
      <WindowHeader>Card Board</WindowHeader>
      <WindowContent>
        <div className="max-h-[200px] min-h-[200px] space-y-1 overflow-y-scroll">
          {chatMessages.map((chat, index) => (
            <div key={index}>
              <span className="font-bold">{chat.author}: </span>
              <span>{chat.message}</span>
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
