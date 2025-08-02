'use client';

import { useEffect, useRef, useState } from 'react';

let globalZIndex = 50;

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
}

export default function FlipCard({ front, back }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [zIndex, setZIndex] = useState(globalZIndex);

  const dragStart = useRef({ x: 0, y: 0 });
  const cardRef = useRef<HTMLButtonElement>(null);

  const bringToFront = () => {
    globalZIndex += 1;
    setZIndex(globalZIndex);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    bringToFront();
    setDragging(true);
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (!dragging) return;
      setPosition({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y,
      });
    }

    function handleMouseUp() {
      setDragging(false);
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={() => {
        setFlipped(!flipped);
        bringToFront();
      }}
      onMouseDown={handleMouseDown}
      className="perspective absolute h-48 w-35 cursor-grab border-none bg-transparent p-0 active:cursor-grabbing"
      style={{ left: position.x, top: position.y, zIndex }}
    >
      <div
        className={`preserve-3d relative h-full w-full transition-transform duration-700 ${
          flipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front Face */}
        <div className="backface-hidden absolute flex h-full w-full items-center justify-center rounded-xl bg-blue-500 text-white shadow-xl">
          {front}
        </div>

        {/* Back Face */}
        <div className="backface-hidden absolute flex h-full w-full rotate-y-180 transform items-center justify-center rounded-xl bg-red-500 text-white shadow-xl">
          {back}
        </div>
      </div>
    </button>
  );
}
