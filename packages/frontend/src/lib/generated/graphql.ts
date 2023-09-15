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
  BioString: { input: string; output: string };
  BodyString: { input: string; output: string };
  DateTime: { input: Date; output: Date };
  HandleString: { input: string; output: string };
  NonEmptyString: { input: string; output: string };
  NonNegativeInt: { input: number; output: number };
  ScreenNameString: { input: string; output: string };
  TitleString: { input: string; output: string };
  UUID: { input: string; output: string };
};

export type Mutation = {
  createPost: Post;
  createPresignedURLForUploadImage: Scalars["NonEmptyString"]["output"];
  deleteMyUser: User;
  deletePost: Post;
  deleteUserForAdmin: User;
  updateMyUser: User;
  updatePost: Post;
  updateUserForAdmin: User;
};

export type MutationDeletePostArgs = {
  post_uuid: Scalars["UUID"]["input"];
};

export type MutationDeleteUserForAdminArgs = {
  user_uuid: Scalars["UUID"]["input"];
};

export type MutationUpdateMyUserArgs = {
  input: UpdateUserInput;
};

export type MutationUpdatePostArgs = {
  input: UpdatePostInput;
  post_uuid: Scalars["UUID"]["input"];
};

export type MutationUpdateUserForAdminArgs = {
  bio?: InputMaybe<Scalars["BioString"]["input"]>;
  handle?: InputMaybe<Scalars["HandleString"]["input"]>;
  screen_name?: InputMaybe<Scalars["ScreenNameString"]["input"]>;
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
  getAllPosts: Array<Post>;
  getAllUsers: Array<User>;
  getMyUser: User;
  getPostByUUID: Post;
  getUserByUUID: User;
};

export type QueryGetAllPostsArgs = {
  limit?: InputMaybe<Scalars["NonNegativeInt"]["input"]>;
  offset?: InputMaybe<Scalars["NonNegativeInt"]["input"]>;
};

export type QueryGetAllUsersArgs = {
  limit?: InputMaybe<Scalars["NonNegativeInt"]["input"]>;
  offset?: InputMaybe<Scalars["NonNegativeInt"]["input"]>;
};

export type QueryGetPostByUuidArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type QueryGetUserByUuidArgs = {
  uuid: Scalars["UUID"]["input"];
};

export type Role = "ADMIN" | "USER";

export type UpdatePostInput = {
  body?: InputMaybe<Scalars["BodyString"]["input"]>;
  title?: InputMaybe<Scalars["TitleString"]["input"]>;
};

export type UpdateUserInput = {
  bio?: InputMaybe<Scalars["BioString"]["input"]>;
  handle?: InputMaybe<Scalars["HandleString"]["input"]>;
  image_url?: InputMaybe<Scalars["NonEmptyString"]["input"]>;
  screen_name?: InputMaybe<Scalars["ScreenNameString"]["input"]>;
};

export type User = {
  bio: Scalars["String"]["output"];
  created_at: Scalars["DateTime"]["output"];
  handle: Scalars["String"]["output"];
  image_url: Scalars["String"]["output"];
  posts: Array<Post>;
  role: Role;
  screen_name: Scalars["String"]["output"];
  updated_at: Scalars["DateTime"]["output"];
  user_uuid: Scalars["UUID"]["output"];
};

export type UserPostsArgs = {
  limit?: InputMaybe<Scalars["NonNegativeInt"]["input"]>;
  offset?: InputMaybe<Scalars["NonNegativeInt"]["input"]>;
};

export type PostFragmentFragment = {
  post_uuid: string;
  title: string;
  body: string;
  user: { " $fragmentRefs"?: { UserPopupFragmentFragment: UserPopupFragmentFragment } };
} & { " $fragmentName"?: "PostFragmentFragment" };

export type PostDetailFragmentFragment = {
  post_uuid: string;
  title: string;
  body: string;
  created_at: Date;
  updated_at: Date;
  is_public: boolean;
  user: { " $fragmentRefs"?: { UserPopupFragmentFragment: UserPopupFragmentFragment } };
} & { " $fragmentName"?: "PostDetailFragmentFragment" };

export type UserPopupFragmentFragment = { user_uuid: string; handle: string; screen_name: string; bio: string } & {
  " $fragmentName"?: "UserPopupFragmentFragment";
};

export type GetPostDetailQueryQueryVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
}>;

export type GetPostDetailQueryQuery = { getPostByUUID: { " $fragmentRefs"?: { PostDetailFragmentFragment: PostDetailFragmentFragment } } };

export type GetAllPostsQueryQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllPostsQueryQuery = { getAllPosts: Array<{ " $fragmentRefs"?: { PostFragmentFragment: PostFragmentFragment } }> };

export type PostPopupFragmentFragment = { post_uuid: string; title: string; body: string } & { " $fragmentName"?: "PostPopupFragmentFragment" };

export type UserFragmentFragment = {
  user_uuid: string;
  handle: string;
  screen_name: string;
  bio: string;
  posts: Array<{ " $fragmentRefs"?: { PostPopupFragmentFragment: PostPopupFragmentFragment } }>;
} & { " $fragmentName"?: "UserFragmentFragment" };

export type UserDetailFragmentFragment = {
  user_uuid: string;
  handle: string;
  screen_name: string;
  bio: string;
  created_at: Date;
  updated_at: Date;
  role: Role;
  posts: Array<{ " $fragmentRefs"?: { PostPopupFragmentFragment: PostPopupFragmentFragment } }>;
} & { " $fragmentName"?: "UserDetailFragmentFragment" };

export type UserDetailQueryQueryVariables = Exact<{
  uuid: Scalars["UUID"]["input"];
}>;

export type UserDetailQueryQuery = { getUserByUUID: { " $fragmentRefs"?: { UserDetailFragmentFragment: UserDetailFragmentFragment } } };

export type GetUsersQueryQueryVariables = Exact<{ [key: string]: never }>;

export type GetUsersQueryQuery = { getAllUsers: Array<{ " $fragmentRefs"?: { UserFragmentFragment: UserFragmentFragment } }> };

export const UserPopupFragmentFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UserPopupFragment" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "User" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "user_uuid" } },
          { kind: "Field", name: { kind: "Name", value: "handle" } },
          { kind: "Field", name: { kind: "Name", value: "screen_name" } },
          { kind: "Field", name: { kind: "Name", value: "bio" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserPopupFragmentFragment, unknown>;
export const PostFragmentFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PostFragment" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Post" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "post_uuid" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "body" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "user" },
            selectionSet: { kind: "SelectionSet", selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "UserPopupFragment" } }] },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UserPopupFragment" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "User" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "user_uuid" } },
          { kind: "Field", name: { kind: "Name", value: "handle" } },
          { kind: "Field", name: { kind: "Name", value: "screen_name" } },
          { kind: "Field", name: { kind: "Name", value: "bio" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PostFragmentFragment, unknown>;
export const PostDetailFragmentFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PostDetailFragment" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Post" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "post_uuid" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "body" } },
          { kind: "Field", name: { kind: "Name", value: "created_at" } },
          { kind: "Field", name: { kind: "Name", value: "updated_at" } },
          { kind: "Field", name: { kind: "Name", value: "is_public" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "user" },
            selectionSet: { kind: "SelectionSet", selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "UserPopupFragment" } }] },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UserPopupFragment" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "User" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "user_uuid" } },
          { kind: "Field", name: { kind: "Name", value: "handle" } },
          { kind: "Field", name: { kind: "Name", value: "screen_name" } },
          { kind: "Field", name: { kind: "Name", value: "bio" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PostDetailFragmentFragment, unknown>;
export const PostPopupFragmentFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PostPopupFragment" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Post" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "post_uuid" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "body" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PostPopupFragmentFragment, unknown>;
export const UserFragmentFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UserFragment" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "User" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "user_uuid" } },
          { kind: "Field", name: { kind: "Name", value: "handle" } },
          { kind: "Field", name: { kind: "Name", value: "screen_name" } },
          { kind: "Field", name: { kind: "Name", value: "bio" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "posts" },
            selectionSet: { kind: "SelectionSet", selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "PostPopupFragment" } }] },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PostPopupFragment" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Post" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "post_uuid" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "body" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserFragmentFragment, unknown>;
