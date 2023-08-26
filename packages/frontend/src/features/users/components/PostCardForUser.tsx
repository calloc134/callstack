import { Link } from "@tanstack/react-router";
import { Card, CardBody, CardFooter, Button } from "@nextui-org/react";
import { FragmentType, useFragment } from "src/lib/generated";
import { graphql } from "src/lib/generated/gql";

// クエリするフラグメントを定義
const PostPopupFragment = graphql(`
  fragment PostPopupFragment on Post {
    post_uuid
    title
    body
  }
`);

// フラグメントの定義
// ユーザ画面でポップアップとして表示される投稿カード
const PostCardForUser = ({ post: post_frag }: { post: FragmentType<typeof PostPopupFragment> }) => {
  // フラグメントの型を指定して対応するデータを取得
  const post = useFragment(PostPopupFragment, post_frag);

  return (
    <Card isBlurred className="w-full bg-secondary backdrop-blur-sm" shadow="sm">
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
      <CardFooter className="justify-end">
        <div className="flex flex-col">
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

export { PostCardForUser };
