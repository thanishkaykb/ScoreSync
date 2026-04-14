"use client";
import React, { useId, useEffect, useState } from "react";
import { useMousePosition } from "@/hooks/use-mouse-position";
import { cn } from "@/lib/utils";

export const SparklesCore = (props: {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  particleColor?: string;
  speed?: number;
}) => {
  const {
    id,
    className,
    background = "transparent",
    minSize = 0.6,
    maxSize = 1.4,
    particleDensity = 120,
    particleColor = "#FFF",
    speed = 1,
  } = props;
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const particlesArray = [];
    const count = particleDensity;
    for (let i = 0; i < count; i++) {
      particlesArray.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * (maxSize - minSize) + minSize,
        opacity: Math.random(),
        speed: (Math.random() * 0.5 + 0.5) * speed,
      });
    }
    setParticles(particlesArray);
  }, [particleDensity, maxSize, minSize, speed]);

  return (
    <div
      id={id || "sparkles"}
      className={cn("h-full w-full relative overflow-hidden", className)}
      style={{
        background: background,
      }}
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particleColor,
            opacity: particle.opacity,
            transition: `all ${particle.speed}s linear`,
          }}
        />
      ))}
    </div>
  );
};
