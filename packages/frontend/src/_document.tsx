import { useState } from "react";
import { Outlet, Link } from "@tanstack/react-router";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Avatar,
  Tooltip,
  Spacer,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
} from "@nextui-org/react";
import { Login, Menu2, Sun } from "tabler-icons-react";
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
    <div className={`${darkMode ? "dark" : ""} text-foreground bg-background bg-gradient-to-r from-slate-300 to-50% w-screen h-screen`}>
      <div className="flex flex-col">
        <Navbar className="bg-gradient-to-r from-red-600/20 via-blue-300 bg-purple-500/80 hover:via-blue-200 transition-colors backdrop-blur-sm shadow-md rounded-b-sm">
          <NavbarBrand>
            <Tooltip content="callstack" color="secondary">
              <Link to="/">callstack</Link>
            </Tooltip>
          </NavbarBrand>
          <NavbarContent className="flex gap-4" justify="start">
            <NavbarItem isActive>
              <Link to="/auth/users">ユーザ一覧</Link>
            </NavbarItem>
            <NavbarItem isActive>
              <Link to="/auth/posts">投稿一覧</Link>
            </NavbarItem>
          </NavbarContent>
          <NavbarContent justify="end">
            <>
              {/* 十分に画面サイズが大きい場合 */}
              <NavbarItem className="hidden sm:flex gap-4">
                <Tooltip content="スタイル切替" color="secondary">
                  <Button isIconOnly variant="light" onClick={toggleDarkMode} className="hover:bg-secondary">
                    <Sun size={20} />
                  </Button>
                </Tooltip>
                {isAuthenticated ? (
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform hover:scale-110"
                    color="secondary"
                    name="Jason Hughes"
                    size="sm"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  />
                ) : (
                  <Tooltip content="ログイン/登録" color="secondary">
                    <Button color="primary" variant="shadow" className="hover:-translate-y-1">
                      <Link to="/auth/posts">
                        <Login size={20} />
                      </Link>
                    </Button>
                  </Tooltip>
                )}
              </NavbarItem>
              {/* 画面サイズが小さい場合 */}
              <NavbarItem className="flex sm:hidden gap-4">
                <Dropdown>
                  <DropdownTrigger>
                    <Button color="secondary" variant="light" className="hover:-translate-y-1">
                      <Menu2 size={20} />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem>
                      <Tooltip content="スタイル切替" color="secondary">
                        <Button isIconOnly color="secondary" variant="shadow" onClick={toggleDarkMode} className="hover:-translate-y-1">
                          <Sun size={20} />
                        </Button>
                      </Tooltip>
                    </DropdownItem>
                    <DropdownItem>
                      {isAuthenticated ? (
                        <Avatar
                          isBordered
                          as="button"
                          className="transition-transform hover:-translate-y-1"
                          color="secondary"
                          name="Jason Hughes"
                          size="sm"
                          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                        />
                      ) : (
                        <Tooltip content="ログイン/登録" color="secondary">
                          <Button color="primary" variant="shadow" className="hover:-translate-y-1">
                            <Link to="/auth/posts">
                              <Login size={20} />
                            </Link>
                          </Button>
                        </Tooltip>
                      )}
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavbarItem>
            </>
          </NavbarContent>
        </Navbar>
        <div>
          {" "}
          <Spacer y={40} />
          {/* ここで内側のコンポーネントを表示 */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};
