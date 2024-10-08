// React
import React from "react";

// Components
import UrlCard from "@/components/dashboard/urlCard";
import KeyCard from "@/components/dashboard/keyCard";
import ConnectModel from "@/components/dashboard/connectModel";

// Services
import { getSelf } from "@/lib/auth-service";
import { getStreamByUserId } from "@/lib/stream-service";

const KeysPage = async () => {
  const self = await getSelf();
  const stream = await getStreamByUserId(self.id);

  if (!stream) throw new Error("Stream not found");

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Keys & URLs</h1>

        <ConnectModel />
      </div>
      <div className="space-y-4">
        <UrlCard value={stream.serverUrl} />
        <KeyCard value={stream.streamKey} />
      </div>
    </div>
  );
};

export default KeysPage;
