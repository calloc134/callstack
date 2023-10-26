import { useRef } from "react";
import { ModalContent, ModalBody, ModalHeader, ModalFooter, Button, Input } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";
import { useMutation } from "urql";
import { graphql } from "src/lib/generated/gql";

// 自分のプロフィールを更新するためのミューテーションを定義
const UpdateMyProfileMutation = graphql(`
  mutation UpdateMyProfileMutation($input: UpdateUserInput!) {
    updateMyUser(input: $input) {
      screen_name
    }
  }
`);

const UserDetailScreenNameInput = ({ screen_name, onClose }: { screen_name: string; onClose: () => void }) => {
  const input_ref = useRef<HTMLInputElement>(null);

  // スクリーンネームのミューテーション用のフックを実行
  const [, update_my_profile] = useMutation(UpdateMyProfileMutation);

  const handle_submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 文字数でバリデーションを行う
    if (input_ref === null || input_ref.current === null) {
      toast.error("エラーが発生しました");
      return;
    }

    if (input_ref.current?.value?.length > 20) {
      toast.error("スクリーンネームは20文字以内で入力してください");
      return;
    }

    // ミューテーションを実行
    const result = await update_my_profile({
      input: {
        screen_name: input_ref.current.value,
      },
    });

    if (result.error) {
      toast.error("エラーが発生しました");
      return;
    }

    toast.success("スクリーンネームを更新しました");
    onClose();
    return;
  };

  return (
    <ModalContent>
      <form onSubmit={handle_submit}>
        <ModalHeader>スクリーンネームを編集</ModalHeader>
        <ModalBody>
          <Input defaultValue={screen_name} ref={input_ref} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit">
            保存
          </Button>
          <Toaster />
        </ModalFooter>
      </form>
    </ModalContent>
  );
};

export { UserDetailScreenNameInput };
