import { useQuery } from "urql";
import { useParams } from "@tanstack/react-router";
import { Spinner } from "@nextui-org/react";
import { graphql } from "src/lib/generated/gql";
import { UserDetailCard } from "../components/UserDetailCard";

// 自身のユーザを取得するためのクエリの定義
const GetMeQuery = graphql(`
  query GetMeQuery {
    getMyUser {
      user_uuid
    }
  }
`);

// 利用されるクエリの定義
const UserDetailQuery = graphql(`
  query UserDetailQuery($uuid: UUID!) {
    getUserByUUID(uuid: $uuid) {
      ...UserDetailFragment
    }
  }
`);

const UserDetailPage = () => {
  // URLパラメータよりユーザーのUUIDを取得
  const user_uuid = useParams({
    from: "/auth/users/$user_uuid",
  })?.user_uuid;

  // 自身のユーザの情報を取得
  const [myUserResult] = useQuery({
    query: GetMeQuery,
    requestPolicy: "cache-only",
  });

  // クエリを行ってユーザーの情報を取得
  const [UserResult] = useQuery({
    query: UserDetailQuery,
    variables: {
      uuid: user_uuid,
    },
  });

  // 自身のユーザーの情報を取得
  const { data: myUserData } = myUserResult;

  // 自身のユーザーのUUIDを取得
  const my_user_uuid = myUserData?.getMyUser?.user_uuid ?? "";

  // クエリの結果を取得
  const { data, fetching } = UserResult;

  // ローディング中であれば
  if (fetching)
    return (
      <div className="flex items-center justify-center">
        <Spinner label="読み込み中..." color="warning" />
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="flex flex-col w-8/12">
        {data ? <UserDetailCard my_user_uuid={my_user_uuid} user_frag={data.getUserByUUID} /> : <div>ユーザが見つかりませんでした</div>}
      </div>
    </div>
  );
};

export { UserDetailPage };
