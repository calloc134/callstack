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
            default: "#4e4e4e", // 中立的なデフォルト色
            background: "#faf5ff", // 薄い紫で柔らかい背景
            foreground: "#4e4e4e", // 読みやすさを保つためのフォント色
            primary: "#df6bfd", // 主要な色で、強調したい場所に使用
            secondary: "#f6f5fe", // 補助的な色で、主要色とのバランスを取る
            success: "#6f42c1", // 成功を示す紫、信頼感と安心感を与える
            warning: "#e83e8c", // 警告に使用、紫ピンクで視認性を保つ
            danger: "#d6336c", // 危険を示す色で、緊急性を強調
            divider: "#e0e0e0", // 区切り線に使用、目立たず機能する色
            overlay: "#f0e5ff", // モーダルなどに使用、背景と調和する薄紫
            focus: "#aa00ff", // フォーカス時に使用、強調したい部分に目を引く紫
            content1: "#5e5e5e", // コンテンツ階層1
            content2: "#6e6e6e", // コンテンツ階層2
            content3: "#7e7e7e", // コンテンツ階層3
            content4: "#8e8e8e", // コンテンツ階層4
          },
        },
        dark: {
          colors: {
            default: "#f5f5f5", // 中立的なデフォルト色
            background: "#2e2b49", // ダークテーマ背景
            foreground: "#f4f6f8", // ダークテーマの読みやすいフォント色
            primary: "#df6bfd", // メインの紫、深みと複雑さを示す
            secondary: "#a9a1b1", // 補助的な紫、主要色との対比を提供
            success: "#6f42c1", // 成功を示す紫、安定感を与える
            warning: "#e83e8c", // 警告に使用、紫ピンクで視認性を保つ
            danger: "#d6336c", // 危険を示す色で、緊急性を強調
            divider: "#4e4e4e", // 区切り線に使用、ダークテーマに合う色
            overlay: "#3e3e3e", // モーダルなどに使用、背景と調和する色
            focus: "#aa00ff", // フォーカス時に使用、強調したい部分に目を引く紫
            content1: "#2e2e2e", // コンテンツ階層1
            content2: "#3e3e3e", // コンテンツ階層2
            content3: "#4e4e4e", // コンテンツ階層3
            content4: "#5e5e5e", // コンテンツ階層4
          },
        },
      },
    }),
  ],
};
