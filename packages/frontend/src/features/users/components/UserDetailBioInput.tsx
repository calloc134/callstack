import { useRef } from "react";
import { ModalContent, ModalBody, ModalHeader, ModalFooter, Button, Textarea } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";
import { useMutation } from "urql";
import { graphql } from "src/lib/generated/gql";

// 自分のプロフィールの自己紹介文を更新するためのミューテーションを定義
const UpdateMyBioMutation = graphql(`
  mutation UpdateMyBioMutation($input: UpdateUserInput!) {
    updateMyUser(input: $input) {
      bio
    }
  }
`);

const UserDetailBioInput = ({ bio, onClose }: { bio: string; onClose: () => void }) => {
  // フォームの入力値を取得するための参照を取得するフックを実行
  const input_ref = useRef<HTMLInputElement>(null);

  // 自己紹介文のミューテーション用のフックを実行
  const [, update_my_profile] = useMutation(UpdateMyBioMutation);

  // フォームが送信されたときの処理
  const handle_submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 参照が取得できなかった場合はエラーを表示
    if (input_ref === null || input_ref.current === null) {
      toast.error("エラーが発生しました");
      return;
    }

    // ミューテーションを実行
    const result = await update_my_profile({
      input: {
        bio: input_ref.current.value,
      },
    });

    if (result.error) {
      toast.error("エラーが発生しました");
      return;
    }

    toast.success("自己紹介文を更新しました");
    onClose();
    return;
  };

  return (
    <ModalContent>
      <form onSubmit={handle_submit}>
        <ModalHeader>自己紹介文を編集</ModalHeader>
        <ModalBody>
          <Textarea defaultValue={bio} ref={input_ref} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit">
            保存
          </Button>
        </ModalFooter>
      </form>
    </ModalContent>
  );
};

export { UserDetailBioInput };
