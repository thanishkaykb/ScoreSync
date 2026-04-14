"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-3xl group/bento hover:shadow-2xl transition duration-500 shadow-input dark:shadow-none p-8 bg-black/40 backdrop-blur-3xl border border-white/10 justify-between flex flex-col space-y-4 hover:border-primary/50",
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-500">
        {icon}
        <div className="font-sans font-bold text-white mb-2 mt-4 text-xl tracking-tight">
          {title}
        </div>
        <div className="font-sans font-normal text-white/50 text-sm leading-relaxed">
          {description}
        </div>
      </div>
    </div>
  );
};
