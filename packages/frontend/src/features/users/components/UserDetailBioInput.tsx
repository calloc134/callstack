import { useRef } from "react";
import { ModalContent, ModalBody, ModalHeader, ModalFooter, Button, Textarea } from "@nextui-org/react";

const UserDetailBioInput = ({ bio }: { bio: string }) => {
  const input_ref = useRef<HTMLInputElement>(null);

  const handle_submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(input_ref.current?.value);
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
