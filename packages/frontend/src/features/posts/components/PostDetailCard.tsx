import { Card, CardBody, CardFooter, CardHeader, Button, Dropdown, DropdownItem, DropdownTrigger, DropdownMenu } from "@nextui-org/react";
import { graphql } from "src/lib/generated/gql";
import { FragmentType, useFragment } from "src/lib/generated";
import { UserCardForPost } from "./UserCardForPost";

// クエリするフラグメントを定義
const PostDetailFragment = graphql(`
  fragment PostDetailFragment on Post {
    post_uuid
    title
    body
    created_at
    updated_at
    is_public
    user {
      ...UserPopupFragment
    }
  }
`);

const PostDetailCard = ({ post: post_frag }: { post: FragmentType<typeof PostDetailFragment> }) => {
  // フラグメントの型を指定して対応するデータを取得
  const post = useFragment(PostDetailFragment, post_frag);

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
            <p className="text-xl">{post.body}</p>
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
        </div>
      </CardFooter>
    </Card>
  );
};

export { PostDetailCard };
