import { useState } from "react";
import { Outlet, Link } from "@tanstack/react-router";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Avatar, Tooltip, Spacer } from "@nextui-org/react";
import { Login, Sun } from "tabler-icons-react";
import { useAuthn } from "./lib/provider/authn/useAuthn";

// 外枠のコンポーネント
export const Document = () => {
  // 認証しているかを取得
  const { isAuthenticated } = useAuthn();

  // ダークモードの設定
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${darkMode ? "dark" : ""} text-foreground bg-background`}>
      <div className="h-screen flex flex-col">
        {/* ここで全画面の高さを設定 */}
        {/* 透明度50% すりガラス風にして影を付ける */}
        <Navbar className="flex-shrink-0 bg-primary/30 backdrop-blur-sm shadow-xl rounded-b-lg" shouldHideOnScroll>
          {/* ナビゲーションバーの高さを固定 */}
          <NavbarBrand>
            <Tooltip content="タイトル" color="secondary">
              <p className="font-bold text-inherit">callstack</p>
            </Tooltip>
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-4" justify="start">
            <NavbarItem>
              <Link to="/">見る</Link>
            </NavbarItem>
            <NavbarItem isActive>
              <Link to="/">出品する</Link>
            </NavbarItem>
          </NavbarContent>
          <NavbarContent justify="end">
            <NavbarItem className="sm:flex gap-4">
              <Tooltip content="スタイル切替" color="secondary">
                <Button color="secondary" variant="shadow" onClick={toggleDarkMode}>
                  <Sun size={20} />
                </Button>
              </Tooltip>
              <Tooltip content="ログイン/登録" color="secondary">
                {isAuthenticated ? (
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    name="Jason Hughes"
                    size="sm"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  />
                ) : (
                  <Button color="primary" variant="shadow">
                    <Link to="/">
                      <Login size={20} />
                    </Link>
                  </Button>
                )}
              </Tooltip>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
        <div className="flex-grow overflow-auto">
          {" "}
          {/* ここで内側のコンポーネントを伸縮させる */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};
