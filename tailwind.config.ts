import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: { "3xl": "1920px", xs: "480px" },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "dark-blue": "rgb(var(--color-dark-blue) / <alpha-value>)",
        "dark-green": "rgb(var(--color-dark-green) / <alpha-value>)",
        green: "rgb(var(--color-green) / <alpha-value>)",
        "swamp-green": "rgb(var(--color-swamp-green) / <alpha-value>)",
      },
    },
  },
  plugins: [],
}
export default config
