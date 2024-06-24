"use client";

// React
import React, { useTransition } from "react";

// Actions
import { onUnblock } from "@/actions/block";
import { onFollow, onUnFollow } from "@/actions/follow";

// Components
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Props {
  isFollowing?: boolean;
  userId: string;
}

const Actions = ({ isFollowing, userId }: Props) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) =>
          toast.success(`You are now following ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };
  const handleUnfollow = () => {
    startTransition(() => {
      onUnFollow(userId)
        .then((data) =>
          toast.success(`You have unfollowing ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const onClick = () => {
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  const handleBlock = () => {
    startTransition(() => {
      onUnblock(userId)
        .then((data) =>
          toast.success(`Unblocked the user ${data.blocked.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };
  return (
    <>
      <Button disabled={isPending} onClick={onClick} variant="primary">
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>

      <Button disabled={isPending} onClick={handleBlock}>
        Block
      </Button>
    </>
  );
};

export default Actions;
