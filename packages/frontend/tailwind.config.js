// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/features/**/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: ["media", "class"],
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            default: "#4e4e4e",
            background: "#f5f5f5",
            foreground: "#4e4e4e",
            primary: "#7828c8",
            secondary: "#9353d3",
            success: "#4caf50",
            warning: "#ff9800",
            danger: "#f44336",
            divider: "#e0e0e0",
            overlay: "#f0e5ff",
            focus: "#aa00ff",
            content1: "#5e5e5e",
            content2: "#6e6e6e",
            content3: "#7e7e7e",
            content4: "#8e8e8e",
          },
        },
        dark: {
          colors: {
            default: "#f5f5f5",
            background: "#1e1e1e",
            foreground: "#f5f5f5",
            primary: "#9353d3",
            secondary: "#7828c8",
            success: "#4caf50",
            warning: "#ff9800",
            danger: "#f44336",
            divider: "#4e4e4e",
            overlay: "#3e3e3e",
            focus: "#aa00ff",
            content1: "#2e2e2e",
            content2: "#3e3e3e",
            content3: "#4e4e4e",
            content4: "#5e5e5e",
          },
        },
      },
    }),
  ],
};
