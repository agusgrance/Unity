"use client";

// React
import React, { useRef, useState, useEffect } from "react";

// Livekit
import { Participant, Track } from "livekit-client";
import { useTracks } from "@livekit/components-react";

interface Props {
  participant: Participant;
}
const LiveVideo = ({ participant }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [volume, setVolume] = useState(0);

  const onVolumeChange = (value: number) => {
    setVolume(+value);
    if (videoRef?.current) {
      videoRef.current.muted = value === 0;
      videoRef.current.volume = +value * 0.01;
    }
  };

  const toggleMute = () => {
    const isMuted = volume === 0;

    setVolume(isMuted ? 50 : 0);
    if (videoRef?.current) {
      videoRef.current.muted = !isMuted;
      videoRef.current.volume = isMuted ? 0.5 : 0;
    }
  };

  useEffect(() => {
    onVolumeChange(0);
  }, []);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current);
      }
    });

  return (
    <div ref={wrapperRef} className="relative h-full flex">
      <video controls ref={videoRef} width="100%" />
    </div>
  );
};

export default LiveVideo;
