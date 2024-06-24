// React
import React from "react";

// Services
import { getUserByUsername } from "@/lib/user-service";

// Clerk
import { currentUser } from "@clerk/nextjs/server";

// Components
import StreamPlayer from "@/components/streamPlayer";

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
