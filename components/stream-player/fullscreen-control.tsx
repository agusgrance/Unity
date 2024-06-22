"use client";
import React from "react";
import { Maximize, Minimize } from "lucide-react";

import Hint from "@/components/hint";

interface Props {
  isFullScreen: boolean;
  onToggle: () => void;
}
const FullScreenControl = ({ isFullScreen, onToggle }: Props) => {
  const Icon = isFullScreen ? Minimize : Maximize;
  const label = isFullScreen ? "Exist fullscreen" : "Enter fullscreen";

  return (
    <div className="flex items-center justify-center gap-4">
      <Hint label={label} asChild>
        <button
          onClick={onToggle}
          className="text-white p-1.5 hover:bg-white/10 rounded-lg"
        >
          <Icon className="h-5 w-5" />
        </button>
      </Hint>
    </div>
  );
};

export default FullScreenControl;
