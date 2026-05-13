/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/context/**/*.{js,jsx,ts,tsx}",
    "./src/Hooks/**/*.{js,jsx,ts,tsx}",
    "./src/app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#b9404f",
        primary_dark: "#8f2637",
        secondary: "#151515",
        secondary_soft: "#2a2927",
        tertiary: "#e6b84f",
        success: "#1f7a5a",
        off_white: "#fbfaf8",
        cream: "#f3eee7",
        cream_soft: "#f5eee5",
        surface: "#ffffff",
        ink: "#101114",
        muted: "#6f6a63",
        muted_dark: "#514c45",
        muted_light: "#9b9288",
        border_color: "#e7e1d8",
        border_soft: "#e5ddd2",
        border_warm: "#ded6ca",
        image_wash: "#eee7dd",
        blush: "#ffe2e6",
      },
      boxShadow: {
        premium: "0 24px 70px rgba(20, 17, 14, 0.16)",
        soft: "0 24px 80px rgba(24, 21, 18, 0.12)",
      },
      keyframes: {
        ripple: {
          "0%": { boxShadow: "0 0 0 0 rgba(185, 64, 79, 0.42)" },
          "70%": { boxShadow: "0 0 0 30px rgba(185, 64, 79, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(185, 64, 79, 0)" },
        },
        shine: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        ripple: "ripple 2s infinite",
        shine: "shine 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
