// React
import React from "react";

// Components
import { StreamPlayerSkeleton } from "@/components/streamPlayer";

const CreatorLoading = () => {
  return (
    <div className="h-full">
      <StreamPlayerSkeleton />
    </div>
  );
};

export default CreatorLoading;
