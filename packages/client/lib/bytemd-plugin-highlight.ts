import type { BytemdPlugin } from "bytemd";
import { SITE_URL } from "./constants";

export default function prettyCode(): BytemdPlugin {
  return {
    viewerEffect(ctx) {
      (async () => {
        const preArr = ctx.markdownBody.querySelectorAll("pre");

        for (const pre of preArr) {
          const code = pre.querySelector("code");
          if (!code) continue;

          const lang = code.className.includes("language")
            ? code.className.replace("language-", "")
            : null;

          if (!lang || !code.textContent?.trim()) continue;

          const text = "```" + `${lang}\n` + code.textContent + "```";
          try {
            const res = await fetch(`${SITE_URL}/api/preview/markdown`, {
              method: "POST",
              body: text,
            });

            if (res.ok) {
              pre.outerHTML = await res.text();
            }
          } catch (error) {
            console.error(error);
          }
        }
      })();
    },
  };
}
