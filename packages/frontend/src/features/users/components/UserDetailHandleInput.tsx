import { useRef } from "react";
import { ModalContent, ModalBody, ModalHeader, ModalFooter, Button, Input } from "@nextui-org/react";

const UserDetailHandleInput = ({ screen_name }: { screen_name: string }) => {
  const input_ref = useRef<HTMLInputElement>(null);

  const handle_submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(input_ref.current?.value);
  };

  return (
    <ModalContent>
      <form onSubmit={handle_submit}>
        <ModalHeader>ハンドルを編集</ModalHeader>
        <ModalBody>
          <Input defaultValue={screen_name} ref={input_ref} />
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
