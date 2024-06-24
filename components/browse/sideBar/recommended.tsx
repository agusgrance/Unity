"use client";
// React
import React from "react";

// Store
import { useSideBar } from "@/store/use-sidebar";

// Components
import UserItem, { UserItemSkeleton } from "./userItem";

// Types
import { User } from "@prisma/client";

interface Props {
  data: (User & {
    stream: { isLive: boolean } | null;
  })[];
}

const Recommended = ({ data }: Props) => {
  const { collapsed } = useSideBar();

  const showLabel = !collapsed && data?.length > 0;

  return (
    <div>
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((user) => (
          <UserItem
            username={user.username}
            imageUrl={user.imageUrl}
            key={user.id}
            isLive={user.stream?.isLive}
          />
        ))}
      </ul>
    </div>
  );
};

export default Recommended;

export const RecommendedSkeleton = () => {
  return (
    <ul className="px-2">
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  );
};
