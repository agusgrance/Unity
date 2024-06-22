import { useParticipants } from "@livekit/components-react";
import React, { useMemo, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import CommunityItem from "./community-item";
import { LocalParticipant, RemoteParticipant } from "livekit-client";

interface Props {
  viewerName: string;
  hostName: string;
  isHidden: boolean;
}
const ChatCommunity = ({ viewerName, hostName, isHidden }: Props) => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounceValue<string>(value, 500);
  const participants = useParticipants();

  const onChange = (newValue: string) => {
    setValue(newValue);
  };

  const filteredParticipants = useMemo(() => {
    const deduped = participants.reduce((acc, participant) => {
      const hostAsViewer = `host-${participant.identity}`;
      if (!acc.some((p) => p.identity === hostAsViewer)) {
        acc.push(participant);
      }
      return acc;
    }, [] as (RemoteParticipant | LocalParticipant)[]);

    return deduped.filter((participant) =>
      participant.name?.toLowerCase().includes(debouncedValue[0].toLowerCase())
    );
  }, [participants, debouncedValue]);

  console.log("aber", filteredParticipants);

  if (isHidden) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">Community is disabled</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Input
        onChange={(e) => onChange(e.target?.value)}
        placeholder="Search community"
        className="border-white/10"
      />
      <ScrollArea className="gap-y-2 mt-4">
        <p className="text-center text-sm text-muted-foreground hidden last:block p-2">
          No results
        </p>
        {filteredParticipants.map((participant) => {
          return (
            <CommunityItem
              key={participant.identity}
              hostName={hostName}
              viewerName={viewerName}
              participantName={participant.name}
              participantIdentity={participant.identity}
            />
          );
        })}
      </ScrollArea>
    </div>
  );
};

export default ChatCommunity;
