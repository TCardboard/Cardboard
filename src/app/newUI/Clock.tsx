import { useEffect, useRef } from "react";

export const Clock = () => {
  const clockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();

      // Format time
      const time = now.toLocaleTimeString();

      // Format date, then replace year with 2001
      const formattedDate = now
        .toLocaleDateString("en-NZ", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })
        .replace(/\d{4}$/, "2001");

      if (clockRef.current) {
        clockRef.current.textContent = `${time} - ${formattedDate}`;
      }
    };

    updateClock(); // Initial call
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={clockRef}
      className="absolute top-2 right-2 bg-secondary px-2 py-1 text-sm text-white shadow"
    />
  );
};
