import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from "graphql";
import type { GraphQLContext } from "../../context";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]["output"]>;
  Mutation: ResolverTypeWrapper<{}>;
  Post: ResolverTypeWrapper<Post>;
  Query: ResolverTypeWrapper<{}>;
  Role: Role;
  String: ResolverTypeWrapper<Scalars["String"]["output"]>;
  UUID: ResolverTypeWrapper<Scalars["UUID"]["output"]>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars["Boolean"]["output"];
  DateTime: Scalars["DateTime"]["output"];
  Mutation: {};
  Post: Post;
  Query: {};
  String: Scalars["String"]["output"];
  UUID: Scalars["UUID"]["output"];
  User: User;
};

export type AuthDirectiveArgs = {
  role?: Role;
};

export type AuthDirectiveResolver<Result, Parent, ContextType = GraphQLContext, Args = AuthDirectiveArgs> = DirectiveResolverFn<
  Result,
  Parent,
  ContextType,
  Args
>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
}

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]> = {
  createPost?: Resolver<ResolversTypes["Post"], ParentType, ContextType, RequireFields<MutationCreatePostArgs, "body" | "title">>;
  deleteMyUser?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  deletePost?: Resolver<ResolversTypes["Post"], ParentType, ContextType, RequireFields<MutationDeletePostArgs, "post_uuid">>;
  deleteUser?: Resolver<ResolversTypes["User"], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, "user_uuid">>;
  updateMyUser?: Resolver<ResolversTypes["User"], ParentType, ContextType, Partial<MutationUpdateMyUserArgs>>;
  updatePost?: Resolver<ResolversTypes["Post"], ParentType, ContextType, RequireFields<MutationUpdatePostArgs, "body" | "post_uuid" | "title">>;
  updateUser?: Resolver<ResolversTypes["User"], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, "user_uuid">>;
};

export type PostResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes["Post"] = ResolversParentTypes["Post"]> = {
  body?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  is_public?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  post_uuid?: Resolver<ResolversTypes["UUID"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]> = {
  post?: Resolver<ResolversTypes["Post"], ParentType, ContextType, RequireFields<QueryPostArgs, "uuid">>;
  posts?: Resolver<Array<ResolversTypes["Post"]>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType, RequireFields<QueryUserArgs, "uuid">>;
  users?: Resolver<Array<ResolversTypes["User"]>, ParentType, ContextType>;
};

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes["UUID"], any> {
  name: "UUID";
}

export type UserResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]> = {
  bio?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  handle?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  posts?: Resolver<Array<ResolversTypes["Post"]>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes["Role"], ParentType, ContextType>;
  screen_name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  user_uuid?: Resolver<ResolversTypes["UUID"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphQLContext> = {
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  UUID?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = GraphQLContext> = {
  auth?: AuthDirectiveResolver<any, any, ContextType>;
};
