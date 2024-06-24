"use client";

// React
import React, { useEffect, useMemo, useState } from "react";

// Hooks
import { useMediaQuery } from "usehooks-ts";

// Store
import { ChatVariant, useChatSideBar } from "@/store/use-chat-sidebar";

// Components
import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import ChatHeader, { ChatHeaderSkeleton } from "./chatHeader";
import ChatForm, { ChatFormSkeleton } from "./chatForm";
import ChatList, { ChatListSkeleton } from "./chatList";
import ChatCommunity from "./chatCommunity";

interface Props {
  viewerName: string;
  hostIdentity: string;
  hostName: string;
  isFollowing: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
}

const Chat = ({
  viewerName,
  hostIdentity,
  hostName,
  isFollowing,
  isChatEnabled,
  isChatDelayed,
  isChatFollowersOnly,
}: Props) => {
  const matches = useMediaQuery("(max-width: 1024px)");
  const { variant, onExpand } = useChatSideBar();
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);

  const isOnline = participant && connectionState === ConnectionState.Connected;

  const isHidden = !isChatEnabled || !isOnline;

  const [value, setValue] = useState("");
  const { chatMessages: messages, send } = useChat();

  useEffect(() => {
    if (matches) {
      onExpand();
    }
  }, [matches, onExpand]);

  const reversedMessages = useMemo(() => {
    return messages.sort((a, b) => b.timestamp - a.timestamp);
  }, [messages]);

  const onSubmit = () => {
    if (!send) return;

    send(value);
    setValue("");
  };

  const onChange = (value: string) => {
    setValue(value);
  };
  return (
    <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
      <ChatHeader />
      {variant === ChatVariant.CHAT && (
        <>
          <ChatList messages={reversedMessages} isHidden={isHidden} />
          <ChatForm
            onSubmit={onSubmit}
            value={value}
            onChange={onChange}
            isHidden={isHidden}
            isFollowersOnly={isChatFollowersOnly}
            isDelayed={isChatDelayed}
            isFollowing={isFollowing}
          />
        </>
      )}
      {variant === ChatVariant.COMMUNITY && (
        <ChatCommunity
          viewerName={viewerName}
          hostName={hostName}
          isHidden={isHidden}
        />
      )}
    </div>
  );
};

export default Chat;

export const ChatSkeleton = () => {
  return (
    <div className="flex flex-col border-l border-b pt-0 h-[calc(100vh-80px)] border-2">
      <ChatHeaderSkeleton />
      <ChatListSkeleton />
      <ChatFormSkeleton />
    </div>
  );
};
