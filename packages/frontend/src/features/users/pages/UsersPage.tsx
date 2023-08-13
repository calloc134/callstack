import { useQuery } from "urql";
import { graphql } from "src/lib/generated/gql";
import { Spinner } from "@nextui-org/react";
import { UserCard } from "../components/UserCard";

// 利用されるクエリの定義
const GetUsersQuery = graphql(`
  query GetUsersQuery {
    getAllUsers(limit: 10) {
      ...UserFragment
    }
  }
`);

const UsersPage = () => {
  // graphqlに対してクエリを実行
  const [result] = useQuery({
    query: GetUsersQuery,
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
        {data?.getAllUsers.map((user, i) => (
          <UserCard key={i} user={user} />
        ))}
      </div>
    </div>
  );
  // graphqlのフラグメントマスキングでやむを得ずmapのkeyでiを使っているので、少し心配
};

export { UsersPage };
