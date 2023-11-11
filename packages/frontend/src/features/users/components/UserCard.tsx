import { Link } from "@tanstack/react-router";
import { Card, Button, Image } from "@nextui-org/react";
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
      <Card isBlurred className="w-full bg-secondary relative flex flex-row" shadow="sm">
        <div className="h-full relative aspect-[3/4]">
          <Image
            src={user.image_url}
            width={200}
            height={200}
            radius="full"
            removeWrapper
            className="shadow-md aspect-square max-w-none absolute top-1/2 transform -left-1/2 -translate-y-1/2 h-full w-auto"
          />
        </div>
        <div className="flex flex-col justify-between overflow-x-auto w-full m-2 gap-2">
          {/* <Spacer x={36} /> */}
          {/* <div className="grid grid-flow-col grid-cols-6 md:grid-cols-12">
              <div className="flex flex-col justify-start col-span-6">
                <h1 className="text-2xl font-bold truncate">{user.screen_name}</h1>
                <p className="text-xl line-clamp-3">@{user.handle}</p>
              </div>
              <div className="flex col-span-4 md:col-span-10">
                <p className="text-xl line-clamp-3">{user.bio}</p>
              </div>
            </div> */}
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col justify-start md:w-4/12">
              <h1 className="text-base md:text-2xl font-bold truncate">{user.screen_name}</h1>
              <p className="text-sm md:text-xl truncate">@{user.handle}</p>
            </div>
            <div className="flex md:w-8/12">
              <p className="text-sm md:text-xl line-clamp-3">{user.bio}</p>
            </div>
          </div>
          <div className="flex flex-row justify-end">
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
          {/* <CardBody className="pl-0 pb-0">
          </CardBody>
          <CardFooter className="justify-end">
          </CardFooter> */}
        </div>
      </Card>
    </div>
  );
};

export { UserCard };
