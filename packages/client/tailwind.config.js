import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  corePlugins: { container: false },
  theme: {
    extend: {
      colors: {
        background: "var(--bg)",
        "background-muted": "var(--bg-muted)",
        foreground: "var(--fg)",
        "foreground-muted": "var(--fg-muted)",
      },
      borderColor: {
        focus: "var(--border-focus)",
        default: "var(--border-default)",
      },
      borderRadius: {
        inherit: "inherit",
      },
    },
  },
  plugins: [
    plugin(({ addUtilities, addVariant }) => {
      addVariant("hover-none", "@media (hover: none) and (pointer: coarse)");
      addUtilities({
        ".no-scrollbars": {
          scrollbarWidth: "none",

          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    }),
  ],
};

export default tailwindConfig;
