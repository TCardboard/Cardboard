"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Sound from "react-sound";
import Button from "@/components/button";

export default function StartScreen() {
  const router = useRouter();
  const [playStatus, setPlayStatus] = useState<"STOPPED" | "PLAYING">(
    "STOPPED"
  );

  const handleButtonClick = () => {
    setPlayStatus("PLAYING");
  };

  const handleSoundFinished = () => {
    router.push("/");
  };

  return (
    <div className="relative flex h-screen flex-col items-center justify-center">
      <Image
        src="/WindowUI.png"
        alt="WindowUI"
        fill
        sizes="100%"
        priority
        className="-z-50 object-fill"
      />
      <div className="flex size-full items-center justify-center whitespace-nowrap bg-secondary/80">
        <div className="relative flex h-[60dvh] w-full gap-6 text-white">
          <Image
            src="/windowxd.png"
            alt="carddeck"
            fill
            className="aspect-square size-[150px] opacity-80 bg-blend-multiply"
          />
          <div className="flex w-px flex-1 justify-between bg-secondary p-32">
            <div className="absolute right-2/5 bottom-1/3 z-50 flex flex-col gap-2 pl-12">
              <Button
                type="submit"
                label="Enter as user"
                className="bg-blue-600 text-white hover:bg-blue-700"
                onClick={handleButtonClick}
              />
            </div>
          </div>
        </div>
      </div>
      <Sound
        url="/Microsoft Windows XP Startup Sound.mp3"
        playStatus={playStatus}
        onFinishedPlaying={handleSoundFinished}
      />
    </div>
  );
}
