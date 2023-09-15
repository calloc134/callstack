import { Link } from "@tanstack/react-router";
import { Card, CardBody, CardFooter, Button, Dropdown, DropdownItem, DropdownTrigger, DropdownMenu, CardHeader, Image } from "@nextui-org/react";
import { FragmentType, useFragment } from "src/lib/generated";
import { UserCardForPost } from "./UserCardForPost";
import { graphql } from "src/lib/generated/gql";
import { DotsVertical, Heart, MessageChatbot } from "tabler-icons-react";

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
    <div className="grid grid-cols-3 flex-row  gap-2 h-unit-72">
      <Card isBlurred className="col-span-1 h-full shadow-sm" shadow="sm">
        <Image src="https://picsum.photos/400" isZoomed className="h-full overflow-hidden" />
      </Card>

      <Card isBlurred className="col-span-2 w-full bg-secondary" shadow="sm">
        <CardHeader>
          <div className="flex">
            <h1 className="text-2xl font-bold truncate">{post.title}</h1>
          </div>
        </CardHeader>
        <CardBody>
          <div className="flex justify-between bg-background rounded-lg divide-x-2">
            <div className="flex m-2">
              <p className="text-xl line-clamp-3">{post.body}</p>
            </div>
            <div className="flex flex-col justify-end m-2">
              <div className="flex flex-row gap-2">
                <Heart size={24} strokeWidth={1.5} />
                10
              </div>
              <div className="flex flex-row gap-2">
                <MessageChatbot size={24} strokeWidth={1.5} />
                10
              </div>
              <Button isIconOnly variant="light" radius="full">
                <DotsVertical size={24} strokeWidth={1.5} />
              </Button>
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
    </div>
  );
};

export { PostCard };
