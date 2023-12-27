import { SITE_URL } from "@/lib/constants";
import { redis } from "@/lib/redis";
import type { Gist } from "@/lib/types";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";
import { CodeSquareIcon } from "@primer/octicons-react";
import Link from "next/link";
import Button from "@/components/button";
import ExpireDate from "@/components/date";
import Dialog from "@/components/dialog";

const Page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const gist = (await redis.hgetall(id)) as Gist;

  if (!gist) notFound();

  // get sanitized html from worker
  const res = await fetch(`${SITE_URL}/api/preview/markdown`, {
    method: "POST",
    body: gist.text,
  });

  if (!res.ok) {
    console.error(res.statusText);
    throw new Error("Error retrieving markup");
  }

  const markdown = await res.text();
  const ttl = await redis.pttl(id);
  const isBurnAfterRead = gist.expiration < 0;

  // immediately expire gist if it set to burn after read
  if (isBurnAfterRead) {
    await redis.expire(id, 0);
  }

  return (
    <div className="bg-background py-8 px-2 sm:px-4 lg:py-10">
      <div className="max-w-[900px] mx-auto">
        <div className="mb-4">
          {isBurnAfterRead ? (
            <Dialog variant="error">
              This gist will be deleted once you leave/reload this page.
            </Dialog>
          ) : (
            <ExpireDate ttl={ttl} />
          )}
        </div>
        <div className="border border-default rounded-md">
          <div
            className={cn(
              "bg-background-muted p-2 md:p-3 text-sm",
              "flex justify-between rounded-t-md",
            )}>
            <div className="flex gap-2 items-center">
              <CodeSquareIcon className="text-foreground-muted" />
              <p className="text-[--accent]">{params.id}</p>
            </div>
            <Button>
              <Link href={`${SITE_URL}/api/gist/${id}?raw=true`}>Raw</Link>
            </Button>
          </div>
          <div
            className={cn("markdown-body", "p-4 md:p-8 rounded-md")}
            dangerouslySetInnerHTML={{ __html: markdown }}></div>
        </div>
      </div>
    </div>
  );
};

export default Page;
