import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { Post } from "src/lib/generated/graphql";

const PostCard = ({ post }: { post: Partial<Post> }) => {
  return (
    <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]" shadow="sm">
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          <div className="relative col-span-6 md:col-span-4">
            <h1 className="text-foreground/90 font-semibold text-2xl">{post.title}</h1>
          </div>

          <div className="flex flex-col col-span-6 md:col-span-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                <h3 className="font-semibold text-foreground/90">{post.body}</h3>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export { PostCard };
