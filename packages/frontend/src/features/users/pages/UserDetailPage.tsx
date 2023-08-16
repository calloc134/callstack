import { useQuery } from "urql";
import { useParams } from "@tanstack/react-router";
import { Spinner } from "@nextui-org/react";
import { graphql } from "src/lib/generated/gql";
import { UserDetailCard } from "../components/UserDetailCard";

const UserDetailFragment = graphql(`
  query UserDetailFragment($uuid: UUID!) {
    getUserByUUID(uuid: $uuid) {
      ...UserDetailFragment
    }
  }
`);

const UserDetailPage = () => {
  const user_uuid = useParams({
    from: "/auth/users/$user_uuid",
  })?.user_uuid;

  const [result] = useQuery({
    query: UserDetailFragment,
    variables: {
      uuid: user_uuid,
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
      <div className="flex flex-col w-8/12">{data ? <UserDetailCard user={data.getUserByUUID} /> : <div>投稿が見つかりませんでした</div>}</div>
    </div>
  );
};

export { UserDetailPage };
