import { graphql } from "src/lib/generated/gql";
import { Card, CardBody, CardFooter, Image, Spacer, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { useMutation } from "urql";
import { FragmentType, useFragment } from "src/lib/generated";
import { Link } from "@tanstack/react-router";
import { PhotoUp } from "tabler-icons-react";

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

  // プロフィール更新用ミューテーションのフックを実行
  const [result, executeMutation] = useMutation(UpdateMyProfileMutation);

  // モーダル用のフックを実行
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // 現在のログインユーザが自分自身かどうかを判定
  const is_myself = my_user_uuid === user.user_uuid;

  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-row justify-between gap-2">
        <Image src="https://picsum.photos/200" radius="full" width={200} className="shadow-md" />
        {is_myself && (
          <Button color="primary" variant="shadow" radius="full" isIconOnly className="rounded-full hover:-translate-y-1 -translate-x-8">
            <input type="file" className="absolute opacity-0 w-full h-full" />
            <PhotoUp />
          </Button>
        )}
        <Image src="https://picsum.photos/800/200" width={800} height={200} radius="sm" className="shadow-md " />
      </div>
      <Spacer y={6} />
      <Card isBlurred className="w-full bg-secondary" shadow="sm">
        <CardBody>
          <div className="flex">
            <div className="flex flex-col justify-star">
              <h1 className="text-2xl font-bold">{user.screen_name}</h1>
              <p className="text-xl">@{user.handle}</p>
            </div>
            <div className="flex">
              <p className="text-xl">{user.bio}</p>
            </div>
          </div>
        </CardBody>
        <CardFooter className="justify-end">
          <div className="flex flex-row">
            {is_myself && (
              <>
                <Button color="primary" variant="shadow" className="rounded-full hover:-translate-y-1" onPress={onOpen}>
                  プロフィールを編集
                </Button>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                  <ModalContent>
                    <ModalHeader>プロフィールを編集</ModalHeader>
                    <ModalBody>
                      <p>プロフィールを編集する</p>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary">保存</Button>
                    </ModalFooter>
                  </ModalContent>
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
