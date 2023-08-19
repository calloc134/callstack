import { useQuery } from "urql";
import { graphql } from "src/lib/generated/gql";
import { PostDetailCard } from "../components/PostDetailCard";
import { Spinner } from "@nextui-org/react";
import { useParams } from "@tanstack/react-router";

// クエリするフラグメントを定義
const GetPostDetailQuery = graphql(`
  query GetPostDetailQuery($uuid: UUID!) {
    getPostByUUID(uuid: $uuid) {
      ...PostDetailFragment
    }
  }
`);

const PostDetailPage = () => {
  // URLパラメータより投稿のUUIDを取得
  const post_uuid = useParams({
    from: "/auth/posts/$post_uuid",
  })?.post_uuid;

  // クエリを行って投稿の情報を取得
  const [result] = useQuery({
    query: GetPostDetailQuery,
    variables: {
      uuid: post_uuid,
    },
  });

  // クエリの結果を取得
  const { data, fetching } = result;

  // ローディング中であれば
  if (fetching)
    return (
      <div className="flex flex-col items-center justify-center">
        <Spinner label="読み込み中..." color="warning" />
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-between h-screen">
      <div className="flex flex-col w-8/12">{data ? <PostDetailCard post={data.getPostByUUID} /> : <div>投稿が見つかりませんでした</div>}</div>
    </div>
  );
};

export { PostDetailPage };
