"use client";

// React
import React from "react";

// Livekit
import { ConnectionState, Track } from "livekit-client";
import {
  useConnectionState,
  useRemoteParticipant,
  useTracks,
} from "@livekit/components-react";

// Components
import { Skeleton } from "@/components/ui/skeleton";
import OfflineVideo from "./offlineVideo";
import LoadingVideo from "./loadingVideo";
import LiveVideo from "./liveVideo";

interface Props {
  hostName: string;
  hostIdentity: string;
}
const Video = ({ hostName, hostIdentity }: Props) => {
  const connectionState = useConnectionState();

  const participant = useRemoteParticipant(hostIdentity);
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((track) => track.participant.identity === hostIdentity);

  let content;

  if (!participant && connectionState === ConnectionState.Connected) {
    content = <OfflineVideo username={hostName} />;
  } else if (!participant || tracks.length === 0) {
    content = <LoadingVideo label={connectionState} />;
  } else {
    content = <LiveVideo participant={participant} />;
  }
  return <div className="aspect-video border-b group relative">{content}</div>;
};

export default Video;

export const VideoSkeleton = () => {
  return (
    <div className="aspect-video border-x border-background">
      <Skeleton className="h-full w-full rounded-none" />
    </div>
  );
};
