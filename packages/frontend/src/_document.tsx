import { Outlet } from "@tanstack/react-router";

// 外枠のコンポーネント
export const Document = () => {
  return (
    <>
      // タイトル
      <h1>Document</h1>
      // ここに内側のコンポーネントが入る
      <Outlet />
    </>
  );
};
