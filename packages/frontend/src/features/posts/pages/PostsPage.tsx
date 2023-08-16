import { useQuery } from "urql";
import { graphql } from "src/lib/generated/gql";
import { PostCard } from "../components/PostCard";
import { Spinner } from "@nextui-org/react";

// 利用されるクエリの定義
const GetAllPostsQuery = graphql(`
  query GetAllPostsQuery {
    getAllPosts(limit: 10) {
      ...PostFragment
    }
  }
`);

const PostsPage = () => {
  // graphqlに対してクエリを実行
  const [result] = useQuery({
    query: GetAllPostsQuery,
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
      <div className="flex flex-col w-8/12">
        {data?.getAllPosts.map((post, i) => (
          <PostCard key={i} post={post} />
        ))}
      </div>
    </div>
  );
  // graphqlのフラグメントマスキングでやむを得ずmapのkeyでiを使っているので、少し心配
};

export { PostsPage };
