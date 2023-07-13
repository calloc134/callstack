import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  UUID: { input: string; output: string; }
};

export type Profile = {
  __typename?: 'Profile';
  age: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  uuid: Scalars['UUID']['output'];
};

export type Query = {
  __typename?: 'Query';
  user: User;
};


export type QueryUserArgs = {
  uuid: Scalars['UUID']['input'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  profile?: Maybe<Profile>;
  uuid: Scalars['UUID']['output'];
};

export type UserFieldsFragment = { __typename?: 'User', uuid: string, email: string };

export type FindUserQueryVariables = Exact<{
  uuid: Scalars['UUID']['input'];
}>;


export type FindUserQuery = { __typename?: 'Query', user: { __typename?: 'User', uuid: string, email: string } };

export const UserFieldsFragmentDoc = gql`
    fragment UserFields on User {
  uuid
  email
}
    `;
export const FindUserDocument = gql`
    query findUser($uuid: UUID!) {
  user(uuid: $uuid) {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;

export function useFindUserQuery(options: Omit<Urql.UseQueryArgs<FindUserQueryVariables>, 'query'>) {
  return Urql.useQuery<FindUserQuery, FindUserQueryVariables>({ query: FindUserDocument, ...options });
};