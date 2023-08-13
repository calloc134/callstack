import { useQuery } from "urql";
import { graphql } from "src/lib/generated/gql";
import { PostDetailCard } from "../components/PostDetailCard";
import { Spinner } from "@nextui-org/react";
import { useParams } from "@tanstack/react-router";

// 利用されるクエリの定義
const GetPostDetailQuery = graphql(`
  query GetPostDetailQuery($uuid: UUID!) {
    getPostByUUID(uuid: $uuid) {
      ...PostByUUIDPostFragment
    }
  }
`);

const PostDetailPage = () => {
  // パスパラメータの内容を取得
  const post_uuid = useParams({
    from: "/auth/posts/$post_uuid",
  })?.post_uuid;

  // graphqlに対してクエリを実行
  const [result] = useQuery({
    query: GetPostDetailQuery,
    variables: {
      uuid: post_uuid,
    },
  });

  const { data, fetching } = result;

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
