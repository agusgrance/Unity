"use client";

// React
import React, { useTransition } from "react";

// Next
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

// Services
import { cn } from "@/lib/utils";

// Actions
import { onFollow, onUnFollow } from "@/actions/follow";

// Components
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

// Assets
import { Heart } from "lucide-react";

interface Props {
  hostIdentity: string;
  isFollowing: boolean;
  isHost: boolean;
}
const Actions = ({ hostIdentity, isFollowing, isHost }: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { userId } = useAuth();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(hostIdentity)
        .then((data) =>
          toast.success(`You are now following ${data.following.username}`)
        )
        .catch(() => toast.error("something went wrong"));
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnFollow(hostIdentity)
        .then((data) =>
          toast.success(`You have unfollowed ${data.following.username}`)
        )
        .catch(() => toast.error("something went wrong"));
    });
  };

  const toggleFollow = () => {
    if (!userId) {
      return router.push("/sign-in");
    }
    if (isHost) return;

    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  return (
    <Button
      onClick={toggleFollow}
      disabled={isPending || isHost}
      variant="primary"
      size="sm"
      className="w-full lg:w-auto"
    >
      <Heart
        className={cn("h-4 w-4 mr-2", isFollowing ? "fill-white" : "fill-none")}
      />
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default Actions;

export const ActionsSkeleton = () => {
  return <Skeleton className="h-10 w-full lg:w-24" />;
};
