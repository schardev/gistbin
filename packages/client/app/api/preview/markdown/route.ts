import { generateHTMLFromMarkdown } from "@/lib/server-utils";

export const POST = async (req: Request) => {
  const contentType = req.headers.get("content-type")?.split(";")[0];
  if (!contentType || !contentType.includes("text/plain"))
    return Response.json(
      { error: "Content-Type not allowed" },
      { status: 400 },
    );

  try {
    const markdownText = await req.text();
    const html = await generateHTMLFromMarkdown(markdownText);
    return new Response(html, {
      headers: { "content-type": "text/html;charset=UTF-8" },
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
};
