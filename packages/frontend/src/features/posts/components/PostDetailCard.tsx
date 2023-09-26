import { Card, CardBody, CardFooter, CardHeader, Button, Image, Spacer } from "@nextui-org/react";
import { DotsVertical, Heart, MessageChatbot } from "tabler-icons-react";
import { graphql } from "src/lib/generated/gql";
import { FragmentType, useFragment } from "src/lib/generated";
import { UserCard } from "src/features/users/components/UserCard";

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
      ...UserFragment
    }
  }
`);

const PostDetailCard = ({ post: post_frag }: { post: FragmentType<typeof PostDetailFragment> }) => {
  // フラグメントの型を指定して対応するデータを取得
  const post = useFragment(PostDetailFragment, post_frag);

  return (
    <div className="flex flex-col gap-2">
      <Image src="https://picsum.photos/1500/200" width={1500} height={200} className="w-full shadow-sm" />
      <div className="grid grid-cols-6 flex-row gap-2">
        <Card isBlurred className="w-full bg-secondary col-span-5" shadow="sm">
          <CardHeader>
            <div className="flex">
              <h1 className="text-2xl font-bold truncate">{post.title}</h1>
            </div>
          </CardHeader>
          <CardBody>
            <div className="grid grid-flow-col grid-cols-6 md:grid-cols-12 gap-2">
              <div className="flex justify-between col-span-4 md:col-span-10">
                <p className="text-xl">{post.body}</p>
              </div>
            </div>
          </CardBody>
          <CardFooter className="justify-end"></CardFooter>
        </Card>
        <Card isBlurred className="col-span-1 h-full" shadow="md">
          <CardBody className="flex flex-col justify-center">
            <Button radius="full" className="flex flex-row gap-2">
              <Heart size={24} strokeWidth={1.5} />
              <p>10</p>
            </Button>
            <Button radius="full" className="flex flex-row gap-2">
              <MessageChatbot size={24} strokeWidth={1.5} />
              <p>10</p>
            </Button>
            <Button variant="light" radius="full">
              <DotsVertical size={24} strokeWidth={1.5} />
            </Button>
          </CardBody>
        </Card>
      </div>
      <Spacer y={8} />
      <UserCard user={post.user} />
    </div>
  );
};

export { PostDetailCard };
