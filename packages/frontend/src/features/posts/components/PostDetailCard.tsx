import { Card, CardBody, CardFooter, CardHeader, Button, Dropdown, DropdownItem, DropdownTrigger, DropdownMenu, Image } from "@nextui-org/react";
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
    <div className="flex flex-col">
      <Image src="https://picsum.photos/200/300" className="w-full shadow-sm " />
      <Card isBlurred className="w-full m-2 bg-secondary" shadow="sm">
        <CardHeader>
          <div className="flex">
            <h1 className="text-2xl font-bold truncate">{post.title}</h1>
          </div>
        </CardHeader>
        <CardBody>
          <div className="grid grid-flow-col grid-cols-6 md:grid-cols-12 gap-2">
            <Card isBlurred className="w-full col-span-2"></Card>
            <div className="flex justify-between col-span-4 md:col-span-10">
              <p className="text-xl">{post.body}</p>
            </div>
          </div>
        </CardBody>
        <CardFooter className="justify-end">
          <div className="flex flex-row">
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
    </div>
  );
};

export { PostDetailCard };
