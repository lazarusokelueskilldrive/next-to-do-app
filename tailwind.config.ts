import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'main-bg': "url('/bg.jpg')",
      },
      height:{
        '99':'29rem',
        'screen-h':'100vh'
      }
    },
  },
  plugins: [],
} satisfies Config;
