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
  const [result, reexecuteQuery] = useQuery({
    query: PanelPageQuery,
    variables: {
      uuid: "b374ca3b-d580-4b01-b350-2025abfb62ad",
    },
  });

  console.log("result", result);

  const { data, fetching, error } = result;

  return (
    <div>
      {data?.post.title}
      HELLOEHHHEHHHEHEHEH
    </div>
  );
};
