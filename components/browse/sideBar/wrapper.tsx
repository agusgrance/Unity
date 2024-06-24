"use client";

// React
import React from "react";

// Hooks
import { useIsClient } from "usehooks-ts";

// Store
import { useSideBar } from "@/store/use-sidebar";

// Services
import { cn } from "@/lib/utils";

// Components
import { ToggleSkeleton } from "./toggle";
import { RecommendedSkeleton } from "./recommended";
import { FollowingSkeleton } from "./following";

interface Props {
  children: React.ReactNode;
}

const Wrapper = ({ children }: Props) => {
  const isClient = useIsClient();
  const { collapsed } = useSideBar();

  if (!isClient)
    return (
      <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
        <ToggleSkeleton />
        <FollowingSkeleton />
        <RecommendedSkeleton />
      </aside>
    );
  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50",
        collapsed && "w-[70px]"
      )}
    >
      {children}
    </aside>
  );
};

export default Wrapper;
