import { Link } from "@tanstack/react-router";
import { Card, CardBody, CardFooter, Button } from "@nextui-org/react";
import { FragmentType, useFragment } from "src/lib/generated";
import { graphql } from "src/lib/generated/gql";

// クエリするフラグメントを定義
const UserPopupFragment = graphql(`
  fragment UserPopupFragment on User {
    user_uuid
    handle
    screen_name
    bio
  }
`);

const UserCardForPost = ({ user: user_frag }: { user: FragmentType<typeof UserPopupFragment> }) => {
  // フラグメントの型を指定して対応するデータを取得
  const user = useFragment(UserPopupFragment, user_frag);

  return (
    <Card isBlurred className="min-w-full m-2 bg-secondary backdrop-blur-sm" shadow="sm">
      <CardBody>
        <div className="grid grid-flow-col grid-cols-6 md:grid-cols-12 gap-2 align-start">
          <div className="flex flex-col justify-start col-span-2">
            <h1 className="text-2xl font-bold">{user.screen_name}</h1>
            <p className="text-xl line-clamp-3">@{user.handle}</p>
          </div>
          <div className="flex justify-between col-span-4 md:col-span-10">
            <p className="text-xl truncate">{user.bio}</p>
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex flex-col justify-end items-end">
        <div>
          <Button color="primary" variant="shadow" className="rounded-full hover:-translate-y-1">
            <Link
              to="/auth/users/$user_uuid"
              params={{
                user_uuid: user.user_uuid,
              }}
            >
              詳細を見る
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export { UserCardForPost };
