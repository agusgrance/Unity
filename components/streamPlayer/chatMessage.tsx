"use client";

// React
import React from "react";

// Services
import { format } from "date-fns";
import { stringToColor } from "@/lib/utils";

// Livekit
import { ReceivedChatMessage } from "@livekit/components-react";

interface Props {
  data: ReceivedChatMessage;
}

const ChatMessage = ({ data }: Props) => {
  const color = data.from?.name ? stringToColor(data.from?.name) : "";

  return (
    <div className="flex gap-2 p-2 rounded-md hover:bg-white/5">
      <p className="text-sm text-white/40">{format(data.timestamp, "HH:MM")}</p>
      <div className="flex flex-wrap items-baseline gap-1 grow">
        <p className="text-sm font-semibold whitespace-nowrap">
          <span className="truncate" style={{ color: color }}>
            {data.from?.name}
          </span>
        </p>
        <p className="text-sm break-all">{data.message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
