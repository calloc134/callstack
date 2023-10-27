import { Image } from "@nextui-org/react";
import { graphql } from "src/lib/generated/gql";
import { useMutation } from "urql";
import { toast } from "react-hot-toast";

const UpdateMyProfileImageMutation = graphql(`
  mutation UpdateMyProfileImageMutation($file: File!) {
    uploadProfileImage(file: $file) {
      image_url
    }
  }
`);

const UserDetailProfileImageInput = ({ is_myself }: { is_myself: boolean }) => {
  // 画像のミューテーション用のフックを実行
  const [, update_my_profile_image] = useMutation(UpdateMyProfileImageMutation);

  // ファイルが選択されたときのイベントハンドラ
  const handle_select_file = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // ファイルが選択されていない場合は処理を終了
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    // ファイルを取得
    const file = e.target.files[0];

    // ミューテーションを実行
    const result = await update_my_profile_image({
      file,
    });

    if (result.error) {
      toast.error("エラーが発生しました");
      return;
    }

    toast.success("プロフィール画像を更新しました");
    return;
  };

  return (
    <div className={`flex relative rounded-full ${is_myself ? "cursor-pointer hover:scale-105 duration-75" : ""}`}>
      <Image src="https://picsum.photos/200" removeWrapper radius="full" width={200} className="shadow-md" />
      {is_myself && (
        <input type="file" className={`absolute w-full h-full z-10 opacity-0 ${is_myself ? "cursor-pointer" : ""}`} onChange={handle_select_file} />
      )}
    </div>
  );
};

export { UserDetailProfileImageInput };