export const UserDetailFragmentFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UserDetailFragment" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "User" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "user_uuid" } },
          { kind: "Field", name: { kind: "Name", value: "handle" } },
          { kind: "Field", name: { kind: "Name", value: "screen_name" } },
          { kind: "Field", name: { kind: "Name", value: "bio" } },
          { kind: "Field", name: { kind: "Name", value: "created_at" } },
          { kind: "Field", name: { kind: "Name", value: "updated_at" } },
          { kind: "Field", name: { kind: "Name", value: "role" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "posts" },
            selectionSet: { kind: "SelectionSet", selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "PostPopupFragment" } }] },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PostPopupFragment" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Post" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "post_uuid" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "body" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserDetailFragmentFragment, unknown>;
export const GetPostDetailQueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetPostDetailQuery" },
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
            name: { kind: "Name", value: "getPostByUUID" },
            arguments: [{ kind: "Argument", name: { kind: "Name", value: "uuid" }, value: { kind: "Variable", name: { kind: "Name", value: "uuid" } } }],
            selectionSet: { kind: "SelectionSet", selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "PostDetailFragment" } }] },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UserPopupFragment" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "User" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "user_uuid" } },
          { kind: "Field", name: { kind: "Name", value: "handle" } },
          { kind: "Field", name: { kind: "Name", value: "screen_name" } },
          { kind: "Field", name: { kind: "Name", value: "bio" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PostDetailFragment" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Post" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "post_uuid" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "body" } },
          { kind: "Field", name: { kind: "Name", value: "created_at" } },
          { kind: "Field", name: { kind: "Name", value: "updated_at" } },
          { kind: "Field", name: { kind: "Name", value: "is_public" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "user" },
            selectionSet: { kind: "SelectionSet", selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "UserPopupFragment" } }] },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetPostDetailQueryQuery, GetPostDetailQueryQueryVariables>;
export const GetAllPostsQueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetAllPostsQuery" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getAllPosts" },
            arguments: [{ kind: "Argument", name: { kind: "Name", value: "limit" }, value: { kind: "IntValue", value: "10" } }],
            selectionSet: { kind: "SelectionSet", selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "PostFragment" } }] },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UserPopupFragment" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "User" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "user_uuid" } },
          { kind: "Field", name: { kind: "Name", value: "handle" } },
          { kind: "Field", name: { kind: "Name", value: "screen_name" } },
          { kind: "Field", name: { kind: "Name", value: "bio" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PostFragment" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Post" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "post_uuid" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "body" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "user" },
            selectionSet: { kind: "SelectionSet", selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "UserPopupFragment" } }] },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAllPostsQueryQuery, GetAllPostsQueryQueryVariables>;
export const UserDetailQueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "UserDetailQuery" },
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
            name: { kind: "Name", value: "getUserByUUID" },
            arguments: [{ kind: "Argument", name: { kind: "Name", value: "uuid" }, value: { kind: "Variable", name: { kind: "Name", value: "uuid" } } }],
            selectionSet: { kind: "SelectionSet", selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "UserDetailFragment" } }] },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PostPopupFragment" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Post" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "post_uuid" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "body" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UserDetailFragment" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "User" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "user_uuid" } },
          { kind: "Field", name: { kind: "Name", value: "handle" } },
          { kind: "Field", name: { kind: "Name", value: "screen_name" } },
          { kind: "Field", name: { kind: "Name", value: "bio" } },
          { kind: "Field", name: { kind: "Name", value: "created_at" } },
          { kind: "Field", name: { kind: "Name", value: "updated_at" } },
          { kind: "Field", name: { kind: "Name", value: "role" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "posts" },
            selectionSet: { kind: "SelectionSet", selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "PostPopupFragment" } }] },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserDetailQueryQuery, UserDetailQueryQueryVariables>;
export const GetUsersQueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetUsersQuery" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getAllUsers" },
            arguments: [{ kind: "Argument", name: { kind: "Name", value: "limit" }, value: { kind: "IntValue", value: "10" } }],
            selectionSet: { kind: "SelectionSet", selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "UserFragment" } }] },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "PostPopupFragment" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Post" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "post_uuid" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "body" } },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UserFragment" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "User" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "user_uuid" } },
          { kind: "Field", name: { kind: "Name", value: "handle" } },
          { kind: "Field", name: { kind: "Name", value: "screen_name" } },
          { kind: "Field", name: { kind: "Name", value: "bio" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "posts" },
            selectionSet: { kind: "SelectionSet", selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: "PostPopupFragment" } }] },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUsersQueryQuery, GetUsersQueryQueryVariables>;
