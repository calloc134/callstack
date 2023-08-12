import { Button, Spacer } from "@nextui-org/react";
import { Link } from "@tanstack/react-router";

export const Index = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-start h-screen">
        <img src="/callstack.png" alt="callstack" className="w-unit-4xl" />
        <h1 className="text-4xl font-bold">callstack</h1>
        <p className="text-xl">callstackボイラープレートのサンプルです。</p>
        <Spacer y={4} />
        <Button color="primary" variant="shadow" className="rounded-full hover:-translate-y-1">
          <Link to="/auth/panel">ログイン/登録する</Link>
        </Button>

        <Spacer y={4} />

        <Spacer y={4} />
      </div>
    </>
  );
};
