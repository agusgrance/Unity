"use client";

import { useSideBar } from "@/store/use-sidebar";
import { Follow, User } from "@prisma/client";
import React from "react";
import UserItem, { UserItemSkeleton } from "./userItem";

interface Props {
  data: (Follow & {
    following: User & {
      stream: {
        isLive: boolean;
      } | null;
    };
  })[];
}
const Following = ({ data }: Props) => {
  const { collapsed } = useSideBar();

  if (!data.length) return null;

  return (
    <div>
      {!collapsed && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((follow) => (
          <UserItem
            username={follow.following.username}
            imageUrl={follow.following.imageUrl}
            key={follow.following.id}
            isLive={follow.following.stream?.isLive}
          />
        ))}
      </ul>
    </div>
  );
};

export default Following;

export const FollowingSkeleton = () => {
  return (
    <ul className="px-2 pt-2 lg:pt-0">
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  );
};
