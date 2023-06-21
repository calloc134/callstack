import { Meta } from "@storybook/react";

import { Button } from "./Button";

type ButtonProps = React.ComponentProps<typeof Button>;

// ストーリーのデータ
export default {
  title: "Components/Button",
  component: Button,
  // 引数のデフォルト値
  argTypes: {
    // ボタンの種類
    variant: {
      control: {
        type: "select",
        options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
      },
    },
    // ボタンのサイズ
    size: {
      control: {
        type: "select",
        options: ["default", "sm", "lg"],
      },
    },
    // Children要素
    Children: {
      control: {
        type: "text",
      },
    },
  },
} as Meta;

export const Default = (args: ButtonProps) => <Button {...args} />;
