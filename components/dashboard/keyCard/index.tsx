"use client";

// React
import React, { useState } from "react";

// Components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CopyButton from "@/components/dashboard/copyButton";

interface Props {
  value: string | null;
}

const KeyCard = ({ value }: Props) => {
  const [show, setShow] = useState(false);
  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-start gap-x-10">
        <p className="font-semibold shrink-0">Stream Key</p>
        <div className="space-y-2 w-full">
          <div className="w-full flex items-center gap-x-2">
            <Input
              value={value || ""}
              type={show ? "text" : "password"}
              disabled
              placeholder="Stream key"
            />
            <CopyButton value={value || ""} />
          </div>
          <Button onClick={() => setShow(!show)} size="sm" variant="link">
            {show ? "Hide" : "Show"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default KeyCard;
