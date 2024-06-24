"use client";

// React
import React from "react";

// Next
import { usePathname } from "next/navigation";

// Clerk
import { useUser } from "@clerk/nextjs";

// Components
import NavItem, { NavItemSkeleton } from "../navItem";

// Assets
import { Fullscreen, KeyRound, MessageSquare, Users } from "lucide-react";

const Navigation = () => {
  const pathname = usePathname();
  const { user } = useUser();

  const routes = [
    {
      label: "Stream",
      href: `/u/${user?.username}`,
      icon: Fullscreen,
    },
    {
      label: "Keys",
      href: `/u/${user?.username}/keys`,
      icon: KeyRound,
    },
    {
      label: "Chat",
      href: `/u/${user?.username}/chat`,
      icon: MessageSquare,
    },
    {
      label: "Community",
      href: `/u/${user?.username}/community`,
      icon: Users,
    },
  ];

  if (!user?.username) {
    return (
      <ul className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <NavItemSkeleton key={i} />
        ))}
      </ul>
    );
  }

  return (
    <ul className="space-y-2 px-2 pt-4 lg:pt-0">
      {routes.map((route) => (
        <NavItem
          key={route.label}
          isActive={pathname === route.href}
          {...route}
        />
      ))}
    </ul>
  );
};

export default Navigation;
