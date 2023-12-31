import { Link } from "@tanstack/react-router";
import { Card, CardBody, CardFooter, Button, Image, Spacer } from "@nextui-org/react";
import { FragmentType, useFragment } from "src/lib/generated";
import { graphql } from "src/lib/generated/gql";

// クエリするフラグメントを定義
const UserFragment = graphql(`
  fragment UserFragment on User {
    user_uuid
    handle
    screen_name
    bio
    image_url
  }
`);

const UserCard = ({ user: user_flag }: { user: FragmentType<typeof UserFragment> }) => {
  // フラグメントの型を指定して対応するデータを取得
  const user = useFragment(UserFragment, user_flag);

  return (
    <div className="flex flex-row justify-between">
      <Card isBlurred className="w-full bg-secondary relative" shadow="sm">
        <Image
          src={user.image_url}
          width={200}
          height={200}
          radius="full"
          removeWrapper
          className="shadow-md absolute top-1/2 -left-16 transform -translate-y-1/2"
        />
        <div className="flex flex-row justify-between">
          <Spacer x={36} />
          <CardBody>
            <div className="grid grid-flow-col grid-cols-6 md:grid-cols-12">
              <div className="flex flex-col justify-start col-span-6">
                <h1 className="text-2xl font-bold truncate">{user.screen_name}</h1>
                <p className="text-xl line-clamp-3">@{user.handle}</p>
              </div>
              <div className="flex col-span-4 md:col-span-10">
                <p className="text-xl line-clamp-3">{user.bio}</p>
              </div>
            </div>
          </CardBody>
        </div>
        <CardFooter className="justify-end">
          <div className="flex flex-row">
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
    </div>
  );
};

export { UserCard };
