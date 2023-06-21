import { Meta } from "@storybook/react";

import { Button } from "./Button";

type ButtonProps = React.ComponentProps<typeof Button>;

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: [
          "default",
          "destructive",
          "outline",
          "secondary",
          "ghost",
          "link",
        ],
      },
    },
    size: {
      control: {
        type: "select",
        options: ["default", "sm", "lg"],
      },
    },
    Children: {
      control: {
        type: "text",
      },
    },
  },
} as Meta;

export const Default = (args: ButtonProps) => <Button {...args}/>
