import { User, Role } from "@prisma/client";
import { GraphQLContext } from "./context";
import { ResolveUserFn, ValidateUserFn } from "@envelop/generic-auth";
import { GraphQLError, Kind } from "graphql";
import { GenericAuthPluginOptions } from "@envelop/generic-auth";

const resolveUserFn: ResolveUserFn<User, GraphQLContext> = async (context) => {
  // コンテキストからsubを取得
  const sub = context.logto?.sub;

  console.log(`sub: ${sub}`);

  // もしsubが存在しない場合は
  if (!sub) {
    // nullを返す
    return null;
  }

  try {
    // 対応するユーザーを取得
    const user = await context.prisma.user.findUniqueOrThrow({
      where: {
        sub_auth: sub,
      },
    });

    return user;
  } catch (error) {
    // エラーが発生した場合はnullを返す
    return null;
  }
};

const validateUserFn: ValidateUserFn<User> = ({ user, fieldAuthDirectiveNode }) => {
  // ユーザが存在しない場合
  if (!user) {
    // 失敗とする
    throw new GraphQLError("Not authenticated");
  }

  // ディレクティブに引数が指定されていなければ
  if (!fieldAuthDirectiveNode?.arguments) {
    // 成功とする
    return;
  }

  // 引数を取得
  const args = fieldAuthDirectiveNode.arguments;

  // argsの指定されている引数がRoleであるものを取得
  const role = args.find((arg) => arg.name.value === "role")?.value;

  // ロールが指定されていない場合は
  if (!role) {
    // エラーを返す
    throw new GraphQLError("No role specified");
  }

  // ロールが指定されている場合は
  if (role.kind === Kind.ENUM) {
    // ロールの値を取得
    const roleValue = role.value;

    // ユーザーのロールが指定されたロールと一致する場合は
    if (user.role === (roleValue as Role)) {
      // 成功とする
      return;
    } else {
      // 失敗とする
      throw new GraphQLError("Role not matched");
    }
  }
};

// オプションを定義
export const authzOption: GenericAuthPluginOptions<User, GraphQLContext> = {
  resolveUserFn,
  validateUser: validateUserFn,
  mode: "protect-granular",
};
