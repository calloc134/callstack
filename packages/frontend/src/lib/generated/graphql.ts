/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: Date; output: Date };
  UUID: { input: string; output: string };
};

export type Mutation = {
  createPost: Post;
  deleteMyUser: User;
  deletePost: Post;
  deleteUser: User;
  updateMyUser: User;
  updatePost: Post;
  updateUser: User;
};

export type MutationCreatePostArgs = {
  body: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type MutationDeletePostArgs = {
  post_uuid: Scalars["UUID"]["input"];
};

export type MutationDeleteUserArgs = {
  user_uuid: Scalars["UUID"]["input"];
};

export type MutationUpdateMyUserArgs = {
  bio?: InputMaybe<Scalars["String"]["input"]>;
  handle?: InputMaybe<Scalars["String"]["input"]>;
  screen_name?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationUpdatePostArgs = {
  body: Scalars["String"]["input"];
  post_uuid: Scalars["UUID"]["input"];
  title: Scalars["String"]["input"];
};

export type MutationUpdateUserArgs = {
  bio?: InputMaybe<Scalars["String"]["input"]>;
  handle?: InputMaybe<Scalars["String"]["input"]>;
  screen_name?: InputMaybe<Scalars["String"]["input"]>;
  user_uuid: Scalars["UUID"]["input"];
};

export type Post = {
  body: Scalars["String"]["output"];
  created_at: Scalars["DateTime"]["output"];
  is_public: Scalars["Boolean"]["output"];
  post_uuid: Scalars["UUID"]["output"];
  title: Scalars["String"]["output"];
  updated_at: Scalars["DateTime"]["output"];
  user: User;
};

export type Query = {
  post: Post;
  posts: Array<Post>;
  user: User;
  users: Array<User>;
};

export type QueryPostArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type QueryUserArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type Role = "ADMIN" | "USER";

export type User = {
  bio: Scalars["String"]["output"];
  created_at: Scalars["DateTime"]["output"];
  handle: Scalars["String"]["output"];
  posts: Array<Post>;
  role: Role;
  screen_name: Scalars["String"]["output"];
  updated_at: Scalars["DateTime"]["output"];
  user_uuid: Scalars["UUID"]["output"];
};

export type PanelPageQueryQueryVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
}>;

export type PanelPageQueryQuery = { post: { title: string; user: { screen_name: string } } };

export const PanelPageQueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "PanelPageQuery" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uuid" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "post" },
            arguments: [{ kind: "Argument", name: { kind: "Name", value: "uuid" }, value: { kind: "Variable", name: { kind: "Name", value: "uuid" } } }],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "screen_name" } }] },
                },
                { kind: "Field", name: { kind: "Name", value: "title" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PanelPageQueryQuery, PanelPageQueryQueryVariables>;
