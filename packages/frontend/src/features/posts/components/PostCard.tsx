import { Link } from "@tanstack/react-router";
import { Card, CardBody, CardFooter, Button, Dropdown, DropdownItem, DropdownTrigger, DropdownMenu, CardHeader } from "@nextui-org/react";
import { FragmentType, useFragment } from "src/lib/generated";
import { UserCardForPost } from "./UserCardForPost";
import { graphql } from "src/lib/generated/gql";

// クエリするフラグメントを定義
const PostFragment = graphql(`
  fragment PostFragment on Post {
    post_uuid
    title
    body
    user {
      ...UserPopupFragment
    }
  }
`);

const PostCard = ({ post: post_frag }: { post: FragmentType<typeof PostFragment> }) => {
  // フラグメントの型を指定して対応するデータを取得
  const post = useFragment(PostFragment, post_frag);

  return (
    <Card isBlurred className="min-w-full m-2 bg-secondary backdrop-blur-sm" shadow="sm">
      <CardHeader className="flex justify-between items-center">
        <div className="flex justify-between col-span-2">
          <h1 className="text-2xl font-bold truncate">{post.title}</h1>
        </div>
      </CardHeader>
      <CardBody>
        <div className="grid grid-flow-col grid-cols-6 md:grid-cols-12 gap-2">
          <Card isBlurred className="min-w-full col-span-2"></Card>
          <div className="flex justify-between col-span-4 md:col-span-10">
            <p className="text-xl line-clamp-3">{post.body}</p>
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex flex-col justify-end items-end">
        <div>
          <Dropdown>
            <DropdownTrigger>
              <Button color="secondary" variant="shadow" className="rounded-full hover:-translate-y-1">
                ユーザのプロフィール
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem>
                <UserCardForPost user={post.user} />
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Button color="primary" variant="shadow" className="rounded-full hover:-translate-y-1">
            <Link
              to="/auth/posts/$post_uuid"
              params={{
                post_uuid: post.post_uuid,
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

export { PostCard };
