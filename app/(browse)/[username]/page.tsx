import React from "react";
import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import Actions from "./_components/Actions";
import { isBlockedByUser } from "@/lib/block-service";
import StreamPlayer from "@/components/streamPlayer";

interface Props {
  params: { username: string };
}

const UserPage = async ({ params }: Props) => {
  const user = await getUserByUsername(params.username);

  if (!user || !user.stream) notFound();

  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);

  if (isBlocked) notFound();
  return (
    <StreamPlayer user={user} stream={user.stream} isFollowing={isFollowing} />
  );
};

export default UserPage;
