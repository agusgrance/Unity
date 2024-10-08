"use client";

// React
import React from "react";

// Services
import { cn } from "@/lib/utils";

// Store
import { useCreatorSideBar } from "@/store/use-creator-sidebar";

interface Props {
  children: React.ReactNode;
}
const Wrapper = ({ children }: Props) => {
  const { collapsed } = useCreatorSideBar();
  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35]",
        collapsed && "lg:w-[70px]"
      )}
    >
      {children}
    </aside>
  );
};

export default Wrapper;
