"use client";

// React
import React from "react";

// Components
import Hint from "@/components/ui/hint";
import { Button } from "@/components/ui/button";

// Store
import { ChatVariant, useChatSideBar } from "@/store/use-chat-sidebar";

// Assets
import { MessageSquare, Users } from "lucide-react";

const VariantToggle = () => {
  const { variant, onChangeVariant } = useChatSideBar();

  const isChat = variant === ChatVariant.CHAT;
  const Icon = isChat ? Users : MessageSquare;

  const onToggle = () => {
    const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT;
    onChangeVariant(newVariant);
  };

  const label = isChat ? "Community" : "Go back to the chat";

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

export default VariantToggle;
