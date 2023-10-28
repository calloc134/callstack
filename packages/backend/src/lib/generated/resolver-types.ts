import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { GraphQLContext } from '../../context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BioString: { input: string; output: string; }
  BodyString: { input: string; output: string; }
  DateTime: { input: Date; output: Date; }
  File: { input: File; output: File; }
  HandleString: { input: string; output: string; }
  NonEmptyString: { input: string; output: string; }
  NonNegativeInt: { input: number; output: number; }
  ScreenNameString: { input: string; output: string; }
  TitleString: { input: string; output: string; }
  UUID: { input: string; output: string; }
};

export type Mutation = {
  createPost: Post;
  deleteMyUser: User;
  deletePost: Post;
  deleteUserForAdmin: User;
  updateMyUser: User;
  updatePost: Post;
  updateUserForAdmin: User;
  uploadProfileImage: User;
};


export type MutationDeletePostArgs = {
  post_uuid: Scalars['UUID']['input'];
};


export type MutationDeleteUserForAdminArgs = {
  user_uuid: Scalars['UUID']['input'];
};


export type MutationUpdateMyUserArgs = {
  input: UpdateUserInput;
};


export type MutationUpdatePostArgs = {
  input: UpdatePostInput;
  post_uuid: Scalars['UUID']['input'];
};


export type MutationUpdateUserForAdminArgs = {
  bio?: InputMaybe<Scalars['BioString']['input']>;
  handle?: InputMaybe<Scalars['HandleString']['input']>;
  screen_name?: InputMaybe<Scalars['ScreenNameString']['input']>;
  user_uuid: Scalars['UUID']['input'];
};


export type MutationUploadProfileImageArgs = {
  file: Scalars['File']['input'];
};

export type Post = {
  body: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  is_public: Scalars['Boolean']['output'];
  post_uuid: Scalars['UUID']['output'];
  title: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
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
  limit?: InputMaybe<Scalars['NonNegativeInt']['input']>;
  offset?: InputMaybe<Scalars['NonNegativeInt']['input']>;
};


export type QueryGetAllUsersArgs = {
  limit?: InputMaybe<Scalars['NonNegativeInt']['input']>;
  offset?: InputMaybe<Scalars['NonNegativeInt']['input']>;
};


export type QueryGetPostByUuidArgs = {
  uuid: Scalars['UUID']['input'];
};


export type QueryGetUserByUuidArgs = {
  uuid: Scalars['UUID']['input'];
};

export type Role =
  | 'ADMIN'
  | 'USER';

export type UpdatePostInput = {
  body?: InputMaybe<Scalars['BodyString']['input']>;
  title?: InputMaybe<Scalars['TitleString']['input']>;
};

export type UpdateUserInput = {
  bio?: InputMaybe<Scalars['BioString']['input']>;
  handle?: InputMaybe<Scalars['HandleString']['input']>;
  screen_name?: InputMaybe<Scalars['ScreenNameString']['input']>;
};

export type User = {
  bio: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  handle: Scalars['String']['output'];
  image_url: Scalars['String']['output'];
  posts: Array<Post>;
  role: Role;
  screen_name: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
  user_uuid: Scalars['UUID']['output'];
};


export type UserPostsArgs = {
  limit?: InputMaybe<Scalars['NonNegativeInt']['input']>;
  offset?: InputMaybe<Scalars['NonNegativeInt']['input']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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
  BioString: ResolverTypeWrapper<Scalars['BioString']['output']>;
  BodyString: ResolverTypeWrapper<Scalars['BodyString']['output']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  File: ResolverTypeWrapper<Scalars['File']['output']>;
  HandleString: ResolverTypeWrapper<Scalars['HandleString']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  NonEmptyString: ResolverTypeWrapper<Scalars['NonEmptyString']['output']>;
  NonNegativeInt: ResolverTypeWrapper<Scalars['NonNegativeInt']['output']>;
  Post: ResolverTypeWrapper<Post>;
  Query: ResolverTypeWrapper<{}>;
  Role: Role;
  ScreenNameString: ResolverTypeWrapper<Scalars['ScreenNameString']['output']>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  TitleString: ResolverTypeWrapper<Scalars['TitleString']['output']>;
  UUID: ResolverTypeWrapper<Scalars['UUID']['output']>;
  UpdatePostInput: UpdatePostInput;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  BioString: Scalars['BioString']['output'];
  BodyString: Scalars['BodyString']['output'];
  Boolean: Scalars['Boolean']['output'];
  DateTime: Scalars['DateTime']['output'];
  File: Scalars['File']['output'];
  HandleString: Scalars['HandleString']['output'];
  Mutation: {};
  NonEmptyString: Scalars['NonEmptyString']['output'];
  NonNegativeInt: Scalars['NonNegativeInt']['output'];
  Post: Post;
  Query: {};
  ScreenNameString: Scalars['ScreenNameString']['output'];
  String: Scalars['String']['output'];
  TitleString: Scalars['TitleString']['output'];
  UUID: Scalars['UUID']['output'];
  UpdatePostInput: UpdatePostInput;
  UpdateUserInput: UpdateUserInput;
  User: User;
};

export type AuthDirectiveArgs = {
  role?: Role;
};

export type AuthDirectiveResolver<Result, Parent, ContextType = GraphQLContext, Args = AuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface BioStringScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BioString'], any> {
  name: 'BioString';
}

export interface BodyStringScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BodyString'], any> {
  name: 'BodyString';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface FileScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['File'], any> {
  name: 'File';
}

export interface HandleStringScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['HandleString'], any> {
  name: 'HandleString';
}

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  deleteMyUser?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  deletePost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'post_uuid'>>;
  deleteUserForAdmin?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationDeleteUserForAdminArgs, 'user_uuid'>>;
  updateMyUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateMyUserArgs, 'input'>>;
  updatePost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationUpdatePostArgs, 'input' | 'post_uuid'>>;
  updateUserForAdmin?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserForAdminArgs, 'user_uuid'>>;
  uploadProfileImage?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUploadProfileImageArgs, 'file'>>;
};

export interface NonEmptyStringScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonEmptyString'], any> {
  name: 'NonEmptyString';
}

export interface NonNegativeIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonNegativeInt'], any> {
  name: 'NonNegativeInt';
}

export type PostResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  is_public?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  post_uuid?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAllPosts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryGetAllPostsArgs, 'limit' | 'offset'>>;
  getAllUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetAllUsersArgs, 'limit' | 'offset'>>;
  getMyUser?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  getPostByUUID?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<QueryGetPostByUuidArgs, 'uuid'>>;
  getUserByUUID?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryGetUserByUuidArgs, 'uuid'>>;
};

export interface ScreenNameStringScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ScreenNameString'], any> {
  name: 'ScreenNameString';
}

export interface TitleStringScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['TitleString'], any> {
  name: 'TitleString';
}

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UUID'], any> {
  name: 'UUID';
}

export type UserResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  bio?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  handle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image_url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<UserPostsArgs, 'limit' | 'offset'>>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  screen_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user_uuid?: Resolver<ResolversTypes['UUID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphQLContext> = {
  BioString?: GraphQLScalarType;
  BodyString?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  File?: GraphQLScalarType;
  HandleString?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  NonEmptyString?: GraphQLScalarType;
  NonNegativeInt?: GraphQLScalarType;
  Post?: PostResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ScreenNameString?: GraphQLScalarType;
  TitleString?: GraphQLScalarType;
  UUID?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = GraphQLContext> = {
  auth?: AuthDirectiveResolver<any, any, ContextType>;
};
