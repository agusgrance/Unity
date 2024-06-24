"use client";

// React
import React, { useState } from "react";

// Components
import { Button } from "@/components/ui/button";

// Assets
import { CheckCheck, CopyIcon } from "lucide-react";

interface Props {
  value?: string;
}
const CopyButton = ({ value }: Props) => {
  const [isCopied, setIsCopied] = useState(false);
  const onCopy = () => {
    if (!value) return;
    setIsCopied(true);
    navigator.clipboard.writeText(value);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const Icon = isCopied ? CheckCheck : CopyIcon;
  return (
    <Button
      onClick={onCopy}
      disabled={!value || isCopied}
      variant="ghost"
      size="sm"
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
};

export default CopyButton;
