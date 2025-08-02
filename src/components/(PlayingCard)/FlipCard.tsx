'use client';

import { useState, useRef, useEffect } from 'react';

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
}

export default function DraggableFlipCard({ front, back }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  return (
    <div
      ref={cardRef}
      className="absolute w-35 h-48 perspective z-50 cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onClick={() => setFlipped(!flipped)}
      style={{ left: position.x, top: position.y }}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 preserve-3d ${
          flipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front Face */}
        <div className="absolute w-full h-full backface-hidden bg-blue-500 text-white flex items-center justify-center rounded-xl shadow-xl">
          {front}
        </div>

        {/* Back Face */}
        <div className="absolute w-full h-full backface-hidden transform rotate-y-180 bg-red-500 text-white flex items-center justify-center rounded-xl shadow-xl">
          {back}
        </div>
      </div>
    </div>
  );
}
