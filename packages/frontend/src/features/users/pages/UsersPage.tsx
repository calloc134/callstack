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
  // クエリを実行してユーザーの情報を取得
  const [result] = useQuery({
    query: GetUsersQuery,
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
      <div className="flex flex-col w-8/12">
        {data?.getAllUsers.map((user, i) => (
          <UserCard key={i} user={user} />
        ))}
      </div>
    </div>
  );
  // graphqlのフラグメントマスキングでやむを得ずmapのkeyでインデックスを使っているので、少し心配
};

export { UsersPage };
