"use client";

//React
import React, { useEffect } from "react";

// Hooks
import { useMediaQuery } from "usehooks-ts";

// Services
import { cn } from "@/lib/utils";

// Store
import { useSideBar } from "@/store/use-sidebar";

interface Props {
  children: React.ReactNode;
}

const Container = ({ children }: Props) => {
  const matches = useMediaQuery("(max-width: 1024px)");
  const { collapsed, onExpand, onCollapse } = useSideBar();

  useEffect(() => {
    if (matches) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [matches, onCollapse, onExpand]);

  return (
    <div
      className={cn("flex-1", collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60")}
    >
      {children}
    </div>
  );
};

export default Container;
