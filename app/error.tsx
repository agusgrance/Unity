"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect } from "react";

interface ErrorPageProps {
  error: Error;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ error }) => {
  useEffect(() => {
    if (error) {
      console.error("Error details:", error);
    }
  }, [error]);

  return (
    <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
      <p>Something went wrong</p>
      <Button variant="secondary" asChild>
        <Link href="/">Go back home</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
