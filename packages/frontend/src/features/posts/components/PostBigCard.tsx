import { Link, useParams } from "@tanstack/react-router";
import { Card, CardBody, CardFooter, Button, Dropdown, DropdownItem, DropdownTrigger, DropdownMenu } from "@nextui-org/react";
import { graphql } from "src/lib/generated/gql";
import { FragmentType, useFragment } from "src/lib/generated";
import { UserCard } from "./UserCard";

// 利用される投稿のフラグメントの定義
const PostByUUIDPostFragment = graphql(`
  fragment PostByUUIDPostFragment on Post {
    post_uuid
    title
    body
    created_at
    updated_at
    is_public
    user {
      ...UserFragment
    }
  }
`);

const PostDetailCard = ({ post: post_frag }: { post: FragmentType<typeof PostByUUIDPostFragment> }) => {
  // フラグメントから投稿の情報を取得
  const post = useFragment(PostByUUIDPostFragment, post_frag);

  return (
    <Card isBlurred className="min-w-full m-2 bg-secondary backdrop-blur-sm" shadow="sm">
      <CardBody>
        <div className="grid grid-flow-col grid-cols-6 md:grid-cols-12 gap-2">
          <div className="flex justify-between col-span-2">
            <h1 className="text-2xl font-bold">{post.title}</h1>
          </div>
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
                <UserCard user={post.user} />
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </CardFooter>
    </Card>
  );
};

export { PostDetailCard };
