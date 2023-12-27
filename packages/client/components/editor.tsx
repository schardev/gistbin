import type { EditorProps } from "@bytemd/react";
import { Editor as ByteMDEditor } from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import gemoji from "@bytemd/plugin-gemoji";
import prettyCode from "@/lib/bytemd-plugin-highlight";
import { MAX_TEXT_LENGTH } from "@/lib/constants";

const plugins = [gfm(), gemoji(), prettyCode()];

const Editor = ({
  value,
  onChange,
}: Pick<EditorProps, "value" | "onChange">) => {
  return (
    // TODO: set max length
    <ByteMDEditor
      mode="split"
      plugins={plugins}
      value={value}
      onChange={onChange}
      previewDebounce={1000}
      maxLength={MAX_TEXT_LENGTH}
      editorConfig={{
        theme: "github",
        mode: {
          name: "gfm",
          highlightFormatting: true,
        },
      }}
    />
  );
};

export default Editor;
