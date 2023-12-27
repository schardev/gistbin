import type { Gist } from "@/lib/types";
import type { NextRequest } from "next/server";
import { redis } from "@/lib/redis";
import { redirect } from "next/navigation";
import { SITE_URL } from "@/lib/constants";

type RouteParams = { params: { id: string } };

export const GET = async (req: NextRequest, { params }: RouteParams) => {
  const id = params.id;
  const gist = (await redis.hgetall(id)) as Gist;
  if (!gist) return Response.json({ error: "Gist not found" }, { status: 404 });

  if (req.nextUrl.searchParams.get("raw") === "true") {
    return new Response(gist.text);
  }

  return redirect(`${SITE_URL}/${id}`);
};
