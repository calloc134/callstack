import { Link } from "@tanstack/react-router";
import { Card, CardBody, CardFooter, Button } from "@nextui-org/react";
import { graphql } from "src/lib/generated/gql";
import { FragmentType, useFragment } from "src/lib/generated";

// 利用されるユーザのフラグメントの定義
const UserFragment = graphql(`
  fragment UserFragment on User {
    user_uuid
    handle
    screen_name
    bio
  }
`);

const UserCard = ({ user: user_frag }: { user: FragmentType<typeof UserFragment> }) => {
  // フラグメントから投稿の情報を取得
  const user = useFragment(UserFragment, user_frag);

  return (
    <Card isBlurred className="min-w-full m-2 bg-secondary backdrop-blur-sm" shadow="sm">
      <CardBody>
        <div className="grid grid-flow-col grid-cols-6 md:grid-cols-12 gap-2">
          <div className="flex justify-between col-span-2">
            <h1 className="text-2xl font-bold">{user.screen_name}</h1>
          </div>
          <div className="flex justify-between col-span-4 md:col-span-10">
            <p className="text-xl">{user.bio}</p>
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex flex-col justify-end items-end">
        <div>
          <Button color="primary" variant="shadow" className="rounded-full hover:-translate-y-1">
            <Link to={`/auth/panel/user/${user.handle}`}>詳細を見る</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export { UserCard };
