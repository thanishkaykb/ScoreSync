"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const beams = [
    {
      top: 10,
      left: 10,
      rotate: 45,
      delay: 0,
      duration: 12,
    },
    {
      top: 60,
      left: 90,
      rotate: -45,
      delay: 2,
      duration: 15,
    },
    {
      top: 30,
      left: 40,
      rotate: 135,
      delay: 4,
      duration: 18,
    },
    {
      top: 80,
      left: 20,
      rotate: -135,
      delay: 6,
      duration: 20,
    },
    {
      top: 50,
      left: 50,
      rotate: 225,
      delay: 8,
      duration: 22,
    },
  ];

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className
      )}
    >
      <svg
        className="h-full w-full opacity-30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        {beams.map((beam, index) => (
          <motion.rect
            key={index}
            width="600"
            height="1"
            fill="url(#beam-gradient)"
            initial={{
              x: -600,
              y: `${beam.top}%`,
              rotate: beam.rotate,
              opacity: 0,
            }}
            animate={{
              x: 1000,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: beam.duration,
              repeat: Infinity,
              delay: beam.delay,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
};
