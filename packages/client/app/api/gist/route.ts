import {
  ID_MAX_LENGTH,
  ID_MIN_LENGTH,
  ID_SLUG_REGEX,
  MAX_TEXT_LENGTH,
} from "@/lib/constants";
import { redis } from "@/lib/redis";
import { getExpirationSeconds } from "@/lib/utils";
import { nanoid } from "nanoid";

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();
    const id = String(formData.get("id") || "g-" + nanoid(10));
    const text = String(formData.get("text") || "");
    const expiration = getExpirationSeconds(String(formData.get("expiration")));

    if (
      !ID_SLUG_REGEX.test(id) ||
      id.length < ID_MIN_LENGTH ||
      id.length > ID_MAX_LENGTH
    ) {
      return Response.json({ error: "Pattern not allowed" }, { status: 400 });
    }

    if (!text) {
      return Response.json({ error: "Text cannot be empty" }, { status: 400 });
    } else if (text.length > MAX_TEXT_LENGTH) {
      return Response.json({ error: "Text too large" }, { status: 413 });
    }

    const idAlreadyExists = await redis.exists(id);
    if (idAlreadyExists) {
      return Response.json({ error: "ID already exists" }, { status: 409 });
    }

    const res = await redis.hset(id, { expiration, text });
    if (expiration > 0) {
      await redis.expire(id, expiration);
    }

    if (res) {
      return Response.json({ expiration, id });
    }

    return Response.json(
      { error: "Failed to save gist. Try again." },
      { status: 400 },
    );
  } catch (error) {
    console.error(error);
    return new Response("Server error", { status: 500 });
  }
};
