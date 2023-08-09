import { NextUIProvider, Button } from "@nextui-org/react";
import { Client, Provider, cacheExchange, fetchExchange } from "urql";
import { Outlet, Link } from "@tanstack/react-router";
import "./index.css"


const urql_client = new Client({
  url: "http://localhost:4000/graphql", // TODO: 環境変数から取得する
  exchanges: [cacheExchange, fetchExchange],
});

export const App = () => {
  return (
    <Provider value={urql_client}>
      <NextUIProvider>
        <Button color="secondary">
          Button
        </Button>
        <Outlet />

        <Link to="/">Home</Link>
        
      </NextUIProvider>
  </Provider>
  );
};
