import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        moveCloudsLeft: {
          "0%": { left: "-200px" },
          "100%": { left: "100vw" },
        },
        moveCloudsRight: {
          "0%": { right: "-200px" },
          "100%": { right: "100vw" },
        },
      },
      animation: {
        moveCloudsLeft: "moveCloudsLeft 42s linear infinite",
        moveCloudsRight: "moveCloudsRight 45s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
