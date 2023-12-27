import "server-only";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkGemoji from "remark-gemoji";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export const generateHTMLFromMarkdown = async (
  text: string,
): Promise<string> => {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGemoji)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrettyCode, { keepBackground: false })
    .use(rehypeStringify)
    .process(text);

  return file.toString();
};
