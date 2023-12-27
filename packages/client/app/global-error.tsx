"use client";

import Link from "next/link";
import { AlertIcon, ArrowLeftIcon } from "@primer/octicons-react";
import Button from "@/components/button";
import { cn } from "@/lib/utils";

const GlobalError = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <html>
      <body
        className={cn(
          "min-h-screen bg-background text-foreground max-w-screen-md mx-auto",
          "flex flex-col justify-center items-center gap-4 p-4",
        )}>
        <p
          className={cn(
            "bg-[--danger-bg] border-[--danger-bg-muted]",
            "p-4 border rounded-md flex items-center gap-2",
          )}>
          <AlertIcon className="text-[--danger-fg]" />
          <div>
            <p>Error occured. </p>
            <p>[{error.message}]</p>
          </div>
        </p>
        <div className="flex items-center gap-4">
          <Button
            onClick={reset}
            className={cn(
              "bg-[--danger-fg] hover:border-transparent",
              "hover:bg-[--danger-bg-muted] text-white transition-colors duration-200",
            )}>
            Try again
          </Button>
          <Link href="/">
            <Button className="flex items-center gap-2">
              <ArrowLeftIcon />
              <p>Go home</p>
            </Button>
          </Link>
        </div>
      </body>
    </html>
  );
};

export default GlobalError;
