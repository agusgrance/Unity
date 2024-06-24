"use client";

// React
import React, { useTransition } from "react";

// Actions
import { updateStream } from "@/actions/stream";

// Components
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

// Types
type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";

interface Props {
  label: string;
  value: boolean;
  field: FieldTypes;
}

const ToggleCard = ({ label, value, field }: Props) => {
  const [isPending, startTransition] = useTransition();

  const onChange = () => {
    startTransition(() => {
      updateStream({ [field]: !value })
        .then(() => toast.success("Chat settings updated!"))
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">{label}</p>
        <div className="space-y-2">
          <Switch
            onCheckedChange={onChange}
            disabled={isPending}
            checked={value}
          >
            {value ? "On" : "Off"}
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default ToggleCard;

export const ToggleCardSkeleton = () => {
  return <Skeleton className="Rounded-xl p-10 w-full" />;
};
