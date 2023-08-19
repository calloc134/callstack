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
            default: "#ebe9d4", // 中立的なデフォルト色
            background: "#FBF8F1", // 薄い色で柔らかい背景
            foreground: "#4e4e4e", // 読みやすさを保つためのフォント色
            primary: "#54BAB9", // 主要な色で、強調したい場所に使用
            secondary: "#fff8e5", // 補助的な色で、主要色とのバランスを取る
            success: "#28a745", // 成功を示す色
            warning: "#ffc107", // 警告に使用
            danger: "#dc3545", // 危険を示す色で、緊急性を強調
            divider: "#e0e0e0", // 区切り線に使用、目立たず機能する色
            overlay: "#FBF8F1", // モーダルなどに使用、背景と調和する色
            focus: "#54BAB9", // フォーカス時に使用、強調したい部分に目を引く色
            content1: "#FBF8F1", // コンテンツ階層1
            content2: "#F7ECDE", // コンテンツ階層2
            content3: "#F7ECDE", // コンテンツ階層3
            content4: "#F7ECDE", // コンテンツ階層4
          },
        },
        dark: {
          colors: {
            default: "#54BAB9", // 中立的なデフォルト色
            background: "#2e2e2e", // より暗い背景
            foreground: "#FFFFFF", // 白い文字色
            primary: "#54BAB9", // 主要な色で、強調したい場所に使用
            secondary: "#3e3e3e", // 補助的な色で、主要色とのバランスを取る（暗い色）
            success: "#28a745", // 成功を示す色
            warning: "#ffc107", // 警告に使用
            danger: "#dc3545", // 危険を示す色で、緊急性を強調
            divider: "#3e3e3e", // 区切り線に使用、目立たず機能する暗い色
            overlay: "#2e2e2e", // モーダルなどに使用、背景と調和するより暗い色
            focus: "#54BAB9", // フォーカス時に使用、強調したい部分に目を引く色
            content1: "#2e2e2e", // コンテンツ階層1（より暗い背景）
            content2: "#3e3e3e", // コンテンツ階層2（暗い背景）
            content3: "#4e4e4e", // コンテンツ階層3（少し明るい背景）
            content4: "#5e5e5e", // コンテンツ階層4（さらに明るい背景）
          },
        },
      },
    }),
  ],
};
