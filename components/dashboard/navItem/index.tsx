"use client";

// React
import React from "react";

// Link
import Link from "next/link";

// Hooks
import { useCreatorSideBar } from "@/store/use-creator-sidebar";

// Services
import { cn } from "@/lib/utils";

// Components
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// Assets
import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive: boolean;
}

const NavItem = ({ icon: Icon, label, href, isActive }: Props) => {
  const { collapsed } = useCreatorSideBar();

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "w-full h-12",
        collapsed ? "justify-center" : "justify-start",
        isActive && "bg-accent"
      )}
    >
      <Link href={href}>
        <div className="flex items-center gap-x-4">
          <Icon className={cn("h-4 w-4", collapsed ? "mr-0" : "mr-2")} />
          {!collapsed && <span>{label}</span>}
        </div>
      </Link>
    </Button>
  );
};

export default NavItem;

export const NavItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[48px] min-w-[48px] rounded-md" />
      <div className="flex-1 hidden lg:block">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
};
