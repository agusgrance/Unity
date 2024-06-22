import React from "react";
import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import Actions from "./_components/Actions";
import { isBlockedByUser } from "@/lib/block-service";

interface Props {
  params: { username: string };
}

const UserPage = async ({ params }: Props) => {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBLockedByThisUser = await isBlockedByUser(user.id);

  return (
    <div className="flex flex-col gap-y-4">
      <p>username: {user.username}</p>
      <p>user ID: {user.id}</p>
      <p>is Blocked: {`${isBLockedByThisUser}`}</p>
      <p>is following: {isFollowing ? "following" : "follow"}</p>
      <Actions isFollowing={isFollowing} userId={user.id} />
    </div>
  );
};

export default UserPage;
