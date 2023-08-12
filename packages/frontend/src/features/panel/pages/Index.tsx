import { useQuery } from "urql";
import { graphql } from "src/lib/generated/gql";
import { PostCard } from "../components/PostCard";
import { Spinner } from "@nextui-org/react";

const PanelPageQuery = graphql(`
  query PanelPageQuery {
    getAllPosts(limit: 10) {
      post_uuid
      title
      body
    }
  }
`);

export const PanelPage = () => {
  // graphqlに対してクエリを実行
  const [result] = useQuery({
    query: PanelPageQuery,
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
        {data?.getAllPosts.map((post) => (
          <PostCard key={post.post_uuid} post={post} />
        ))}
      </div>
    </div>
  );
};
