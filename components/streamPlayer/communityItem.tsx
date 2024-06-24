// React
import React, { useTransition } from "react";

// Actions
import { onBlock } from "@/actions/block";

// Utils
import { cn, stringToColor } from "@/lib/utils";

// Components
import Hint from "@/components/ui/hint";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Assets
import { MinusCircle } from "lucide-react";

interface Props {
  hostName: string;
  viewerName: string;
  participantName?: string;
  participantIdentity: string;
}

const CommunityItem = ({
  hostName,
  viewerName,
  participantName,
  participantIdentity,
}: Props) => {
  const [isPending, startTransition] = useTransition();

  const color = stringToColor(participantName || "");
  const isSelf = participantName === viewerName;
  const isHost = viewerName === hostName;

  const handleBlock = () => {
    if (!participantName || isSelf || !isHost) return;

    startTransition(() => {
      onBlock(participantIdentity)
        .then(() => toast.success(`Blocked ${participantName}`))
        .catch(() => toast.error("Something went wrong"));
    });
  };
  return (
    <div
      className={cn(
        "group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",
        isPending && "opacity-50 pointer-events-none"
      )}
    >
      <p style={{ color }}>{participantName}</p>
      {isHost && !isSelf && (
        <Hint label="Block">
          <Button
            variant="ghost"
            disabled={isPending}
            onClick={handleBlock}
            className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition"
          >
            <MinusCircle className="h-4 w-4 text-muted-foreground" />
          </Button>
        </Hint>
      )}
    </div>
  );
};

export default CommunityItem;
