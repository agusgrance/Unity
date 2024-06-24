"use client";

// React
import React from "react";

// Store
import { useChatSideBar } from "@/store/use-chat-sidebar";

// Components
import Hint from "@/components/ui/hint";
import { Button } from "@/components/ui/button";

// Assets
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

const ChatToggle = () => {
  const { collapsed, onExpand, onCollapse } = useChatSideBar();
  const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;
  const onToggle = () => {
    if (collapsed) {
      onExpand();
    } else {
      onCollapse();
    }
  };

  const label = collapsed ? "Expand" : "Collapse";
  return (
    <Hint label={label} side="left" asChild>
      <Button
        onClick={onToggle}
        variant="ghost"
        className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
      >
        <Icon className="h-4 w-4" />
      </Button>
    </Hint>
  );
};

export default ChatToggle;
