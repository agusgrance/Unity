import React from "react";

import { getUserByUsername } from "@/lib/user-service";
import { currentUser } from "@clerk/nextjs/server";
import StreamPlayer from "@/components/stream-player";

interface Props {
  params: { username: string };
}
const CreatorPage = async ({ params }: Props) => {
  const externalUser = await currentUser();
  const user = await getUserByUsername(params.username);

  if (!user || user.externalUserId !== externalUser?.id || !user?.stream)
    throw new Error("Unauthorized");

  return (
    <div className="h-full">
      <StreamPlayer user={user} stream={user.stream} isFollowing />
    </div>
  );
};

export default CreatorPage;
