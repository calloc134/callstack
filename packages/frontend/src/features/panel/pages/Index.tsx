import { useQuery } from "urql";
import { graphql } from "src/lib/generated/gql";

const PanelPageQuery = graphql(`
  query PanelPageQuery($uuid: UUID!) {
    post(uuid: $uuid) {
      user {
        screen_name
      }
      title
    }
  }
`);

export const PanelPage = () => {
  // graphqlに対してクエリを実行
  const [result] = useQuery({
    query: PanelPageQuery,
    variables: {
      uuid: "3d5e1bde-19fa-4f56-819a-decd1e422ea9",
    },
  });

  console.log("result", result);

  const { data } = result;

  return (
    <div>
      {data?.post.title}
      HELLOEHHHEHHHEHEHEH
    </div>
  );
};
