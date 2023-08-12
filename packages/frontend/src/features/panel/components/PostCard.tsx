import { Link } from "@tanstack/react-router";
import { Card, CardBody, CardFooter, Button } from "@nextui-org/react";
import { Post } from "src/lib/generated/graphql";

const PostCard = ({ post }: { post: Partial<Post> }) => {
  return (
    <Card isBlurred className="min-w-full m-2 bg-secondary backdrop-blur-sm" shadow="sm">
      <CardBody>
        <div className="grid grid-flow-col grid-cols-6 md:grid-cols-12 gap-2">
          <div className="flex justify-between col-span-2">
            <h1 className="text-2xl font-bold">{post.title}</h1>
          </div>
          <div className="flex justify-between col-span-4 md:col-span-10">
            <p className="text-xl">{post.body}</p>
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex flex-col justify-end items-end">
        <div>
          <Button color="primary" variant="shadow" className="rounded-full hover:-translate-y-1">
            <Link to={`/auth/panel/post/${post.post_uuid}`}>詳細を見る</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export { PostCard };
