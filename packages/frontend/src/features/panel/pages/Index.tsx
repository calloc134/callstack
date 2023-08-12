import { useQuery } from "urql";
import { graphql } from "src/lib/generated/gql";
import { PostCard } from "../components/PostCard";

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

  console.log("result", result);

  const { data } = result;

  return (
    <div className="flex flex-col items-center justify-between">
      {data?.getAllPosts.map((post) => (
        <PostCard key={post.post_uuid} post={post} />
      ))}
    </div>
  );
};
