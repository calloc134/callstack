import { graphql } from "src/lib/generated/gql";
import { Card, CardBody, CardFooter, Image, Spacer, Modal, useDisclosure } from "@nextui-org/react";
import { FragmentType, useFragment } from "src/lib/generated";
import { UserDetailScreenNameInput } from "./UserDetailScreenNameInput";

// クエリするフラグメントを定義
const UserDetailFragment = graphql(`
  fragment UserDetailFragment on User {
    user_uuid
    handle
    screen_name
    bio
    created_at
    updated_at
    role
    posts {
      ...PostPopupFragment
    }
  }
`);

// 自分のプロフィールを更新するためのミューテーションを定義
const UpdateMyProfileMutation = graphql(`
  mutation UpdateMyProfileMutation($input: UpdateUserInput!) {
    updateMyUser(input: $input) {
      ...UserDetailFragment
    }
  }
`);

const UserDetailCard = ({ my_user_uuid, user_frag }: { my_user_uuid: string; user_frag: FragmentType<typeof UserDetailFragment> }) => {
  // フラグメントの型を指定して対応するデータを取得
  const user = useFragment(UserDetailFragment, user_frag);

  // スクリーンネーム用のモーダル用のフックを実行
  const { isOpen: sc_isOpen, onOpen: sc_onOpen, onOpenChange: sc_onOpenChange } = useDisclosure();

  // 現在のログインユーザが自分自身かどうかを判定
  const is_myself = my_user_uuid === user.user_uuid;

  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-row justify-between gap-2">
        <div className={`flex relative rounded-full ${is_myself ? "cursor-pointer hover:scale-105 duration-75" : ""}`}>
          <Image src="https://picsum.photos/200" removeWrapper radius="full" width={200} className="shadow-md" />
          {is_myself && <input type="file" className={`absolute w-full h-full z-10 opacity-0 ${is_myself ? "cursor-pointer" : ""}`} />}
        </div>
        <div className="flex relative">
          <Image src="https://picsum.photos/800/200" width={800} height={200} radius="sm" className="shadow-md " />
          {is_myself && <input type="file" className={`absolute w-full h-full z-10 opacity-0 ${is_myself ? "cursor-pointer" : ""}`} />}
        </div>
      </div>
      <Spacer y={6} />
      <Card isBlurred className="w-full bg-secondary" shadow="sm">
        <CardBody>
          <div className="flex">
            <div className="flex flex-col justify-star">
              <h1 className={`text-2xl font-bold ${is_myself ? "cursor-pointer hover:scale-105 hover:opacity-80 duration-75" : ""}`} onClick={sc_onOpen}>
                {user.screen_name}
              </h1>
              <p className={`text-xl ${is_myself ? "cursor-pointer hover:scale-105 hover:opacity-80 duration-75" : ""}`} onClick={sc_onOpen}>
                @{user.handle}
              </p>
            </div>
            <div className="flex">
              <p className="text-xl" onClick={sc_onOpen}>
                {user.bio}
              </p>
            </div>
          </div>
        </CardBody>
        <CardFooter className="justify-end">
          <div className="flex flex-row">
            {is_myself && (
              <>
                <Modal isOpen={sc_isOpen} onOpenChange={sc_onOpenChange}>
                  <UserDetailScreenNameInput screen_name={user.screen_name} />
                </Modal>
              </>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export { UserDetailCard };
