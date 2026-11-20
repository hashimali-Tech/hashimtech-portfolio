import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        "surface-hover": "var(--surface-hover)",
        border: "var(--border)",
        text: "var(--text)",
        muted: "var(--muted)",
        brand: "var(--brand)",
        "brand-2": "var(--brand-2)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        sm: "12px",
        card: "20px",
        pill: "9999px",
      },
      boxShadow: {
        elevation: "0 16px 36px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px var(--border)",
      },
    },
  },
  plugins: [],
};

export default config;
