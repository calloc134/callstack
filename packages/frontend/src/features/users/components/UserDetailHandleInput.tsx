import { useRef } from "react";
import { ModalContent, ModalBody, ModalHeader, ModalFooter, Button, Input } from "@nextui-org/react";
import toast from "react-hot-toast";
import { useMutation } from "urql";
import { graphql } from "src/lib/generated/gql";

// 自分のプロフィールのハンドルを更新するためのミューテーションを定義
const UpdateMyHandleMutation = graphql(`
  mutation UpdateMyHandleMutation($input: UpdateUserInput!) {
    updateMyUser(input: $input) {
      handle
    }
  }
`);

const UserDetailHandleInput = ({ handle, onClose }: { handle: string; onClose: () => void }) => {
  // フォームの入力値を取得するための参照を取得するフックを実行
  const input_ref = useRef<HTMLInputElement>(null);

  // ハンドルのミューテーション用のフックを実行
  const [, update_my_profile] = useMutation(UpdateMyHandleMutation);

  // フォームが送信されたときの処理
  const handle_submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 参照が取得できなかった場合はエラーを表示
    if (input_ref === null || input_ref.current === null) {
      toast.error("エラーが発生しました。");
      return;
    }

    // 文字数でバリデーションを行う
    if (input_ref.current?.value?.length > 20) {
      toast.error("ハンドルは20文字以内で入力してください。");
      return;
    }

    // 英数字のみを許容する
    if (!input_ref.current?.value?.match(/^[a-z0-9_]+$/)) {
      toast.error("ハンドルは英数字のみで入力してください。");
      return;
    }

    // ミューテーションを実行
    const result = await update_my_profile({
      input: {
        handle: input_ref.current.value,
      },
    });

    if (result.error) {
      toast.error("エラーが発生しました");
      return;
    }

    toast.success("ハンドルを更新しました");
    onClose();
    return;
  };

  return (
    <ModalContent>
      <form onSubmit={handle_submit}>
        <ModalHeader>ハンドルを編集</ModalHeader>
        <ModalBody>
          <Input defaultValue={handle} ref={input_ref} />
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

export { UserDetailHandleInput };
