// @ts-nocheck
import { z } from 'zod'
import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import { GraphQLError, print } from 'graphql'
import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: Date; output: Date }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any }
}

export type AdminCreateIdentityInput = {
  ownerId: Scalars['String']['input']
  provider: IdentityProvider
  providerId: Scalars['String']['input']
}

export type AdminCreateUserInput = {
  password?: InputMaybe<Scalars['String']['input']>
  username: Scalars['String']['input']
}

export type AdminFindManyCommentInput = {
  reviewId: Scalars['String']['input']
  search?: InputMaybe<Scalars['String']['input']>
}

export type AdminFindManyIdentityInput = {
  ownerId?: InputMaybe<Scalars['String']['input']>
  provider?: InputMaybe<IdentityProvider>
}

export type AdminFindManyProjectInput = {
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  teamId?: InputMaybe<Scalars['String']['input']>
}

export type AdminFindManyRatingInput = {
  commentId?: InputMaybe<Scalars['String']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type AdminFindManyReviewInput = {
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  projectId: Scalars['String']['input']
  search?: InputMaybe<Scalars['String']['input']>
}

export type AdminFindManyTeamInput = {
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type AdminFindManyUserInput = {
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  role?: InputMaybe<UserRole>
  search?: InputMaybe<Scalars['String']['input']>
  status?: InputMaybe<UserStatus>
}

export type AdminUpdateCommentInput = {
  content?: InputMaybe<Scalars['String']['input']>
}

export type AdminUpdateDiscordServerInput = {
  createChannels?: InputMaybe<Scalars['Boolean']['input']>
  logChannelId?: InputMaybe<Scalars['String']['input']>
  projectCategoryId?: InputMaybe<Scalars['String']['input']>
  teamCategoryId?: InputMaybe<Scalars['String']['input']>
}

export type AdminUpdateProjectInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>
  duration?: InputMaybe<Scalars['Int']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  startDate?: InputMaybe<Scalars['DateTime']['input']>
  teamId?: InputMaybe<Scalars['String']['input']>
}

export type AdminUpdateRatingInput = {
  content?: InputMaybe<Scalars['String']['input']>
  rating: Scalars['Float']['input']
}

export type AdminUpdateTeamInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>
  homeServerId?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
}

export type AdminUpdateUserInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>
  developer?: InputMaybe<Scalars['Boolean']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  role?: InputMaybe<UserRole>
  status?: InputMaybe<UserStatus>
  username?: InputMaybe<Scalars['String']['input']>
}

export type AppConfig = {
  __typename?: 'AppConfig'
  authDiscordEnabled: Scalars['Boolean']['output']
  authPasswordEnabled: Scalars['Boolean']['output']
  authRegisterEnabled: Scalars['Boolean']['output']
  authSolanaEnabled: Scalars['Boolean']['output']
}

export type Comment = {
  __typename?: 'Comment'
  author?: Maybe<User>
  authorId: Scalars['String']['output']
  category: CommentCategory
  children?: Maybe<Array<Comment>>
  content: Scalars['String']['output']
  createdAt?: Maybe<Scalars['DateTime']['output']>
  id: Scalars['String']['output']
  parentId?: Maybe<Scalars['String']['output']>
  reviewId: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  versionBrowser?: Maybe<Scalars['String']['output']>
  versionOs?: Maybe<Scalars['String']['output']>
}

export enum CommentCategory {
  Bug = 'Bug',
  Feature = 'Feature',
  Other = 'Other',
}

export type DiscordBot = {
  __typename?: 'DiscordBot'
  avatarUrl?: Maybe<Scalars['String']['output']>
  id: Scalars['String']['output']
  inviteUrl?: Maybe<Scalars['String']['output']>
  manageUrl?: Maybe<Scalars['String']['output']>
  username: Scalars['String']['output']
}

export type DiscordChannel = {
  __typename?: 'DiscordChannel'
  guildId?: Maybe<Scalars['String']['output']>
  id: Scalars['String']['output']
  name: Scalars['String']['output']
  parentId?: Maybe<Scalars['String']['output']>
  type: Scalars['String']['output']
}

export type DiscordRole = {
  __typename?: 'DiscordRole'
  color: Scalars['Int']['output']
  id: Scalars['String']['output']
  managed: Scalars['Boolean']['output']
  name: Scalars['String']['output']
  position: Scalars['Int']['output']
}

export type DiscordServer = {
  __typename?: 'DiscordServer'
  avatarUrl?: Maybe<Scalars['String']['output']>
  createChannels?: Maybe<Scalars['Boolean']['output']>
  id: Scalars['String']['output']
  logChannelId?: Maybe<Scalars['String']['output']>
  name: Scalars['String']['output']
  permissions?: Maybe<Array<Scalars['String']['output']>>
  projectCategoryId?: Maybe<Scalars['String']['output']>
  teamCategoryId?: Maybe<Scalars['String']['output']>
}

export type Identity = {
  __typename?: 'Identity'
  challenges?: Maybe<Array<IdentityChallenge>>
  createdAt: Scalars['DateTime']['output']
  expired?: Maybe<Scalars['Boolean']['output']>
  id: Scalars['String']['output']
  name?: Maybe<Scalars['String']['output']>
  owner?: Maybe<User>
  profile?: Maybe<Scalars['JSON']['output']>
  provider: IdentityProvider
  providerId: Scalars['String']['output']
  updatedAt: Scalars['DateTime']['output']
  url?: Maybe<Scalars['String']['output']>
  verified?: Maybe<Scalars['Boolean']['output']>
}

export type IdentityChallenge = {
  __typename?: 'IdentityChallenge'
  challenge: Scalars['String']['output']
  createdAt: Scalars['DateTime']['output']
  id: Scalars['String']['output']
  ip: Scalars['String']['output']
  provider: IdentityProvider
  providerId: Scalars['String']['output']
  signature?: Maybe<Scalars['String']['output']>
  updatedAt: Scalars['DateTime']['output']
  userAgent: Scalars['String']['output']
  verified: Scalars['Boolean']['output']
}

export enum IdentityProvider {
  Discord = 'Discord',
  Solana = 'Solana',
}

export type LinkIdentityInput = {
  provider: IdentityProvider
  providerId: Scalars['String']['input']
}

export type LoginInput = {
  password: Scalars['String']['input']
  username: Scalars['String']['input']
}

export type Mutation = {
  __typename?: 'Mutation'
  adminAddTeamMember?: Maybe<Scalars['Boolean']['output']>
  adminCreateIdentity?: Maybe<Identity>
  adminCreateProjectChannel: Scalars['Boolean']['output']
  adminCreateTeamChannel: Scalars['Boolean']['output']
  adminCreateUser?: Maybe<User>
  adminDeleteComment?: Maybe<Scalars['Boolean']['output']>
  adminDeleteIdentity?: Maybe<Scalars['Boolean']['output']>
  adminDeleteProject?: Maybe<Scalars['Boolean']['output']>
  adminDeleteProjectChannel: Scalars['Boolean']['output']
  adminDeleteRating?: Maybe<Scalars['Boolean']['output']>
  adminDeleteReview?: Maybe<Scalars['Boolean']['output']>
  adminDeleteTeam?: Maybe<Scalars['Boolean']['output']>
  adminDeleteTeamChannel: Scalars['Boolean']['output']
  adminDeleteUser?: Maybe<Scalars['Boolean']['output']>
  adminLeaveDiscordServer: Scalars['Boolean']['output']
  adminPingDiscordChannel: Scalars['Boolean']['output']
  adminRemoveTeamMember?: Maybe<Scalars['Boolean']['output']>
  adminToggleTeamAdmin?: Maybe<Scalars['Boolean']['output']>
  adminUpdateComment?: Maybe<Comment>
  adminUpdateDiscordServer: Scalars['Boolean']['output']
  adminUpdateProject?: Maybe<Project>
  adminUpdateRating?: Maybe<Rating>
  adminUpdateTeam?: Maybe<Team>
  adminUpdateUser?: Maybe<User>
  anonVerifyIdentityChallenge?: Maybe<IdentityChallenge>
  login?: Maybe<User>
  logout?: Maybe<Scalars['Boolean']['output']>
  register?: Maybe<User>
  userAddTeamMember?: Maybe<Scalars['Boolean']['output']>
  userCreateComment?: Maybe<Comment>
  userCreateProject?: Maybe<Project>
  userCreateRating?: Maybe<Rating>
  userCreateReview?: Maybe<Review>
  userCreateTeam?: Maybe<Team>
  userDeleteComment?: Maybe<Scalars['Boolean']['output']>
  userDeleteIdentity?: Maybe<Scalars['Boolean']['output']>
  userDeleteProject?: Maybe<Scalars['Boolean']['output']>
  userDeleteRating?: Maybe<Scalars['Boolean']['output']>
  userDeleteReview?: Maybe<Scalars['Boolean']['output']>
  userDeleteTeam?: Maybe<Scalars['Boolean']['output']>
  userLinkIdentity?: Maybe<Identity>
  userRemoveTeamMember?: Maybe<Scalars['Boolean']['output']>
  userToggleTeamAdmin?: Maybe<Scalars['Boolean']['output']>
  userUpdateComment?: Maybe<Comment>
  userUpdateProject?: Maybe<Project>
  userUpdateRating?: Maybe<Rating>
  userUpdateTeam?: Maybe<Team>
  userUpdateUser?: Maybe<User>
  userVerifyIdentityChallenge?: Maybe<IdentityChallenge>
}

export type MutationAdminAddTeamMemberArgs = {
  teamId: Scalars['String']['input']
  userId: Scalars['String']['input']
}

export type MutationAdminCreateIdentityArgs = {
  input: AdminCreateIdentityInput
}

export type MutationAdminCreateProjectChannelArgs = {
  channelId: Scalars['String']['input']
  projectId: Scalars['String']['input']
  serverId: Scalars['String']['input']
}

export type MutationAdminCreateTeamChannelArgs = {
  channelId: Scalars['String']['input']
  serverId: Scalars['String']['input']
  teamId: Scalars['String']['input']
}

export type MutationAdminCreateUserArgs = {
  input: AdminCreateUserInput
}

export type MutationAdminDeleteCommentArgs = {
  commentId: Scalars['String']['input']
}

export type MutationAdminDeleteIdentityArgs = {
  identityId: Scalars['String']['input']
}

export type MutationAdminDeleteProjectArgs = {
  projectId: Scalars['String']['input']
}

export type MutationAdminDeleteProjectChannelArgs = {
  channelId: Scalars['String']['input']
  projectId: Scalars['String']['input']
}

export type MutationAdminDeleteRatingArgs = {
  ratingId: Scalars['String']['input']
}

export type MutationAdminDeleteReviewArgs = {
  reviewId: Scalars['String']['input']
}

export type MutationAdminDeleteTeamArgs = {
  teamId: Scalars['String']['input']
}

export type MutationAdminDeleteTeamChannelArgs = {
  channelId: Scalars['String']['input']
  teamId: Scalars['String']['input']
}

export type MutationAdminDeleteUserArgs = {
  userId: Scalars['String']['input']
}

export type MutationAdminLeaveDiscordServerArgs = {
  serverId: Scalars['String']['input']
}

export type MutationAdminPingDiscordChannelArgs = {
  channelId: Scalars['String']['input']
  serverId: Scalars['String']['input']
}

export type MutationAdminRemoveTeamMemberArgs = {
  teamId: Scalars['String']['input']
  userId: Scalars['String']['input']
}

export type MutationAdminToggleTeamAdminArgs = {
  teamId: Scalars['String']['input']
  userId: Scalars['String']['input']
}

export type MutationAdminUpdateCommentArgs = {
  commentId: Scalars['String']['input']
  input: AdminUpdateCommentInput
}

export type MutationAdminUpdateDiscordServerArgs = {
  input: AdminUpdateDiscordServerInput
  serverId: Scalars['String']['input']
}

export type MutationAdminUpdateProjectArgs = {
  input: AdminUpdateProjectInput
  projectId: Scalars['String']['input']
}

export type MutationAdminUpdateRatingArgs = {
  input: AdminUpdateRatingInput
  ratingId: Scalars['String']['input']
}

export type MutationAdminUpdateTeamArgs = {
  input: AdminUpdateTeamInput
  teamId: Scalars['String']['input']
}

export type MutationAdminUpdateUserArgs = {
  input: AdminUpdateUserInput
  userId: Scalars['String']['input']
}

export type MutationAnonVerifyIdentityChallengeArgs = {
  input: VerifyIdentityChallengeInput
}

export type MutationLoginArgs = {
  input: LoginInput
}

export type MutationRegisterArgs = {
  input: RegisterInput
}

export type MutationUserAddTeamMemberArgs = {
  teamId: Scalars['String']['input']
  userId: Scalars['String']['input']
}

export type MutationUserCreateCommentArgs = {
  input: UserCreateCommentInput
}

export type MutationUserCreateProjectArgs = {
  input: UserCreateProjectInput
}

export type MutationUserCreateRatingArgs = {
  input: UserCreateRatingInput
}

export type MutationUserCreateReviewArgs = {
  projectId: Scalars['String']['input']
}

export type MutationUserCreateTeamArgs = {
  input: UserCreateTeamInput
}

export type MutationUserDeleteCommentArgs = {
  commentId: Scalars['String']['input']
}

export type MutationUserDeleteIdentityArgs = {
  identityId: Scalars['String']['input']
}

export type MutationUserDeleteProjectArgs = {
  projectId: Scalars['String']['input']
}

export type MutationUserDeleteRatingArgs = {
  ratingId: Scalars['String']['input']
}

export type MutationUserDeleteReviewArgs = {
  reviewId: Scalars['String']['input']
}

export type MutationUserDeleteTeamArgs = {
  teamId: Scalars['String']['input']
}

export type MutationUserLinkIdentityArgs = {
  input: LinkIdentityInput
}

export type MutationUserRemoveTeamMemberArgs = {
  teamId: Scalars['String']['input']
  userId: Scalars['String']['input']
}

export type MutationUserToggleTeamAdminArgs = {
  teamId: Scalars['String']['input']
  userId: Scalars['String']['input']
}

export type MutationUserUpdateCommentArgs = {
  commentId: Scalars['String']['input']
  input: UserUpdateCommentInput
}

export type MutationUserUpdateProjectArgs = {
  input: UserUpdateProjectInput
  projectId: Scalars['String']['input']
}

export type MutationUserUpdateRatingArgs = {
  input: UserUpdateRatingInput
  ratingId: Scalars['String']['input']
}

export type MutationUserUpdateTeamArgs = {
  input: UserUpdateTeamInput
  teamId: Scalars['String']['input']
}

export type MutationUserUpdateUserArgs = {
  input: UserUpdateUserInput
}

export type MutationUserVerifyIdentityChallengeArgs = {
  input: VerifyIdentityChallengeInput
}

export type PagingMeta = {
  __typename?: 'PagingMeta'
  currentPage: Scalars['Int']['output']
  isFirstPage: Scalars['Boolean']['output']
  isLastPage: Scalars['Boolean']['output']
  nextPage?: Maybe<Scalars['Int']['output']>
  pageCount?: Maybe<Scalars['Int']['output']>
  previousPage?: Maybe<Scalars['Int']['output']>
  totalCount?: Maybe<Scalars['Int']['output']>
}

export type Project = {
  __typename?: 'Project'
  avatarUrl?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  duration?: Maybe<Scalars['Int']['output']>
  endDate?: Maybe<Scalars['DateTime']['output']>
  id: Scalars['String']['output']
  name: Scalars['String']['output']
  slug: Scalars['String']['output']
  startDate?: Maybe<Scalars['DateTime']['output']>
  team?: Maybe<Team>
  teamId: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  viewUrl: Scalars['String']['output']
}

export type ProjectPaging = {
  __typename?: 'ProjectPaging'
  data: Array<Project>
  meta: PagingMeta
}

export type Query = {
  __typename?: 'Query'
  adminFindManyComment?: Maybe<Array<Comment>>
  adminFindManyIdentity?: Maybe<Array<Identity>>
  adminFindManyProject: ProjectPaging
  adminFindManyRating: Array<Rating>
  adminFindManyReview: ReviewPaging
  adminFindManyTeam: TeamPaging
  adminFindManyUser: UserPaging
  adminFindOneProject?: Maybe<Project>
  adminFindOneReview?: Maybe<Review>
  adminFindOneTeam?: Maybe<Team>
  adminFindOneUser?: Maybe<User>
  adminGetDiscordBot: DiscordBot
  adminGetDiscordChannels: Array<DiscordChannel>
  adminGetDiscordRoles: Array<DiscordRole>
  adminGetDiscordServers: Array<DiscordServer>
  adminGetProjectChannels: Array<DiscordChannel>
  adminGetTeamChannels: Array<DiscordChannel>
  adminGetTeamMembers?: Maybe<Array<TeamMember>>
  anonRequestIdentityChallenge?: Maybe<IdentityChallenge>
  appConfig: AppConfig
  me?: Maybe<User>
  uptime: Scalars['Float']['output']
  userFindManyComment?: Maybe<Array<Comment>>
  userFindManyIdentity?: Maybe<Array<Identity>>
  userFindManyProject: ProjectPaging
  userFindManyRating: Array<Rating>
  userFindManyReview?: Maybe<Array<Review>>
  userFindManyTeam: TeamPaging
  userFindManyUser: UserPaging
  userFindOneProject?: Maybe<Project>
  userFindOneReview?: Maybe<Review>
  userFindOneTeam?: Maybe<Team>
  userFindOneUser?: Maybe<User>
  userFindUserProjectReview?: Maybe<Review>
  userGetDiscordServers: Array<DiscordServer>
  userGetProjectChannels: Array<DiscordChannel>
  userGetTeamChannels: Array<DiscordChannel>
  userGetTeamMember?: Maybe<TeamMember>
  userGetTeamMembers?: Maybe<Array<TeamMember>>
  userRequestIdentityChallenge?: Maybe<IdentityChallenge>
}

export type QueryAdminFindManyCommentArgs = {
  input: AdminFindManyCommentInput
}

export type QueryAdminFindManyIdentityArgs = {
  input: AdminFindManyIdentityInput
}

export type QueryAdminFindManyProjectArgs = {
  input: AdminFindManyProjectInput
}

export type QueryAdminFindManyRatingArgs = {
  input: AdminFindManyRatingInput
}

export type QueryAdminFindManyReviewArgs = {
  input: AdminFindManyReviewInput
}

export type QueryAdminFindManyTeamArgs = {
  input: AdminFindManyTeamInput
}

export type QueryAdminFindManyUserArgs = {
  input: AdminFindManyUserInput
}

export type QueryAdminFindOneProjectArgs = {
  projectId: Scalars['String']['input']
}

export type QueryAdminFindOneReviewArgs = {
  reviewId: Scalars['String']['input']
}

export type QueryAdminFindOneTeamArgs = {
  teamId: Scalars['String']['input']
}

export type QueryAdminFindOneUserArgs = {
  userId: Scalars['String']['input']
}

export type QueryAdminGetDiscordChannelsArgs = {
  serverId: Scalars['String']['input']
}

export type QueryAdminGetDiscordRolesArgs = {
  serverId: Scalars['String']['input']
}

export type QueryAdminGetProjectChannelsArgs = {
  projectId: Scalars['String']['input']
}

export type QueryAdminGetTeamChannelsArgs = {
  teamId: Scalars['String']['input']
}

export type QueryAdminGetTeamMembersArgs = {
  teamId: Scalars['String']['input']
}

export type QueryAnonRequestIdentityChallengeArgs = {
  input: RequestIdentityChallengeInput
}

export type QueryUserFindManyCommentArgs = {
  input: UserFindManyCommentInput
}

export type QueryUserFindManyIdentityArgs = {
  input: UserFindManyIdentityInput
}

export type QueryUserFindManyProjectArgs = {
  input: UserFindManyProjectInput
}

export type QueryUserFindManyRatingArgs = {
  input: UserFindManyRatingInput
}

export type QueryUserFindManyReviewArgs = {
  input: UserFindManyReviewInput
}

export type QueryUserFindManyTeamArgs = {
  input: UserFindManyTeamInput
}

export type QueryUserFindManyUserArgs = {
  input: UserFindManyUserInput
}

export type QueryUserFindOneProjectArgs = {
  projectId: Scalars['String']['input']
}

export type QueryUserFindOneReviewArgs = {
  reviewId: Scalars['String']['input']
}

export type QueryUserFindOneTeamArgs = {
  teamId: Scalars['String']['input']
}

export type QueryUserFindOneUserArgs = {
  username: Scalars['String']['input']
}

export type QueryUserFindUserProjectReviewArgs = {
  projectId: Scalars['String']['input']
}

export type QueryUserGetProjectChannelsArgs = {
  projectId: Scalars['String']['input']
}

export type QueryUserGetTeamChannelsArgs = {
  teamId: Scalars['String']['input']
}

export type QueryUserGetTeamMemberArgs = {
  teamId: Scalars['String']['input']
}

export type QueryUserGetTeamMembersArgs = {
  teamId: Scalars['String']['input']
}

export type QueryUserRequestIdentityChallengeArgs = {
  input: RequestIdentityChallengeInput
}

export type Rating = {
  __typename?: 'Rating'
  commentId: Scalars['String']['output']
  content?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  id: Scalars['String']['output']
  rating: Scalars['Float']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type RegisterInput = {
  password: Scalars['String']['input']
  username: Scalars['String']['input']
}

export type RequestIdentityChallengeInput = {
  provider: IdentityProvider
  providerId: Scalars['String']['input']
}

export type Review = {
  __typename?: 'Review'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  id: Scalars['String']['output']
  name: Scalars['String']['output']
  project?: Maybe<Project>
  projectId: Scalars['String']['output']
  reviewer?: Maybe<User>
  reviewerId: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  viewUrl: Scalars['String']['output']
}

export type ReviewPaging = {
  __typename?: 'ReviewPaging'
  data: Array<Review>
  meta: PagingMeta
}

export type Team = {
  __typename?: 'Team'
  avatarUrl?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  homeServerId?: Maybe<Scalars['String']['output']>
  id: Scalars['String']['output']
  members?: Maybe<Array<TeamMember>>
  name: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  viewUrl: Scalars['String']['output']
}

export type TeamMember = {
  __typename?: 'TeamMember'
  admin?: Maybe<Scalars['Boolean']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  id: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  user?: Maybe<User>
  userId: Scalars['String']['output']
}

export type TeamPaging = {
  __typename?: 'TeamPaging'
  data: Array<Team>
  meta: PagingMeta
}

export type User = {
  __typename?: 'User'
  avatarUrl?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  developer?: Maybe<Scalars['Boolean']['output']>
  id: Scalars['String']['output']
  identities?: Maybe<Array<Identity>>
  manager?: Maybe<Scalars['Boolean']['output']>
  name?: Maybe<Scalars['String']['output']>
  profileUrl: Scalars['String']['output']
  role?: Maybe<UserRole>
  status?: Maybe<UserStatus>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  username?: Maybe<Scalars['String']['output']>
}

export type UserCreateCommentInput = {
  content: Scalars['String']['input']
  parentId?: InputMaybe<Scalars['String']['input']>
  reviewId: Scalars['String']['input']
}

export type UserCreateProjectInput = {
  duration?: InputMaybe<Scalars['Int']['input']>
  name: Scalars['String']['input']
  startDate?: InputMaybe<Scalars['DateTime']['input']>
  teamId: Scalars['String']['input']
}

export type UserCreateRatingInput = {
  commentId: Scalars['String']['input']
  content?: InputMaybe<Scalars['String']['input']>
  rating: Scalars['Float']['input']
}

export type UserCreateTeamInput = {
  name: Scalars['String']['input']
}

export type UserFindManyCommentInput = {
  reviewId: Scalars['String']['input']
  search?: InputMaybe<Scalars['String']['input']>
}

export type UserFindManyIdentityInput = {
  username: Scalars['String']['input']
}

export type UserFindManyProjectInput = {
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  teamId?: InputMaybe<Scalars['String']['input']>
}

export type UserFindManyRatingInput = {
  search?: InputMaybe<Scalars['String']['input']>
}

export type UserFindManyReviewInput = {
  projectId: Scalars['String']['input']
  search?: InputMaybe<Scalars['String']['input']>
}

export type UserFindManyTeamInput = {
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type UserFindManyUserInput = {
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type UserPaging = {
  __typename?: 'UserPaging'
  data: Array<User>
  meta: PagingMeta
}

export enum UserRole {
  Admin = 'Admin',
  User = 'User',
}

export enum UserStatus {
  Active = 'Active',
  Created = 'Created',
  Inactive = 'Inactive',
}

export type UserUpdateCommentInput = {
  content?: InputMaybe<Scalars['String']['input']>
}

export type UserUpdateProjectInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>
  duration?: InputMaybe<Scalars['Int']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  startDate?: InputMaybe<Scalars['DateTime']['input']>
}

export type UserUpdateRatingInput = {
  content?: InputMaybe<Scalars['String']['input']>
  rating?: InputMaybe<Scalars['Float']['input']>
}

export type UserUpdateTeamInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>
  homeServerId?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
}

export type UserUpdateUserInput = {
  developer?: InputMaybe<Scalars['Boolean']['input']>
}

export type VerifyIdentityChallengeInput = {
  challenge: Scalars['String']['input']
  provider: IdentityProvider
  providerId: Scalars['String']['input']
  signature: Scalars['String']['input']
  useLedger?: InputMaybe<Scalars['Boolean']['input']>
}

export type LoginMutationVariables = Exact<{
  input: LoginInput
}>

export type LoginMutation = {
  __typename?: 'Mutation'
  login?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    manager?: boolean | null
    profileUrl: string
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = { __typename?: 'Mutation'; logout?: boolean | null }

export type RegisterMutationVariables = Exact<{
  input: RegisterInput
}>

export type RegisterMutation = {
  __typename?: 'Mutation'
  register?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    manager?: boolean | null
    profileUrl: string
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = {
  __typename?: 'Query'
  me?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    manager?: boolean | null
    profileUrl: string
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type CommentDetailsFragment = {
  __typename?: 'Comment'
  authorId: string
  category: CommentCategory
  content: string
  createdAt?: Date | null
  id: string
  parentId?: string | null
  reviewId: string
  updatedAt?: Date | null
  versionBrowser?: string | null
  versionOs?: string | null
  author?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    manager?: boolean | null
    profileUrl: string
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type UserFindManyCommentQueryVariables = Exact<{
  input: UserFindManyCommentInput
}>

export type UserFindManyCommentQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Comment'
    authorId: string
    category: CommentCategory
    content: string
    createdAt?: Date | null
    id: string
    parentId?: string | null
    reviewId: string
    updatedAt?: Date | null
    versionBrowser?: string | null
    versionOs?: string | null
    children?: Array<{
      __typename?: 'Comment'
      authorId: string
      category: CommentCategory
      content: string
      createdAt?: Date | null
      id: string
      parentId?: string | null
      reviewId: string
      updatedAt?: Date | null
      versionBrowser?: string | null
      versionOs?: string | null
      author?: {
        __typename?: 'User'
        avatarUrl?: string | null
        createdAt?: Date | null
        developer?: boolean | null
        id: string
        name?: string | null
        manager?: boolean | null
        profileUrl: string
        role?: UserRole | null
        status?: UserStatus | null
        updatedAt?: Date | null
        username?: string | null
      } | null
    }> | null
    author?: {
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      id: string
      name?: string | null
      manager?: boolean | null
      profileUrl: string
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    } | null
  }> | null
}

export type UserCreateCommentMutationVariables = Exact<{
  input: UserCreateCommentInput
}>

export type UserCreateCommentMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Comment'
    authorId: string
    category: CommentCategory
    content: string
    createdAt?: Date | null
    id: string
    parentId?: string | null
    reviewId: string
    updatedAt?: Date | null
    versionBrowser?: string | null
    versionOs?: string | null
    author?: {
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      id: string
      name?: string | null
      manager?: boolean | null
      profileUrl: string
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    } | null
  } | null
}

export type UserUpdateCommentMutationVariables = Exact<{
  commentId: Scalars['String']['input']
  input: UserUpdateCommentInput
}>

export type UserUpdateCommentMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'Comment'
    authorId: string
    category: CommentCategory
    content: string
    createdAt?: Date | null
    id: string
    parentId?: string | null
    reviewId: string
    updatedAt?: Date | null
    versionBrowser?: string | null
    versionOs?: string | null
    author?: {
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      id: string
      name?: string | null
      manager?: boolean | null
      profileUrl: string
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    } | null
  } | null
}

export type UserDeleteCommentMutationVariables = Exact<{
  commentId: Scalars['String']['input']
}>

export type UserDeleteCommentMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type AdminFindManyCommentQueryVariables = Exact<{
  input: AdminFindManyCommentInput
}>

export type AdminFindManyCommentQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Comment'
    authorId: string
    category: CommentCategory
    content: string
    createdAt?: Date | null
    id: string
    parentId?: string | null
    reviewId: string
    updatedAt?: Date | null
    versionBrowser?: string | null
    versionOs?: string | null
    children?: Array<{
      __typename?: 'Comment'
      authorId: string
      category: CommentCategory
      content: string
      createdAt?: Date | null
      id: string
      parentId?: string | null
      reviewId: string
      updatedAt?: Date | null
      versionBrowser?: string | null
      versionOs?: string | null
      author?: {
        __typename?: 'User'
        avatarUrl?: string | null
        createdAt?: Date | null
        developer?: boolean | null
        id: string
        name?: string | null
        manager?: boolean | null
        profileUrl: string
        role?: UserRole | null
        status?: UserStatus | null
        updatedAt?: Date | null
        username?: string | null
      } | null
    }> | null
    author?: {
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      id: string
      name?: string | null
      manager?: boolean | null
      profileUrl: string
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    } | null
  }> | null
}

export type AdminUpdateCommentMutationVariables = Exact<{
  commentId: Scalars['String']['input']
  input: AdminUpdateCommentInput
}>

export type AdminUpdateCommentMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'Comment'
    authorId: string
    category: CommentCategory
    content: string
    createdAt?: Date | null
    id: string
    parentId?: string | null
    reviewId: string
    updatedAt?: Date | null
    versionBrowser?: string | null
    versionOs?: string | null
    author?: {
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      id: string
      name?: string | null
      manager?: boolean | null
      profileUrl: string
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    } | null
  } | null
}

export type AdminDeleteCommentMutationVariables = Exact<{
  commentId: Scalars['String']['input']
}>

export type AdminDeleteCommentMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type AppConfigDetailsFragment = {
  __typename?: 'AppConfig'
  authDiscordEnabled: boolean
  authPasswordEnabled: boolean
  authRegisterEnabled: boolean
  authSolanaEnabled: boolean
}

export type PagingMetaDetailsFragment = {
  __typename?: 'PagingMeta'
  currentPage: number
  isFirstPage: boolean
  isLastPage: boolean
  nextPage?: number | null
  pageCount?: number | null
  previousPage?: number | null
  totalCount?: number | null
}

export type UptimeQueryVariables = Exact<{ [key: string]: never }>

export type UptimeQuery = { __typename?: 'Query'; uptime: number }

export type AppConfigQueryVariables = Exact<{ [key: string]: never }>

export type AppConfigQuery = {
  __typename?: 'Query'
  config: {
    __typename?: 'AppConfig'
    authDiscordEnabled: boolean
    authPasswordEnabled: boolean
    authRegisterEnabled: boolean
    authSolanaEnabled: boolean
  }
}

export type DiscordBotDetailsFragment = {
  __typename?: 'DiscordBot'
  id: string
  username: string
  avatarUrl?: string | null
  inviteUrl?: string | null
  manageUrl?: string | null
}

export type DiscordServerDetailsFragment = {
  __typename?: 'DiscordServer'
  id: string
  name: string
  avatarUrl?: string | null
  permissions?: Array<string> | null
  createChannels?: boolean | null
  logChannelId?: string | null
  projectCategoryId?: string | null
  teamCategoryId?: string | null
}

export type DiscordRoleDetailsFragment = {
  __typename?: 'DiscordRole'
  id: string
  name: string
  managed: boolean
  color: number
  position: number
}

export type DiscordChannelDetailsFragment = {
  __typename?: 'DiscordChannel'
  id: string
  name: string
  type: string
  parentId?: string | null
  guildId?: string | null
}

export type AdminGetDiscordBotQueryVariables = Exact<{ [key: string]: never }>

export type AdminGetDiscordBotQuery = {
  __typename?: 'Query'
  item: {
    __typename?: 'DiscordBot'
    id: string
    username: string
    avatarUrl?: string | null
    inviteUrl?: string | null
    manageUrl?: string | null
  }
}

export type AdminGetDiscordServersQueryVariables = Exact<{ [key: string]: never }>

export type AdminGetDiscordServersQuery = {
  __typename?: 'Query'
  items: Array<{
    __typename?: 'DiscordServer'
    id: string
    name: string
    avatarUrl?: string | null
    permissions?: Array<string> | null
    createChannels?: boolean | null
    logChannelId?: string | null
    projectCategoryId?: string | null
    teamCategoryId?: string | null
  }>
}

export type AdminGetDiscordRolesQueryVariables = Exact<{
  serverId: Scalars['String']['input']
}>

export type AdminGetDiscordRolesQuery = {
  __typename?: 'Query'
  items: Array<{
    __typename?: 'DiscordRole'
    id: string
    name: string
    managed: boolean
    color: number
    position: number
  }>
}

export type AdminGetDiscordChannelsQueryVariables = Exact<{
  serverId: Scalars['String']['input']
}>

export type AdminGetDiscordChannelsQuery = {
  __typename?: 'Query'
  items: Array<{
    __typename?: 'DiscordChannel'
    id: string
    name: string
    type: string
    parentId?: string | null
    guildId?: string | null
  }>
}

export type AdminGetProjectChannelsQueryVariables = Exact<{
  projectId: Scalars['String']['input']
}>

export type AdminGetProjectChannelsQuery = {
  __typename?: 'Query'
  items: Array<{
    __typename?: 'DiscordChannel'
    id: string
    name: string
    type: string
    parentId?: string | null
    guildId?: string | null
  }>
}

export type AdminGetTeamChannelsQueryVariables = Exact<{
  teamId: Scalars['String']['input']
}>

export type AdminGetTeamChannelsQuery = {
  __typename?: 'Query'
  items: Array<{
    __typename?: 'DiscordChannel'
    id: string
    name: string
    type: string
    parentId?: string | null
    guildId?: string | null
  }>
}

export type AdminPingDiscordChannelMutationVariables = Exact<{
  serverId: Scalars['String']['input']
  channelId: Scalars['String']['input']
}>

export type AdminPingDiscordChannelMutation = { __typename?: 'Mutation'; pong: boolean }

export type AdminCreateProjectChannelMutationVariables = Exact<{
  serverId: Scalars['String']['input']
  channelId: Scalars['String']['input']
  projectId: Scalars['String']['input']
}>

export type AdminCreateProjectChannelMutation = { __typename?: 'Mutation'; created: boolean }

export type AdminCreateTeamChannelMutationVariables = Exact<{
  serverId: Scalars['String']['input']
  channelId: Scalars['String']['input']
  teamId: Scalars['String']['input']
}>

export type AdminCreateTeamChannelMutation = { __typename?: 'Mutation'; created: boolean }

export type AdminUpdateDiscordServerMutationVariables = Exact<{
  serverId: Scalars['String']['input']
  input: AdminUpdateDiscordServerInput
}>

export type AdminUpdateDiscordServerMutation = { __typename?: 'Mutation'; updated: boolean }

export type AdminDeleteProjectChannelMutationVariables = Exact<{
  channelId: Scalars['String']['input']
  projectId: Scalars['String']['input']
}>

export type AdminDeleteProjectChannelMutation = { __typename?: 'Mutation'; deleted: boolean }

export type AdminDeleteTeamChannelMutationVariables = Exact<{
  channelId: Scalars['String']['input']
  teamId: Scalars['String']['input']
}>

export type AdminDeleteTeamChannelMutation = { __typename?: 'Mutation'; deleted: boolean }

export type AdminLeaveDiscordServerMutationVariables = Exact<{
  serverId: Scalars['String']['input']
}>

export type AdminLeaveDiscordServerMutation = { __typename?: 'Mutation'; left: boolean }

export type UserGetDiscordServersQueryVariables = Exact<{ [key: string]: never }>

export type UserGetDiscordServersQuery = {
  __typename?: 'Query'
  items: Array<{
    __typename?: 'DiscordServer'
    id: string
    name: string
    avatarUrl?: string | null
    permissions?: Array<string> | null
    createChannels?: boolean | null
    logChannelId?: string | null
    projectCategoryId?: string | null
    teamCategoryId?: string | null
  }>
}

export type UserGetProjectChannelsQueryVariables = Exact<{
  projectId: Scalars['String']['input']
}>

export type UserGetProjectChannelsQuery = {
  __typename?: 'Query'
  items: Array<{
    __typename?: 'DiscordChannel'
    id: string
    name: string
    type: string
    parentId?: string | null
    guildId?: string | null
  }>
}

export type UserGetTeamChannelsQueryVariables = Exact<{
  teamId: Scalars['String']['input']
}>

export type UserGetTeamChannelsQuery = {
  __typename?: 'Query'
  items: Array<{
    __typename?: 'DiscordChannel'
    id: string
    name: string
    type: string
    parentId?: string | null
    guildId?: string | null
  }>
}

export type IdentityDetailsFragment = {
  __typename?: 'Identity'
  createdAt: Date
  expired?: boolean | null
  id: string
  name?: string | null
  profile?: any | null
  provider: IdentityProvider
  providerId: string
  updatedAt: Date
  url?: string | null
  verified?: boolean | null
}

export type IdentityChallengeDetailsFragment = {
  __typename?: 'IdentityChallenge'
  id: string
  createdAt: Date
  updatedAt: Date
  provider: IdentityProvider
  providerId: string
  challenge: string
  signature?: string | null
  ip: string
  userAgent: string
  verified: boolean
}

export type AdminFindManyIdentityQueryVariables = Exact<{
  input: AdminFindManyIdentityInput
}>

export type AdminFindManyIdentityQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Identity'
    createdAt: Date
    expired?: boolean | null
    id: string
    name?: string | null
    profile?: any | null
    provider: IdentityProvider
    providerId: string
    updatedAt: Date
    url?: string | null
    verified?: boolean | null
    challenges?: Array<{
      __typename?: 'IdentityChallenge'
      id: string
      createdAt: Date
      updatedAt: Date
      provider: IdentityProvider
      providerId: string
      challenge: string
      signature?: string | null
      ip: string
      userAgent: string
      verified: boolean
    }> | null
    owner?: {
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      id: string
      name?: string | null
      manager?: boolean | null
      profileUrl: string
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    } | null
  }> | null
}

export type AdminCreateIdentityMutationVariables = Exact<{
  input: AdminCreateIdentityInput
}>

export type AdminCreateIdentityMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Identity'
    createdAt: Date
    expired?: boolean | null
    id: string
    name?: string | null
    profile?: any | null
    provider: IdentityProvider
    providerId: string
    updatedAt: Date
    url?: string | null
    verified?: boolean | null
  } | null
}

export type AdminDeleteIdentityMutationVariables = Exact<{
  identityId: Scalars['String']['input']
}>

export type AdminDeleteIdentityMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type UserFindManyIdentityQueryVariables = Exact<{
  input: UserFindManyIdentityInput
}>

export type UserFindManyIdentityQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Identity'
    createdAt: Date
    expired?: boolean | null
    id: string
    name?: string | null
    profile?: any | null
    provider: IdentityProvider
    providerId: string
    updatedAt: Date
    url?: string | null
    verified?: boolean | null
  }> | null
}

export type UserDeleteIdentityMutationVariables = Exact<{
  identityId: Scalars['String']['input']
}>

export type UserDeleteIdentityMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type UserRequestIdentityChallengeQueryVariables = Exact<{
  input: RequestIdentityChallengeInput
}>

export type UserRequestIdentityChallengeQuery = {
  __typename?: 'Query'
  challenge?: {
    __typename?: 'IdentityChallenge'
    id: string
    createdAt: Date
    updatedAt: Date
    provider: IdentityProvider
    providerId: string
    challenge: string
    signature?: string | null
    ip: string
    userAgent: string
    verified: boolean
  } | null
}

export type UserVerifyIdentityChallengeMutationVariables = Exact<{
  input: VerifyIdentityChallengeInput
}>

export type UserVerifyIdentityChallengeMutation = {
  __typename?: 'Mutation'
  verified?: {
    __typename?: 'IdentityChallenge'
    id: string
    createdAt: Date
    updatedAt: Date
    provider: IdentityProvider
    providerId: string
    challenge: string
    signature?: string | null
    ip: string
    userAgent: string
    verified: boolean
  } | null
}

export type UserLinkIdentityMutationVariables = Exact<{
  input: LinkIdentityInput
}>

export type UserLinkIdentityMutation = {
  __typename?: 'Mutation'
  linked?: {
    __typename?: 'Identity'
    createdAt: Date
    expired?: boolean | null
    id: string
    name?: string | null
    profile?: any | null
    provider: IdentityProvider
    providerId: string
    updatedAt: Date
    url?: string | null
    verified?: boolean | null
  } | null
}

export type AnonRequestIdentityChallengeQueryVariables = Exact<{
  input: RequestIdentityChallengeInput
}>

export type AnonRequestIdentityChallengeQuery = {
  __typename?: 'Query'
  challenge?: {
    __typename?: 'IdentityChallenge'
    id: string
    createdAt: Date
    updatedAt: Date
    provider: IdentityProvider
    providerId: string
    challenge: string
    signature?: string | null
    ip: string
    userAgent: string
    verified: boolean
  } | null
}

export type AnonVerifyIdentityChallengeMutationVariables = Exact<{
  input: VerifyIdentityChallengeInput
}>

export type AnonVerifyIdentityChallengeMutation = {
  __typename?: 'Mutation'
  verified?: {
    __typename?: 'IdentityChallenge'
    id: string
    createdAt: Date
    updatedAt: Date
    provider: IdentityProvider
    providerId: string
    challenge: string
    signature?: string | null
    ip: string
    userAgent: string
    verified: boolean
  } | null
}

export type ProjectDetailsFragment = {
  __typename?: 'Project'
  createdAt?: Date | null
  id: string
  teamId: string
  name: string
  slug: string
  avatarUrl?: string | null
  viewUrl: string
  updatedAt?: Date | null
  team?: {
    __typename?: 'Team'
    createdAt?: Date | null
    id: string
    name: string
    avatarUrl?: string | null
    homeServerId?: string | null
    updatedAt?: Date | null
    viewUrl: string
  } | null
}

export type UserFindManyProjectQueryVariables = Exact<{
  input: UserFindManyProjectInput
}>

export type UserFindManyProjectQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'ProjectPaging'
    data: Array<{
      __typename?: 'Project'
      createdAt?: Date | null
      id: string
      teamId: string
      name: string
      slug: string
      avatarUrl?: string | null
      viewUrl: string
      updatedAt?: Date | null
      team?: {
        __typename?: 'Team'
        createdAt?: Date | null
        id: string
        name: string
        avatarUrl?: string | null
        homeServerId?: string | null
        updatedAt?: Date | null
        viewUrl: string
      } | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type UserFindOneProjectQueryVariables = Exact<{
  projectId: Scalars['String']['input']
}>

export type UserFindOneProjectQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Project'
    createdAt?: Date | null
    id: string
    teamId: string
    name: string
    slug: string
    avatarUrl?: string | null
    viewUrl: string
    updatedAt?: Date | null
    team?: {
      __typename?: 'Team'
      createdAt?: Date | null
      id: string
      name: string
      avatarUrl?: string | null
      homeServerId?: string | null
      updatedAt?: Date | null
      viewUrl: string
    } | null
  } | null
}

export type UserCreateProjectMutationVariables = Exact<{
  input: UserCreateProjectInput
}>

export type UserCreateProjectMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Project'
    createdAt?: Date | null
    id: string
    teamId: string
    name: string
    slug: string
    avatarUrl?: string | null
    viewUrl: string
    updatedAt?: Date | null
    team?: {
      __typename?: 'Team'
      createdAt?: Date | null
      id: string
      name: string
      avatarUrl?: string | null
      homeServerId?: string | null
      updatedAt?: Date | null
      viewUrl: string
    } | null
  } | null
}

export type UserUpdateProjectMutationVariables = Exact<{
  projectId: Scalars['String']['input']
  input: UserUpdateProjectInput
}>

export type UserUpdateProjectMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'Project'
    createdAt?: Date | null
    id: string
    teamId: string
    name: string
    slug: string
    avatarUrl?: string | null
    viewUrl: string
    updatedAt?: Date | null
    team?: {
      __typename?: 'Team'
      createdAt?: Date | null
      id: string
      name: string
      avatarUrl?: string | null
      homeServerId?: string | null
      updatedAt?: Date | null
      viewUrl: string
    } | null
  } | null
}

export type UserDeleteProjectMutationVariables = Exact<{
  projectId: Scalars['String']['input']
}>

export type UserDeleteProjectMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type AdminFindManyProjectQueryVariables = Exact<{
  input: AdminFindManyProjectInput
}>

export type AdminFindManyProjectQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'ProjectPaging'
    data: Array<{
      __typename?: 'Project'
      createdAt?: Date | null
      id: string
      teamId: string
      name: string
      slug: string
      avatarUrl?: string | null
      viewUrl: string
      updatedAt?: Date | null
      team?: {
        __typename?: 'Team'
        createdAt?: Date | null
        id: string
        name: string
        avatarUrl?: string | null
        homeServerId?: string | null
        updatedAt?: Date | null
        viewUrl: string
      } | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type AdminFindOneProjectQueryVariables = Exact<{
  projectId: Scalars['String']['input']
}>

export type AdminFindOneProjectQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Project'
    createdAt?: Date | null
    id: string
    teamId: string
    name: string
    slug: string
    avatarUrl?: string | null
    viewUrl: string
    updatedAt?: Date | null
    team?: {
      __typename?: 'Team'
      createdAt?: Date | null
      id: string
      name: string
      avatarUrl?: string | null
      homeServerId?: string | null
      updatedAt?: Date | null
      viewUrl: string
    } | null
  } | null
}

export type AdminUpdateProjectMutationVariables = Exact<{
  projectId: Scalars['String']['input']
  input: AdminUpdateProjectInput
}>

export type AdminUpdateProjectMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'Project'
    createdAt?: Date | null
    id: string
    teamId: string
    name: string
    slug: string
    avatarUrl?: string | null
    viewUrl: string
    updatedAt?: Date | null
    team?: {
      __typename?: 'Team'
      createdAt?: Date | null
      id: string
      name: string
      avatarUrl?: string | null
      homeServerId?: string | null
      updatedAt?: Date | null
      viewUrl: string
    } | null
  } | null
}

export type AdminDeleteProjectMutationVariables = Exact<{
  projectId: Scalars['String']['input']
}>

export type AdminDeleteProjectMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type RatingDetailsFragment = {
  __typename?: 'Rating'
  createdAt?: Date | null
  id: string
  content?: string | null
  commentId: string
  rating: number
  updatedAt?: Date | null
}

export type UserFindManyRatingQueryVariables = Exact<{
  input: UserFindManyRatingInput
}>

export type UserFindManyRatingQuery = {
  __typename?: 'Query'
  items: Array<{
    __typename?: 'Rating'
    createdAt?: Date | null
    id: string
    content?: string | null
    commentId: string
    rating: number
    updatedAt?: Date | null
  }>
}

export type UserCreateRatingMutationVariables = Exact<{
  input: UserCreateRatingInput
}>

export type UserCreateRatingMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Rating'
    createdAt?: Date | null
    id: string
    content?: string | null
    commentId: string
    rating: number
    updatedAt?: Date | null
  } | null
}

export type UserUpdateRatingMutationVariables = Exact<{
  ratingId: Scalars['String']['input']
  input: UserUpdateRatingInput
}>

export type UserUpdateRatingMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'Rating'
    createdAt?: Date | null
    id: string
    content?: string | null
    commentId: string
    rating: number
    updatedAt?: Date | null
  } | null
}

export type UserDeleteRatingMutationVariables = Exact<{
  ratingId: Scalars['String']['input']
}>

export type UserDeleteRatingMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type AdminFindManyRatingQueryVariables = Exact<{
  input: AdminFindManyRatingInput
}>

export type AdminFindManyRatingQuery = {
  __typename?: 'Query'
  items: Array<{
    __typename?: 'Rating'
    createdAt?: Date | null
    id: string
    content?: string | null
    commentId: string
    rating: number
    updatedAt?: Date | null
  }>
}

export type AdminUpdateRatingMutationVariables = Exact<{
  ratingId: Scalars['String']['input']
  input: AdminUpdateRatingInput
}>

export type AdminUpdateRatingMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'Rating'
    createdAt?: Date | null
    id: string
    content?: string | null
    commentId: string
    rating: number
    updatedAt?: Date | null
  } | null
}

export type AdminDeleteRatingMutationVariables = Exact<{
  ratingId: Scalars['String']['input']
}>

export type AdminDeleteRatingMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type ReviewDetailsFragment = {
  __typename?: 'Review'
  createdAt?: Date | null
  id: string
  projectId: string
  reviewerId: string
  updatedAt?: Date | null
  name: string
  viewUrl: string
  project?: {
    __typename?: 'Project'
    createdAt?: Date | null
    id: string
    teamId: string
    name: string
    slug: string
    avatarUrl?: string | null
    viewUrl: string
    updatedAt?: Date | null
    team?: {
      __typename?: 'Team'
      createdAt?: Date | null
      id: string
      name: string
      avatarUrl?: string | null
      homeServerId?: string | null
      updatedAt?: Date | null
      viewUrl: string
    } | null
  } | null
  reviewer?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    manager?: boolean | null
    profileUrl: string
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type UserFindManyReviewQueryVariables = Exact<{
  input: UserFindManyReviewInput
}>

export type UserFindManyReviewQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Review'
    createdAt?: Date | null
    id: string
    projectId: string
    reviewerId: string
    updatedAt?: Date | null
    name: string
    viewUrl: string
    project?: {
      __typename?: 'Project'
      createdAt?: Date | null
      id: string
      teamId: string
      name: string
      slug: string
      avatarUrl?: string | null
      viewUrl: string
      updatedAt?: Date | null
      team?: {
        __typename?: 'Team'
        createdAt?: Date | null
        id: string
        name: string
        avatarUrl?: string | null
        homeServerId?: string | null
        updatedAt?: Date | null
        viewUrl: string
      } | null
    } | null
    reviewer?: {
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      id: string
      name?: string | null
      manager?: boolean | null
      profileUrl: string
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    } | null
  }> | null
}

export type UserFindUserProjectReviewQueryVariables = Exact<{
  projectId: Scalars['String']['input']
}>

export type UserFindUserProjectReviewQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Review'
    createdAt?: Date | null
    id: string
    projectId: string
    reviewerId: string
    updatedAt?: Date | null
    name: string
    viewUrl: string
    project?: {
      __typename?: 'Project'
      createdAt?: Date | null
      id: string
      teamId: string
      name: string
      slug: string
      avatarUrl?: string | null
      viewUrl: string
      updatedAt?: Date | null
      team?: {
        __typename?: 'Team'
        createdAt?: Date | null
        id: string
        name: string
        avatarUrl?: string | null
        homeServerId?: string | null
        updatedAt?: Date | null
        viewUrl: string
      } | null
    } | null
    reviewer?: {
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      id: string
      name?: string | null
      manager?: boolean | null
      profileUrl: string
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    } | null
  } | null
}

export type UserFindOneReviewQueryVariables = Exact<{
  reviewId: Scalars['String']['input']
}>

export type UserFindOneReviewQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Review'
    createdAt?: Date | null
    id: string
    projectId: string
    reviewerId: string
    updatedAt?: Date | null
    name: string
    viewUrl: string
    project?: {
      __typename?: 'Project'
      createdAt?: Date | null
      id: string
      teamId: string
      name: string
      slug: string
      avatarUrl?: string | null
      viewUrl: string
      updatedAt?: Date | null
      team?: {
        __typename?: 'Team'
        createdAt?: Date | null
        id: string
        name: string
        avatarUrl?: string | null
        homeServerId?: string | null
        updatedAt?: Date | null
        viewUrl: string
      } | null
    } | null
    reviewer?: {
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      id: string
      name?: string | null
      manager?: boolean | null
      profileUrl: string
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    } | null
  } | null
}

export type UserCreateReviewMutationVariables = Exact<{
  projectId: Scalars['String']['input']
}>

export type UserCreateReviewMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Review'
    createdAt?: Date | null
    id: string
    projectId: string
    reviewerId: string
    updatedAt?: Date | null
    name: string
    viewUrl: string
    project?: {
      __typename?: 'Project'
      createdAt?: Date | null
      id: string
      teamId: string
      name: string
      slug: string
      avatarUrl?: string | null
      viewUrl: string
      updatedAt?: Date | null
      team?: {
        __typename?: 'Team'
        createdAt?: Date | null
        id: string
        name: string
        avatarUrl?: string | null
        homeServerId?: string | null
        updatedAt?: Date | null
        viewUrl: string
      } | null
    } | null
    reviewer?: {
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      id: string
      name?: string | null
      manager?: boolean | null
      profileUrl: string
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    } | null
  } | null
}

export type UserDeleteReviewMutationVariables = Exact<{
  reviewId: Scalars['String']['input']
}>

export type UserDeleteReviewMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type AdminFindManyReviewQueryVariables = Exact<{
  input: AdminFindManyReviewInput
}>

export type AdminFindManyReviewQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'ReviewPaging'
    data: Array<{
      __typename?: 'Review'
      createdAt?: Date | null
      id: string
      projectId: string
      reviewerId: string
      updatedAt?: Date | null
      name: string
      viewUrl: string
      project?: {
        __typename?: 'Project'
        createdAt?: Date | null
        id: string
        teamId: string
        name: string
        slug: string
        avatarUrl?: string | null
        viewUrl: string
        updatedAt?: Date | null
        team?: {
          __typename?: 'Team'
          createdAt?: Date | null
          id: string
          name: string
          avatarUrl?: string | null
          homeServerId?: string | null
          updatedAt?: Date | null
          viewUrl: string
        } | null
      } | null
      reviewer?: {
        __typename?: 'User'
        avatarUrl?: string | null
        createdAt?: Date | null
        developer?: boolean | null
        id: string
        name?: string | null
        manager?: boolean | null
        profileUrl: string
        role?: UserRole | null
        status?: UserStatus | null
        updatedAt?: Date | null
        username?: string | null
      } | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type AdminFindOneReviewQueryVariables = Exact<{
  reviewId: Scalars['String']['input']
}>

export type AdminFindOneReviewQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Review'
    createdAt?: Date | null
    id: string
    projectId: string
    reviewerId: string
    updatedAt?: Date | null
    name: string
    viewUrl: string
    project?: {
      __typename?: 'Project'
      createdAt?: Date | null
      id: string
      teamId: string
      name: string
      slug: string
      avatarUrl?: string | null
      viewUrl: string
      updatedAt?: Date | null
      team?: {
        __typename?: 'Team'
        createdAt?: Date | null
        id: string
        name: string
        avatarUrl?: string | null
        homeServerId?: string | null
        updatedAt?: Date | null
        viewUrl: string
      } | null
    } | null
    reviewer?: {
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      id: string
      name?: string | null
      manager?: boolean | null
      profileUrl: string
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    } | null
  } | null
}

export type AdminDeleteReviewMutationVariables = Exact<{
  reviewId: Scalars['String']['input']
}>

export type AdminDeleteReviewMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type TeamDetailsFragment = {
  __typename?: 'Team'
  createdAt?: Date | null
  id: string
  name: string
  avatarUrl?: string | null
  homeServerId?: string | null
  updatedAt?: Date | null
  viewUrl: string
}

export type TeamMemberDetailsFragment = {
  __typename?: 'TeamMember'
  createdAt?: Date | null
  id: string
  userId: string
  admin?: boolean | null
  updatedAt?: Date | null
  user?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    manager?: boolean | null
    profileUrl: string
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type UserGetTeamMembersQueryVariables = Exact<{
  teamId: Scalars['String']['input']
}>

export type UserGetTeamMembersQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'TeamMember'
    createdAt?: Date | null
    id: string
    userId: string
    admin?: boolean | null
    updatedAt?: Date | null
    user?: {
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      id: string
      name?: string | null
      manager?: boolean | null
      profileUrl: string
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    } | null
  }> | null
}

export type UserGetTeamMemberQueryVariables = Exact<{
  teamId: Scalars['String']['input']
}>

export type UserGetTeamMemberQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'TeamMember'
    createdAt?: Date | null
    id: string
    userId: string
    admin?: boolean | null
    updatedAt?: Date | null
    user?: {
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      id: string
      name?: string | null
      manager?: boolean | null
      profileUrl: string
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    } | null
  } | null
}

export type UserFindManyTeamQueryVariables = Exact<{
  input: UserFindManyTeamInput
}>

export type UserFindManyTeamQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'TeamPaging'
    data: Array<{
      __typename?: 'Team'
      createdAt?: Date | null
      id: string
      name: string
      avatarUrl?: string | null
      homeServerId?: string | null
      updatedAt?: Date | null
      viewUrl: string
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type UserFindOneTeamQueryVariables = Exact<{
  teamId: Scalars['String']['input']
}>

export type UserFindOneTeamQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Team'
    createdAt?: Date | null
    id: string
    name: string
    avatarUrl?: string | null
    homeServerId?: string | null
    updatedAt?: Date | null
    viewUrl: string
  } | null
}

export type UserCreateTeamMutationVariables = Exact<{
  input: UserCreateTeamInput
}>

export type UserCreateTeamMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Team'
    createdAt?: Date | null
    id: string
    name: string
    avatarUrl?: string | null
    homeServerId?: string | null
    updatedAt?: Date | null
    viewUrl: string
  } | null
}

export type UserUpdateTeamMutationVariables = Exact<{
  teamId: Scalars['String']['input']
  input: UserUpdateTeamInput
}>

export type UserUpdateTeamMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'Team'
    createdAt?: Date | null
    id: string
    name: string
    avatarUrl?: string | null
    homeServerId?: string | null
    updatedAt?: Date | null
    viewUrl: string
  } | null
}

export type UserDeleteTeamMutationVariables = Exact<{
  teamId: Scalars['String']['input']
}>

export type UserDeleteTeamMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type AdminFindManyTeamQueryVariables = Exact<{
  input: AdminFindManyTeamInput
}>

export type AdminFindManyTeamQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'TeamPaging'
    data: Array<{
      __typename?: 'Team'
      createdAt?: Date | null
      id: string
      name: string
      avatarUrl?: string | null
      homeServerId?: string | null
      updatedAt?: Date | null
      viewUrl: string
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type AdminGetTeamMembersQueryVariables = Exact<{
  teamId: Scalars['String']['input']
}>

export type AdminGetTeamMembersQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'TeamMember'
    createdAt?: Date | null
    id: string
    userId: string
    admin?: boolean | null
    updatedAt?: Date | null
    user?: {
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      id: string
      name?: string | null
      manager?: boolean | null
      profileUrl: string
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    } | null
  }> | null
}

export type AdminFindOneTeamQueryVariables = Exact<{
  teamId: Scalars['String']['input']
}>

export type AdminFindOneTeamQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Team'
    createdAt?: Date | null
    id: string
    name: string
    avatarUrl?: string | null
    homeServerId?: string | null
    updatedAt?: Date | null
    viewUrl: string
  } | null
}

export type AdminUpdateTeamMutationVariables = Exact<{
  teamId: Scalars['String']['input']
  input: AdminUpdateTeamInput
}>

export type AdminUpdateTeamMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'Team'
    createdAt?: Date | null
    id: string
    name: string
    avatarUrl?: string | null
    homeServerId?: string | null
    updatedAt?: Date | null
    viewUrl: string
  } | null
}

export type AdminDeleteTeamMutationVariables = Exact<{
  teamId: Scalars['String']['input']
}>

export type AdminDeleteTeamMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type AdminAddTeamMemberMutationVariables = Exact<{
  teamId: Scalars['String']['input']
  userId: Scalars['String']['input']
}>

export type AdminAddTeamMemberMutation = { __typename?: 'Mutation'; added?: boolean | null }

export type AdminRemoveTeamMemberMutationVariables = Exact<{
  teamId: Scalars['String']['input']
  userId: Scalars['String']['input']
}>

export type AdminRemoveTeamMemberMutation = { __typename?: 'Mutation'; removed?: boolean | null }

export type AdminToggleTeamAdminMutationVariables = Exact<{
  teamId: Scalars['String']['input']
  userId: Scalars['String']['input']
}>

export type AdminToggleTeamAdminMutation = { __typename?: 'Mutation'; toggled?: boolean | null }

export type UserAddTeamMemberMutationVariables = Exact<{
  teamId: Scalars['String']['input']
  userId: Scalars['String']['input']
}>

export type UserAddTeamMemberMutation = { __typename?: 'Mutation'; added?: boolean | null }

export type UserRemoveTeamMemberMutationVariables = Exact<{
  teamId: Scalars['String']['input']
  userId: Scalars['String']['input']
}>

export type UserRemoveTeamMemberMutation = { __typename?: 'Mutation'; removed?: boolean | null }

export type UserToggleTeamAdminMutationVariables = Exact<{
  teamId: Scalars['String']['input']
  userId: Scalars['String']['input']
}>

export type UserToggleTeamAdminMutation = { __typename?: 'Mutation'; toggled?: boolean | null }

export type UserDetailsFragment = {
  __typename?: 'User'
  avatarUrl?: string | null
  createdAt?: Date | null
  developer?: boolean | null
  id: string
  name?: string | null
  manager?: boolean | null
  profileUrl: string
  role?: UserRole | null
  status?: UserStatus | null
  updatedAt?: Date | null
  username?: string | null
}

export type AdminCreateUserMutationVariables = Exact<{
  input: AdminCreateUserInput
}>

export type AdminCreateUserMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    manager?: boolean | null
    profileUrl: string
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type AdminDeleteUserMutationVariables = Exact<{
  userId: Scalars['String']['input']
}>

export type AdminDeleteUserMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type AdminFindManyUserQueryVariables = Exact<{
  input: AdminFindManyUserInput
}>

export type AdminFindManyUserQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'UserPaging'
    data: Array<{
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      id: string
      name?: string | null
      manager?: boolean | null
      profileUrl: string
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
      identities?: Array<{
        __typename?: 'Identity'
        createdAt: Date
        expired?: boolean | null
        id: string
        name?: string | null
        profile?: any | null
        provider: IdentityProvider
        providerId: string
        updatedAt: Date
        url?: string | null
        verified?: boolean | null
      }> | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type AdminFindOneUserQueryVariables = Exact<{
  userId: Scalars['String']['input']
}>

export type AdminFindOneUserQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    manager?: boolean | null
    profileUrl: string
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type AdminUpdateUserMutationVariables = Exact<{
  userId: Scalars['String']['input']
  input: AdminUpdateUserInput
}>

export type AdminUpdateUserMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    manager?: boolean | null
    profileUrl: string
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type UserFindManyUserQueryVariables = Exact<{
  input: UserFindManyUserInput
}>

export type UserFindManyUserQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'UserPaging'
    data: Array<{
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      id: string
      name?: string | null
      manager?: boolean | null
      profileUrl: string
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type UserFindOneUserQueryVariables = Exact<{
  username: Scalars['String']['input']
}>

export type UserFindOneUserQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    manager?: boolean | null
    profileUrl: string
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type UserUpdateUserMutationVariables = Exact<{
  input: UserUpdateUserInput
}>

export type UserUpdateUserMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    manager?: boolean | null
    profileUrl: string
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export const UserDetailsFragmentDoc = gql`
  fragment UserDetails on User {
    avatarUrl
    createdAt
    developer
    id
    name
    manager
    profileUrl
    role
    status
    updatedAt
    username
  }
`
export const CommentDetailsFragmentDoc = gql`
  fragment CommentDetails on Comment {
    authorId
    category
    content
    createdAt
    id
    parentId
    reviewId
    updatedAt
    versionBrowser
    versionOs
    author {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const AppConfigDetailsFragmentDoc = gql`
  fragment AppConfigDetails on AppConfig {
    authDiscordEnabled
    authPasswordEnabled
    authRegisterEnabled
    authSolanaEnabled
  }
`
export const PagingMetaDetailsFragmentDoc = gql`
  fragment PagingMetaDetails on PagingMeta {
    currentPage
    isFirstPage
    isLastPage
    nextPage
    pageCount
    previousPage
    totalCount
  }
`
export const DiscordBotDetailsFragmentDoc = gql`
  fragment DiscordBotDetails on DiscordBot {
    id
    username
    avatarUrl
    inviteUrl
    manageUrl
  }
`
export const DiscordServerDetailsFragmentDoc = gql`
  fragment DiscordServerDetails on DiscordServer {
    id
    name
    avatarUrl
    permissions
    createChannels
    logChannelId
    projectCategoryId
    teamCategoryId
  }
`
export const DiscordRoleDetailsFragmentDoc = gql`
  fragment DiscordRoleDetails on DiscordRole {
    id
    name
    managed
    color
    position
  }
`
export const DiscordChannelDetailsFragmentDoc = gql`
  fragment DiscordChannelDetails on DiscordChannel {
    id
    name
    type
    parentId
    guildId
  }
`
export const IdentityDetailsFragmentDoc = gql`
  fragment IdentityDetails on Identity {
    createdAt
    expired
    id
    name
    profile
    provider
    providerId
    updatedAt
    url
    verified
  }
`
export const IdentityChallengeDetailsFragmentDoc = gql`
  fragment IdentityChallengeDetails on IdentityChallenge {
    id
    createdAt
    updatedAt
    provider
    providerId
    challenge
    signature
    ip
    userAgent
    verified
  }
`
export const RatingDetailsFragmentDoc = gql`
  fragment RatingDetails on Rating {
    createdAt
    id
    content
    commentId
    rating
    updatedAt
  }
`
export const TeamDetailsFragmentDoc = gql`
  fragment TeamDetails on Team {
    createdAt
    id
    name
    avatarUrl
    homeServerId
    updatedAt
    viewUrl
  }
`
export const ProjectDetailsFragmentDoc = gql`
  fragment ProjectDetails on Project {
    createdAt
    id
    team {
      ...TeamDetails
    }
    teamId
    name
    slug
    avatarUrl
    viewUrl
    updatedAt
  }
  ${TeamDetailsFragmentDoc}
`
export const ReviewDetailsFragmentDoc = gql`
  fragment ReviewDetails on Review {
    createdAt
    id
    projectId
    reviewerId
    updatedAt
    name
    project {
      ...ProjectDetails
    }
    reviewer {
      ...UserDetails
    }
    viewUrl
  }
  ${ProjectDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
`
export const TeamMemberDetailsFragmentDoc = gql`
  fragment TeamMemberDetails on TeamMember {
    createdAt
    id
    userId
    user {
      ...UserDetails
    }
    admin
    updatedAt
  }
  ${UserDetailsFragmentDoc}
`
export const LoginDocument = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const LogoutDocument = gql`
  mutation logout {
    logout
  }
`
export const RegisterDocument = gql`
  mutation register($input: RegisterInput!) {
    register(input: $input) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const MeDocument = gql`
  query me {
    me {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const UserFindManyCommentDocument = gql`
  query userFindManyComment($input: UserFindManyCommentInput!) {
    items: userFindManyComment(input: $input) {
      ...CommentDetails
      children {
        ...CommentDetails
      }
    }
  }
  ${CommentDetailsFragmentDoc}
`
export const UserCreateCommentDocument = gql`
  mutation userCreateComment($input: UserCreateCommentInput!) {
    created: userCreateComment(input: $input) {
      ...CommentDetails
    }
  }
  ${CommentDetailsFragmentDoc}
`
export const UserUpdateCommentDocument = gql`
  mutation userUpdateComment($commentId: String!, $input: UserUpdateCommentInput!) {
    updated: userUpdateComment(commentId: $commentId, input: $input) {
      ...CommentDetails
    }
  }
  ${CommentDetailsFragmentDoc}
`
export const UserDeleteCommentDocument = gql`
  mutation userDeleteComment($commentId: String!) {
    deleted: userDeleteComment(commentId: $commentId)
  }
`
export const AdminFindManyCommentDocument = gql`
  query adminFindManyComment($input: AdminFindManyCommentInput!) {
    items: adminFindManyComment(input: $input) {
      ...CommentDetails
      children {
        ...CommentDetails
      }
    }
  }
  ${CommentDetailsFragmentDoc}
`
export const AdminUpdateCommentDocument = gql`
  mutation adminUpdateComment($commentId: String!, $input: AdminUpdateCommentInput!) {
    updated: adminUpdateComment(commentId: $commentId, input: $input) {
      ...CommentDetails
    }
  }
  ${CommentDetailsFragmentDoc}
`
export const AdminDeleteCommentDocument = gql`
  mutation adminDeleteComment($commentId: String!) {
    deleted: adminDeleteComment(commentId: $commentId)
  }
`
export const UptimeDocument = gql`
  query uptime {
    uptime
  }
`
export const AppConfigDocument = gql`
  query appConfig {
    config: appConfig {
      ...AppConfigDetails
    }
  }
  ${AppConfigDetailsFragmentDoc}
`
export const AdminGetDiscordBotDocument = gql`
  query adminGetDiscordBot {
    item: adminGetDiscordBot {
      ...DiscordBotDetails
    }
  }
  ${DiscordBotDetailsFragmentDoc}
`
export const AdminGetDiscordServersDocument = gql`
  query adminGetDiscordServers {
    items: adminGetDiscordServers {
      ...DiscordServerDetails
    }
  }
  ${DiscordServerDetailsFragmentDoc}
`
export const AdminGetDiscordRolesDocument = gql`
  query adminGetDiscordRoles($serverId: String!) {
    items: adminGetDiscordRoles(serverId: $serverId) {
      ...DiscordRoleDetails
    }
  }
  ${DiscordRoleDetailsFragmentDoc}
`
export const AdminGetDiscordChannelsDocument = gql`
  query adminGetDiscordChannels($serverId: String!) {
    items: adminGetDiscordChannels(serverId: $serverId) {
      ...DiscordChannelDetails
    }
  }
  ${DiscordChannelDetailsFragmentDoc}
`
export const AdminGetProjectChannelsDocument = gql`
  query adminGetProjectChannels($projectId: String!) {
    items: adminGetProjectChannels(projectId: $projectId) {
      ...DiscordChannelDetails
    }
  }
  ${DiscordChannelDetailsFragmentDoc}
`
export const AdminGetTeamChannelsDocument = gql`
  query adminGetTeamChannels($teamId: String!) {
    items: adminGetTeamChannels(teamId: $teamId) {
      ...DiscordChannelDetails
    }
  }
  ${DiscordChannelDetailsFragmentDoc}
`
export const AdminPingDiscordChannelDocument = gql`
  mutation adminPingDiscordChannel($serverId: String!, $channelId: String!) {
    pong: adminPingDiscordChannel(serverId: $serverId, channelId: $channelId)
  }
`
export const AdminCreateProjectChannelDocument = gql`
  mutation adminCreateProjectChannel($serverId: String!, $channelId: String!, $projectId: String!) {
    created: adminCreateProjectChannel(serverId: $serverId, channelId: $channelId, projectId: $projectId)
  }
`
export const AdminCreateTeamChannelDocument = gql`
  mutation adminCreateTeamChannel($serverId: String!, $channelId: String!, $teamId: String!) {
    created: adminCreateTeamChannel(serverId: $serverId, channelId: $channelId, teamId: $teamId)
  }
`
export const AdminUpdateDiscordServerDocument = gql`
  mutation adminUpdateDiscordServer($serverId: String!, $input: AdminUpdateDiscordServerInput!) {
    updated: adminUpdateDiscordServer(serverId: $serverId, input: $input)
  }
`
export const AdminDeleteProjectChannelDocument = gql`
  mutation adminDeleteProjectChannel($channelId: String!, $projectId: String!) {
    deleted: adminDeleteProjectChannel(channelId: $channelId, projectId: $projectId)
  }
`
export const AdminDeleteTeamChannelDocument = gql`
  mutation adminDeleteTeamChannel($channelId: String!, $teamId: String!) {
    deleted: adminDeleteTeamChannel(channelId: $channelId, teamId: $teamId)
  }
`
export const AdminLeaveDiscordServerDocument = gql`
  mutation adminLeaveDiscordServer($serverId: String!) {
    left: adminLeaveDiscordServer(serverId: $serverId)
  }
`
export const UserGetDiscordServersDocument = gql`
  query userGetDiscordServers {
    items: userGetDiscordServers {
      ...DiscordServerDetails
    }
  }
  ${DiscordServerDetailsFragmentDoc}
`
export const UserGetProjectChannelsDocument = gql`
  query userGetProjectChannels($projectId: String!) {
    items: userGetProjectChannels(projectId: $projectId) {
      ...DiscordChannelDetails
    }
  }
  ${DiscordChannelDetailsFragmentDoc}
`
export const UserGetTeamChannelsDocument = gql`
  query userGetTeamChannels($teamId: String!) {
    items: userGetTeamChannels(teamId: $teamId) {
      ...DiscordChannelDetails
    }
  }
  ${DiscordChannelDetailsFragmentDoc}
`
export const AdminFindManyIdentityDocument = gql`
  query adminFindManyIdentity($input: AdminFindManyIdentityInput!) {
    items: adminFindManyIdentity(input: $input) {
      ...IdentityDetails
      challenges {
        ...IdentityChallengeDetails
      }
      owner {
        ...UserDetails
      }
    }
  }
  ${IdentityDetailsFragmentDoc}
  ${IdentityChallengeDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
`
export const AdminCreateIdentityDocument = gql`
  mutation adminCreateIdentity($input: AdminCreateIdentityInput!) {
    created: adminCreateIdentity(input: $input) {
      ...IdentityDetails
    }
  }
  ${IdentityDetailsFragmentDoc}
`
export const AdminDeleteIdentityDocument = gql`
  mutation adminDeleteIdentity($identityId: String!) {
    deleted: adminDeleteIdentity(identityId: $identityId)
  }
`
export const UserFindManyIdentityDocument = gql`
  query userFindManyIdentity($input: UserFindManyIdentityInput!) {
    items: userFindManyIdentity(input: $input) {
      ...IdentityDetails
    }
  }
  ${IdentityDetailsFragmentDoc}
`
export const UserDeleteIdentityDocument = gql`
  mutation userDeleteIdentity($identityId: String!) {
    deleted: userDeleteIdentity(identityId: $identityId)
  }
`
export const UserRequestIdentityChallengeDocument = gql`
  query userRequestIdentityChallenge($input: RequestIdentityChallengeInput!) {
    challenge: userRequestIdentityChallenge(input: $input) {
      ...IdentityChallengeDetails
    }
  }
  ${IdentityChallengeDetailsFragmentDoc}
`
export const UserVerifyIdentityChallengeDocument = gql`
  mutation userVerifyIdentityChallenge($input: VerifyIdentityChallengeInput!) {
    verified: userVerifyIdentityChallenge(input: $input) {
      ...IdentityChallengeDetails
    }
  }
  ${IdentityChallengeDetailsFragmentDoc}
`
export const UserLinkIdentityDocument = gql`
  mutation userLinkIdentity($input: LinkIdentityInput!) {
    linked: userLinkIdentity(input: $input) {
      ...IdentityDetails
    }
  }
  ${IdentityDetailsFragmentDoc}
`
export const AnonRequestIdentityChallengeDocument = gql`
  query anonRequestIdentityChallenge($input: RequestIdentityChallengeInput!) {
    challenge: anonRequestIdentityChallenge(input: $input) {
      ...IdentityChallengeDetails
    }
  }
  ${IdentityChallengeDetailsFragmentDoc}
`
export const AnonVerifyIdentityChallengeDocument = gql`
  mutation anonVerifyIdentityChallenge($input: VerifyIdentityChallengeInput!) {
    verified: anonVerifyIdentityChallenge(input: $input) {
      ...IdentityChallengeDetails
    }
  }
  ${IdentityChallengeDetailsFragmentDoc}
`
export const UserFindManyProjectDocument = gql`
  query userFindManyProject($input: UserFindManyProjectInput!) {
    paging: userFindManyProject(input: $input) {
      data {
        ...ProjectDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${ProjectDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const UserFindOneProjectDocument = gql`
  query userFindOneProject($projectId: String!) {
    item: userFindOneProject(projectId: $projectId) {
      ...ProjectDetails
    }
  }
  ${ProjectDetailsFragmentDoc}
`
export const UserCreateProjectDocument = gql`
  mutation userCreateProject($input: UserCreateProjectInput!) {
    created: userCreateProject(input: $input) {
      ...ProjectDetails
    }
  }
  ${ProjectDetailsFragmentDoc}
`
export const UserUpdateProjectDocument = gql`
  mutation userUpdateProject($projectId: String!, $input: UserUpdateProjectInput!) {
    updated: userUpdateProject(projectId: $projectId, input: $input) {
      ...ProjectDetails
    }
  }
  ${ProjectDetailsFragmentDoc}
`
export const UserDeleteProjectDocument = gql`
  mutation userDeleteProject($projectId: String!) {
    deleted: userDeleteProject(projectId: $projectId)
  }
`
export const AdminFindManyProjectDocument = gql`
  query adminFindManyProject($input: AdminFindManyProjectInput!) {
    paging: adminFindManyProject(input: $input) {
      data {
        ...ProjectDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${ProjectDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const AdminFindOneProjectDocument = gql`
  query adminFindOneProject($projectId: String!) {
    item: adminFindOneProject(projectId: $projectId) {
      ...ProjectDetails
    }
  }
  ${ProjectDetailsFragmentDoc}
`
export const AdminUpdateProjectDocument = gql`
  mutation adminUpdateProject($projectId: String!, $input: AdminUpdateProjectInput!) {
    updated: adminUpdateProject(projectId: $projectId, input: $input) {
      ...ProjectDetails
    }
  }
  ${ProjectDetailsFragmentDoc}
`
export const AdminDeleteProjectDocument = gql`
  mutation adminDeleteProject($projectId: String!) {
    deleted: adminDeleteProject(projectId: $projectId)
  }
`
export const UserFindManyRatingDocument = gql`
  query userFindManyRating($input: UserFindManyRatingInput!) {
    items: userFindManyRating(input: $input) {
      ...RatingDetails
    }
  }
  ${RatingDetailsFragmentDoc}
`
export const UserCreateRatingDocument = gql`
  mutation userCreateRating($input: UserCreateRatingInput!) {
    created: userCreateRating(input: $input) {
      ...RatingDetails
    }
  }
  ${RatingDetailsFragmentDoc}
`
export const UserUpdateRatingDocument = gql`
  mutation userUpdateRating($ratingId: String!, $input: UserUpdateRatingInput!) {
    updated: userUpdateRating(ratingId: $ratingId, input: $input) {
      ...RatingDetails
    }
  }
  ${RatingDetailsFragmentDoc}
`
export const UserDeleteRatingDocument = gql`
  mutation userDeleteRating($ratingId: String!) {
    deleted: userDeleteRating(ratingId: $ratingId)
  }
`
export const AdminFindManyRatingDocument = gql`
  query adminFindManyRating($input: AdminFindManyRatingInput!) {
    items: adminFindManyRating(input: $input) {
      ...RatingDetails
    }
  }
  ${RatingDetailsFragmentDoc}
`
export const AdminUpdateRatingDocument = gql`
  mutation adminUpdateRating($ratingId: String!, $input: AdminUpdateRatingInput!) {
    updated: adminUpdateRating(ratingId: $ratingId, input: $input) {
      ...RatingDetails
    }
  }
  ${RatingDetailsFragmentDoc}
`
export const AdminDeleteRatingDocument = gql`
  mutation adminDeleteRating($ratingId: String!) {
    deleted: adminDeleteRating(ratingId: $ratingId)
  }
`
export const UserFindManyReviewDocument = gql`
  query userFindManyReview($input: UserFindManyReviewInput!) {
    items: userFindManyReview(input: $input) {
      ...ReviewDetails
    }
  }
  ${ReviewDetailsFragmentDoc}
`
export const UserFindUserProjectReviewDocument = gql`
  query userFindUserProjectReview($projectId: String!) {
    item: userFindUserProjectReview(projectId: $projectId) {
      ...ReviewDetails
    }
  }
  ${ReviewDetailsFragmentDoc}
`
export const UserFindOneReviewDocument = gql`
  query userFindOneReview($reviewId: String!) {
    item: userFindOneReview(reviewId: $reviewId) {
      ...ReviewDetails
    }
  }
  ${ReviewDetailsFragmentDoc}
`
export const UserCreateReviewDocument = gql`
  mutation userCreateReview($projectId: String!) {
    created: userCreateReview(projectId: $projectId) {
      ...ReviewDetails
    }
  }
  ${ReviewDetailsFragmentDoc}
`
export const UserDeleteReviewDocument = gql`
  mutation userDeleteReview($reviewId: String!) {
    deleted: userDeleteReview(reviewId: $reviewId)
  }
`
export const AdminFindManyReviewDocument = gql`
  query adminFindManyReview($input: AdminFindManyReviewInput!) {
    paging: adminFindManyReview(input: $input) {
      data {
        ...ReviewDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${ReviewDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const AdminFindOneReviewDocument = gql`
  query adminFindOneReview($reviewId: String!) {
    item: adminFindOneReview(reviewId: $reviewId) {
      ...ReviewDetails
    }
  }
  ${ReviewDetailsFragmentDoc}
`
export const AdminDeleteReviewDocument = gql`
  mutation adminDeleteReview($reviewId: String!) {
    deleted: adminDeleteReview(reviewId: $reviewId)
  }
`
export const UserGetTeamMembersDocument = gql`
  query userGetTeamMembers($teamId: String!) {
    items: userGetTeamMembers(teamId: $teamId) {
      ...TeamMemberDetails
    }
  }
  ${TeamMemberDetailsFragmentDoc}
`
export const UserGetTeamMemberDocument = gql`
  query userGetTeamMember($teamId: String!) {
    item: userGetTeamMember(teamId: $teamId) {
      ...TeamMemberDetails
    }
  }
  ${TeamMemberDetailsFragmentDoc}
`
export const UserFindManyTeamDocument = gql`
  query userFindManyTeam($input: UserFindManyTeamInput!) {
    paging: userFindManyTeam(input: $input) {
      data {
        ...TeamDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${TeamDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const UserFindOneTeamDocument = gql`
  query userFindOneTeam($teamId: String!) {
    item: userFindOneTeam(teamId: $teamId) {
      ...TeamDetails
    }
  }
  ${TeamDetailsFragmentDoc}
`
export const UserCreateTeamDocument = gql`
  mutation userCreateTeam($input: UserCreateTeamInput!) {
    created: userCreateTeam(input: $input) {
      ...TeamDetails
    }
  }
  ${TeamDetailsFragmentDoc}
`
export const UserUpdateTeamDocument = gql`
  mutation userUpdateTeam($teamId: String!, $input: UserUpdateTeamInput!) {
    updated: userUpdateTeam(teamId: $teamId, input: $input) {
      ...TeamDetails
    }
  }
  ${TeamDetailsFragmentDoc}
`
export const UserDeleteTeamDocument = gql`
  mutation userDeleteTeam($teamId: String!) {
    deleted: userDeleteTeam(teamId: $teamId)
  }
`
export const AdminFindManyTeamDocument = gql`
  query adminFindManyTeam($input: AdminFindManyTeamInput!) {
    paging: adminFindManyTeam(input: $input) {
      data {
        ...TeamDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${TeamDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const AdminGetTeamMembersDocument = gql`
  query adminGetTeamMembers($teamId: String!) {
    items: adminGetTeamMembers(teamId: $teamId) {
      ...TeamMemberDetails
    }
  }
  ${TeamMemberDetailsFragmentDoc}
`
export const AdminFindOneTeamDocument = gql`
  query adminFindOneTeam($teamId: String!) {
    item: adminFindOneTeam(teamId: $teamId) {
      ...TeamDetails
    }
  }
  ${TeamDetailsFragmentDoc}
`
export const AdminUpdateTeamDocument = gql`
  mutation adminUpdateTeam($teamId: String!, $input: AdminUpdateTeamInput!) {
    updated: adminUpdateTeam(teamId: $teamId, input: $input) {
      ...TeamDetails
    }
  }
  ${TeamDetailsFragmentDoc}
`
export const AdminDeleteTeamDocument = gql`
  mutation adminDeleteTeam($teamId: String!) {
    deleted: adminDeleteTeam(teamId: $teamId)
  }
`
export const AdminAddTeamMemberDocument = gql`
  mutation adminAddTeamMember($teamId: String!, $userId: String!) {
    added: adminAddTeamMember(teamId: $teamId, userId: $userId)
  }
`
export const AdminRemoveTeamMemberDocument = gql`
  mutation adminRemoveTeamMember($teamId: String!, $userId: String!) {
    removed: adminRemoveTeamMember(teamId: $teamId, userId: $userId)
  }
`
export const AdminToggleTeamAdminDocument = gql`
  mutation adminToggleTeamAdmin($teamId: String!, $userId: String!) {
    toggled: adminToggleTeamAdmin(teamId: $teamId, userId: $userId)
  }
`
export const UserAddTeamMemberDocument = gql`
  mutation userAddTeamMember($teamId: String!, $userId: String!) {
    added: userAddTeamMember(teamId: $teamId, userId: $userId)
  }
`
export const UserRemoveTeamMemberDocument = gql`
  mutation userRemoveTeamMember($teamId: String!, $userId: String!) {
    removed: userRemoveTeamMember(teamId: $teamId, userId: $userId)
  }
`
export const UserToggleTeamAdminDocument = gql`
  mutation userToggleTeamAdmin($teamId: String!, $userId: String!) {
    toggled: userToggleTeamAdmin(teamId: $teamId, userId: $userId)
  }
`
export const AdminCreateUserDocument = gql`
  mutation adminCreateUser($input: AdminCreateUserInput!) {
    created: adminCreateUser(input: $input) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const AdminDeleteUserDocument = gql`
  mutation adminDeleteUser($userId: String!) {
    deleted: adminDeleteUser(userId: $userId)
  }
`
export const AdminFindManyUserDocument = gql`
  query adminFindManyUser($input: AdminFindManyUserInput!) {
    paging: adminFindManyUser(input: $input) {
      data {
        ...UserDetails
        identities {
          ...IdentityDetails
        }
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${UserDetailsFragmentDoc}
  ${IdentityDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const AdminFindOneUserDocument = gql`
  query adminFindOneUser($userId: String!) {
    item: adminFindOneUser(userId: $userId) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const AdminUpdateUserDocument = gql`
  mutation adminUpdateUser($userId: String!, $input: AdminUpdateUserInput!) {
    updated: adminUpdateUser(userId: $userId, input: $input) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const UserFindManyUserDocument = gql`
  query userFindManyUser($input: UserFindManyUserInput!) {
    paging: userFindManyUser(input: $input) {
      data {
        ...UserDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${UserDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const UserFindOneUserDocument = gql`
  query userFindOneUser($username: String!) {
    item: userFindOneUser(username: $username) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const UserUpdateUserDocument = gql`
  mutation userUpdateUser($input: UserUpdateUserInput!) {
    updated: userUpdateUser(input: $input) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
  variables?: any,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, variables) => action()
const LoginDocumentString = print(LoginDocument)
const LogoutDocumentString = print(LogoutDocument)
const RegisterDocumentString = print(RegisterDocument)
const MeDocumentString = print(MeDocument)
const UserFindManyCommentDocumentString = print(UserFindManyCommentDocument)
const UserCreateCommentDocumentString = print(UserCreateCommentDocument)
const UserUpdateCommentDocumentString = print(UserUpdateCommentDocument)
const UserDeleteCommentDocumentString = print(UserDeleteCommentDocument)
const AdminFindManyCommentDocumentString = print(AdminFindManyCommentDocument)
const AdminUpdateCommentDocumentString = print(AdminUpdateCommentDocument)
const AdminDeleteCommentDocumentString = print(AdminDeleteCommentDocument)
const UptimeDocumentString = print(UptimeDocument)
const AppConfigDocumentString = print(AppConfigDocument)
const AdminGetDiscordBotDocumentString = print(AdminGetDiscordBotDocument)
const AdminGetDiscordServersDocumentString = print(AdminGetDiscordServersDocument)
const AdminGetDiscordRolesDocumentString = print(AdminGetDiscordRolesDocument)
const AdminGetDiscordChannelsDocumentString = print(AdminGetDiscordChannelsDocument)
const AdminGetProjectChannelsDocumentString = print(AdminGetProjectChannelsDocument)
const AdminGetTeamChannelsDocumentString = print(AdminGetTeamChannelsDocument)
const AdminPingDiscordChannelDocumentString = print(AdminPingDiscordChannelDocument)
const AdminCreateProjectChannelDocumentString = print(AdminCreateProjectChannelDocument)
const AdminCreateTeamChannelDocumentString = print(AdminCreateTeamChannelDocument)
const AdminUpdateDiscordServerDocumentString = print(AdminUpdateDiscordServerDocument)
const AdminDeleteProjectChannelDocumentString = print(AdminDeleteProjectChannelDocument)
const AdminDeleteTeamChannelDocumentString = print(AdminDeleteTeamChannelDocument)
const AdminLeaveDiscordServerDocumentString = print(AdminLeaveDiscordServerDocument)
const UserGetDiscordServersDocumentString = print(UserGetDiscordServersDocument)
const UserGetProjectChannelsDocumentString = print(UserGetProjectChannelsDocument)
const UserGetTeamChannelsDocumentString = print(UserGetTeamChannelsDocument)
const AdminFindManyIdentityDocumentString = print(AdminFindManyIdentityDocument)
const AdminCreateIdentityDocumentString = print(AdminCreateIdentityDocument)
const AdminDeleteIdentityDocumentString = print(AdminDeleteIdentityDocument)
const UserFindManyIdentityDocumentString = print(UserFindManyIdentityDocument)
const UserDeleteIdentityDocumentString = print(UserDeleteIdentityDocument)
const UserRequestIdentityChallengeDocumentString = print(UserRequestIdentityChallengeDocument)
const UserVerifyIdentityChallengeDocumentString = print(UserVerifyIdentityChallengeDocument)
const UserLinkIdentityDocumentString = print(UserLinkIdentityDocument)
const AnonRequestIdentityChallengeDocumentString = print(AnonRequestIdentityChallengeDocument)
const AnonVerifyIdentityChallengeDocumentString = print(AnonVerifyIdentityChallengeDocument)
const UserFindManyProjectDocumentString = print(UserFindManyProjectDocument)
const UserFindOneProjectDocumentString = print(UserFindOneProjectDocument)
const UserCreateProjectDocumentString = print(UserCreateProjectDocument)
const UserUpdateProjectDocumentString = print(UserUpdateProjectDocument)
const UserDeleteProjectDocumentString = print(UserDeleteProjectDocument)
const AdminFindManyProjectDocumentString = print(AdminFindManyProjectDocument)
const AdminFindOneProjectDocumentString = print(AdminFindOneProjectDocument)
const AdminUpdateProjectDocumentString = print(AdminUpdateProjectDocument)
const AdminDeleteProjectDocumentString = print(AdminDeleteProjectDocument)
const UserFindManyRatingDocumentString = print(UserFindManyRatingDocument)
const UserCreateRatingDocumentString = print(UserCreateRatingDocument)
const UserUpdateRatingDocumentString = print(UserUpdateRatingDocument)
const UserDeleteRatingDocumentString = print(UserDeleteRatingDocument)
const AdminFindManyRatingDocumentString = print(AdminFindManyRatingDocument)
const AdminUpdateRatingDocumentString = print(AdminUpdateRatingDocument)
const AdminDeleteRatingDocumentString = print(AdminDeleteRatingDocument)
const UserFindManyReviewDocumentString = print(UserFindManyReviewDocument)
const UserFindUserProjectReviewDocumentString = print(UserFindUserProjectReviewDocument)
const UserFindOneReviewDocumentString = print(UserFindOneReviewDocument)
const UserCreateReviewDocumentString = print(UserCreateReviewDocument)
const UserDeleteReviewDocumentString = print(UserDeleteReviewDocument)
const AdminFindManyReviewDocumentString = print(AdminFindManyReviewDocument)
const AdminFindOneReviewDocumentString = print(AdminFindOneReviewDocument)
const AdminDeleteReviewDocumentString = print(AdminDeleteReviewDocument)
const UserGetTeamMembersDocumentString = print(UserGetTeamMembersDocument)
const UserGetTeamMemberDocumentString = print(UserGetTeamMemberDocument)
const UserFindManyTeamDocumentString = print(UserFindManyTeamDocument)
const UserFindOneTeamDocumentString = print(UserFindOneTeamDocument)
const UserCreateTeamDocumentString = print(UserCreateTeamDocument)
const UserUpdateTeamDocumentString = print(UserUpdateTeamDocument)
const UserDeleteTeamDocumentString = print(UserDeleteTeamDocument)
const AdminFindManyTeamDocumentString = print(AdminFindManyTeamDocument)
const AdminGetTeamMembersDocumentString = print(AdminGetTeamMembersDocument)
const AdminFindOneTeamDocumentString = print(AdminFindOneTeamDocument)
const AdminUpdateTeamDocumentString = print(AdminUpdateTeamDocument)
const AdminDeleteTeamDocumentString = print(AdminDeleteTeamDocument)
const AdminAddTeamMemberDocumentString = print(AdminAddTeamMemberDocument)
const AdminRemoveTeamMemberDocumentString = print(AdminRemoveTeamMemberDocument)
const AdminToggleTeamAdminDocumentString = print(AdminToggleTeamAdminDocument)
const UserAddTeamMemberDocumentString = print(UserAddTeamMemberDocument)
const UserRemoveTeamMemberDocumentString = print(UserRemoveTeamMemberDocument)
const UserToggleTeamAdminDocumentString = print(UserToggleTeamAdminDocument)
const AdminCreateUserDocumentString = print(AdminCreateUserDocument)
const AdminDeleteUserDocumentString = print(AdminDeleteUserDocument)
const AdminFindManyUserDocumentString = print(AdminFindManyUserDocument)
const AdminFindOneUserDocumentString = print(AdminFindOneUserDocument)
const AdminUpdateUserDocumentString = print(AdminUpdateUserDocument)
const UserFindManyUserDocumentString = print(UserFindManyUserDocument)
const UserFindOneUserDocumentString = print(UserFindOneUserDocument)
const UserUpdateUserDocumentString = print(UserUpdateUserDocument)
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    login(
      variables: LoginMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: LoginMutation; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<LoginMutation>(LoginDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'login',
        'mutation',
        variables,
      )
    },
    logout(
      variables?: LogoutMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: LogoutMutation; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<LogoutMutation>(LogoutDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'logout',
        'mutation',
        variables,
      )
    },
    register(
      variables: RegisterMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: RegisterMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<RegisterMutation>(RegisterDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'register',
        'mutation',
        variables,
      )
    },
    me(
      variables?: MeQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: MeQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<MeQuery>(MeDocumentString, variables, { ...requestHeaders, ...wrappedRequestHeaders }),
        'me',
        'query',
        variables,
      )
    },
    userFindManyComment(
      variables: UserFindManyCommentQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindManyCommentQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindManyCommentQuery>(UserFindManyCommentDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindManyComment',
        'query',
        variables,
      )
    },
    userCreateComment(
      variables: UserCreateCommentMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserCreateCommentMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserCreateCommentMutation>(UserCreateCommentDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userCreateComment',
        'mutation',
        variables,
      )
    },
    userUpdateComment(
      variables: UserUpdateCommentMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserUpdateCommentMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserUpdateCommentMutation>(UserUpdateCommentDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userUpdateComment',
        'mutation',
        variables,
      )
    },
    userDeleteComment(
      variables: UserDeleteCommentMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserDeleteCommentMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserDeleteCommentMutation>(UserDeleteCommentDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userDeleteComment',
        'mutation',
        variables,
      )
    },
    adminFindManyComment(
      variables: AdminFindManyCommentQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindManyCommentQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyCommentQuery>(AdminFindManyCommentDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyComment',
        'query',
        variables,
      )
    },
    adminUpdateComment(
      variables: AdminUpdateCommentMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminUpdateCommentMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminUpdateCommentMutation>(AdminUpdateCommentDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminUpdateComment',
        'mutation',
        variables,
      )
    },
    adminDeleteComment(
      variables: AdminDeleteCommentMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteCommentMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteCommentMutation>(AdminDeleteCommentDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteComment',
        'mutation',
        variables,
      )
    },
    uptime(
      variables?: UptimeQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: UptimeQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UptimeQuery>(UptimeDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'uptime',
        'query',
        variables,
      )
    },
    appConfig(
      variables?: AppConfigQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: AppConfigQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AppConfigQuery>(AppConfigDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'appConfig',
        'query',
        variables,
      )
    },
    adminGetDiscordBot(
      variables?: AdminGetDiscordBotQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminGetDiscordBotQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminGetDiscordBotQuery>(AdminGetDiscordBotDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminGetDiscordBot',
        'query',
        variables,
      )
    },
    adminGetDiscordServers(
      variables?: AdminGetDiscordServersQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminGetDiscordServersQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminGetDiscordServersQuery>(AdminGetDiscordServersDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminGetDiscordServers',
        'query',
        variables,
      )
    },
    adminGetDiscordRoles(
      variables: AdminGetDiscordRolesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminGetDiscordRolesQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminGetDiscordRolesQuery>(AdminGetDiscordRolesDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminGetDiscordRoles',
        'query',
        variables,
      )
    },
    adminGetDiscordChannels(
      variables: AdminGetDiscordChannelsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminGetDiscordChannelsQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminGetDiscordChannelsQuery>(AdminGetDiscordChannelsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminGetDiscordChannels',
        'query',
        variables,
      )
    },
    adminGetProjectChannels(
      variables: AdminGetProjectChannelsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminGetProjectChannelsQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminGetProjectChannelsQuery>(AdminGetProjectChannelsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminGetProjectChannels',
        'query',
        variables,
      )
    },
    adminGetTeamChannels(
      variables: AdminGetTeamChannelsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminGetTeamChannelsQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminGetTeamChannelsQuery>(AdminGetTeamChannelsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminGetTeamChannels',
        'query',
        variables,
      )
    },
    adminPingDiscordChannel(
      variables: AdminPingDiscordChannelMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminPingDiscordChannelMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminPingDiscordChannelMutation>(AdminPingDiscordChannelDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminPingDiscordChannel',
        'mutation',
        variables,
      )
    },
    adminCreateProjectChannel(
      variables: AdminCreateProjectChannelMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminCreateProjectChannelMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateProjectChannelMutation>(AdminCreateProjectChannelDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateProjectChannel',
        'mutation',
        variables,
      )
    },
    adminCreateTeamChannel(
      variables: AdminCreateTeamChannelMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminCreateTeamChannelMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateTeamChannelMutation>(AdminCreateTeamChannelDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateTeamChannel',
        'mutation',
        variables,
      )
    },
    adminUpdateDiscordServer(
      variables: AdminUpdateDiscordServerMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminUpdateDiscordServerMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminUpdateDiscordServerMutation>(AdminUpdateDiscordServerDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminUpdateDiscordServer',
        'mutation',
        variables,
      )
    },
    adminDeleteProjectChannel(
      variables: AdminDeleteProjectChannelMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteProjectChannelMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteProjectChannelMutation>(AdminDeleteProjectChannelDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteProjectChannel',
        'mutation',
        variables,
      )
    },
    adminDeleteTeamChannel(
      variables: AdminDeleteTeamChannelMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteTeamChannelMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteTeamChannelMutation>(AdminDeleteTeamChannelDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteTeamChannel',
        'mutation',
        variables,
      )
    },
    adminLeaveDiscordServer(
      variables: AdminLeaveDiscordServerMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminLeaveDiscordServerMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminLeaveDiscordServerMutation>(AdminLeaveDiscordServerDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminLeaveDiscordServer',
        'mutation',
        variables,
      )
    },
    userGetDiscordServers(
      variables?: UserGetDiscordServersQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserGetDiscordServersQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserGetDiscordServersQuery>(UserGetDiscordServersDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userGetDiscordServers',
        'query',
        variables,
      )
    },
    userGetProjectChannels(
      variables: UserGetProjectChannelsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserGetProjectChannelsQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserGetProjectChannelsQuery>(UserGetProjectChannelsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userGetProjectChannels',
        'query',
        variables,
      )
    },
    userGetTeamChannels(
      variables: UserGetTeamChannelsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserGetTeamChannelsQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserGetTeamChannelsQuery>(UserGetTeamChannelsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userGetTeamChannels',
        'query',
        variables,
      )
    },
    adminFindManyIdentity(
      variables: AdminFindManyIdentityQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindManyIdentityQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyIdentityQuery>(AdminFindManyIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyIdentity',
        'query',
        variables,
      )
    },
    adminCreateIdentity(
      variables: AdminCreateIdentityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminCreateIdentityMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateIdentityMutation>(AdminCreateIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateIdentity',
        'mutation',
        variables,
      )
    },
    adminDeleteIdentity(
      variables: AdminDeleteIdentityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteIdentityMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteIdentityMutation>(AdminDeleteIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteIdentity',
        'mutation',
        variables,
      )
    },
    userFindManyIdentity(
      variables: UserFindManyIdentityQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindManyIdentityQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindManyIdentityQuery>(UserFindManyIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindManyIdentity',
        'query',
        variables,
      )
    },
    userDeleteIdentity(
      variables: UserDeleteIdentityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserDeleteIdentityMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserDeleteIdentityMutation>(UserDeleteIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userDeleteIdentity',
        'mutation',
        variables,
      )
    },
    userRequestIdentityChallenge(
      variables: UserRequestIdentityChallengeQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserRequestIdentityChallengeQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserRequestIdentityChallengeQuery>(UserRequestIdentityChallengeDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userRequestIdentityChallenge',
        'query',
        variables,
      )
    },
    userVerifyIdentityChallenge(
      variables: UserVerifyIdentityChallengeMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserVerifyIdentityChallengeMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserVerifyIdentityChallengeMutation>(UserVerifyIdentityChallengeDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userVerifyIdentityChallenge',
        'mutation',
        variables,
      )
    },
    userLinkIdentity(
      variables: UserLinkIdentityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserLinkIdentityMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserLinkIdentityMutation>(UserLinkIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userLinkIdentity',
        'mutation',
        variables,
      )
    },
    anonRequestIdentityChallenge(
      variables: AnonRequestIdentityChallengeQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AnonRequestIdentityChallengeQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AnonRequestIdentityChallengeQuery>(AnonRequestIdentityChallengeDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'anonRequestIdentityChallenge',
        'query',
        variables,
      )
    },
    anonVerifyIdentityChallenge(
      variables: AnonVerifyIdentityChallengeMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AnonVerifyIdentityChallengeMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AnonVerifyIdentityChallengeMutation>(AnonVerifyIdentityChallengeDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'anonVerifyIdentityChallenge',
        'mutation',
        variables,
      )
    },
    userFindManyProject(
      variables: UserFindManyProjectQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindManyProjectQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindManyProjectQuery>(UserFindManyProjectDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindManyProject',
        'query',
        variables,
      )
    },
    userFindOneProject(
      variables: UserFindOneProjectQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindOneProjectQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindOneProjectQuery>(UserFindOneProjectDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindOneProject',
        'query',
        variables,
      )
    },
    userCreateProject(
      variables: UserCreateProjectMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserCreateProjectMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserCreateProjectMutation>(UserCreateProjectDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userCreateProject',
        'mutation',
        variables,
      )
    },
    userUpdateProject(
      variables: UserUpdateProjectMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserUpdateProjectMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserUpdateProjectMutation>(UserUpdateProjectDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userUpdateProject',
        'mutation',
        variables,
      )
    },
    userDeleteProject(
      variables: UserDeleteProjectMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserDeleteProjectMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserDeleteProjectMutation>(UserDeleteProjectDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userDeleteProject',
        'mutation',
        variables,
      )
    },
    adminFindManyProject(
      variables: AdminFindManyProjectQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindManyProjectQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyProjectQuery>(AdminFindManyProjectDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyProject',
        'query',
        variables,
      )
    },
    adminFindOneProject(
      variables: AdminFindOneProjectQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindOneProjectQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindOneProjectQuery>(AdminFindOneProjectDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindOneProject',
        'query',
        variables,
      )
    },
    adminUpdateProject(
      variables: AdminUpdateProjectMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminUpdateProjectMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminUpdateProjectMutation>(AdminUpdateProjectDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminUpdateProject',
        'mutation',
        variables,
      )
    },
    adminDeleteProject(
      variables: AdminDeleteProjectMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteProjectMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteProjectMutation>(AdminDeleteProjectDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteProject',
        'mutation',
        variables,
      )
    },
    userFindManyRating(
      variables: UserFindManyRatingQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindManyRatingQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindManyRatingQuery>(UserFindManyRatingDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindManyRating',
        'query',
        variables,
      )
    },
    userCreateRating(
      variables: UserCreateRatingMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserCreateRatingMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserCreateRatingMutation>(UserCreateRatingDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userCreateRating',
        'mutation',
        variables,
      )
    },
    userUpdateRating(
      variables: UserUpdateRatingMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserUpdateRatingMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserUpdateRatingMutation>(UserUpdateRatingDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userUpdateRating',
        'mutation',
        variables,
      )
    },
    userDeleteRating(
      variables: UserDeleteRatingMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserDeleteRatingMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserDeleteRatingMutation>(UserDeleteRatingDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userDeleteRating',
        'mutation',
        variables,
      )
    },
    adminFindManyRating(
      variables: AdminFindManyRatingQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindManyRatingQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyRatingQuery>(AdminFindManyRatingDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyRating',
        'query',
        variables,
      )
    },
    adminUpdateRating(
      variables: AdminUpdateRatingMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminUpdateRatingMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminUpdateRatingMutation>(AdminUpdateRatingDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminUpdateRating',
        'mutation',
        variables,
      )
    },
    adminDeleteRating(
      variables: AdminDeleteRatingMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteRatingMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteRatingMutation>(AdminDeleteRatingDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteRating',
        'mutation',
        variables,
      )
    },
    userFindManyReview(
      variables: UserFindManyReviewQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindManyReviewQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindManyReviewQuery>(UserFindManyReviewDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindManyReview',
        'query',
        variables,
      )
    },
    userFindUserProjectReview(
      variables: UserFindUserProjectReviewQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindUserProjectReviewQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindUserProjectReviewQuery>(UserFindUserProjectReviewDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindUserProjectReview',
        'query',
        variables,
      )
    },
    userFindOneReview(
      variables: UserFindOneReviewQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindOneReviewQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindOneReviewQuery>(UserFindOneReviewDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindOneReview',
        'query',
        variables,
      )
    },
    userCreateReview(
      variables: UserCreateReviewMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserCreateReviewMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserCreateReviewMutation>(UserCreateReviewDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userCreateReview',
        'mutation',
        variables,
      )
    },
    userDeleteReview(
      variables: UserDeleteReviewMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserDeleteReviewMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserDeleteReviewMutation>(UserDeleteReviewDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userDeleteReview',
        'mutation',
        variables,
      )
    },
    adminFindManyReview(
      variables: AdminFindManyReviewQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindManyReviewQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyReviewQuery>(AdminFindManyReviewDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyReview',
        'query',
        variables,
      )
    },
    adminFindOneReview(
      variables: AdminFindOneReviewQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindOneReviewQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindOneReviewQuery>(AdminFindOneReviewDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindOneReview',
        'query',
        variables,
      )
    },
    adminDeleteReview(
      variables: AdminDeleteReviewMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteReviewMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteReviewMutation>(AdminDeleteReviewDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteReview',
        'mutation',
        variables,
      )
    },
    userGetTeamMembers(
      variables: UserGetTeamMembersQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserGetTeamMembersQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserGetTeamMembersQuery>(UserGetTeamMembersDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userGetTeamMembers',
        'query',
        variables,
      )
    },
    userGetTeamMember(
      variables: UserGetTeamMemberQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserGetTeamMemberQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserGetTeamMemberQuery>(UserGetTeamMemberDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userGetTeamMember',
        'query',
        variables,
      )
    },
    userFindManyTeam(
      variables: UserFindManyTeamQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindManyTeamQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindManyTeamQuery>(UserFindManyTeamDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindManyTeam',
        'query',
        variables,
      )
    },
    userFindOneTeam(
      variables: UserFindOneTeamQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindOneTeamQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindOneTeamQuery>(UserFindOneTeamDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindOneTeam',
        'query',
        variables,
      )
    },
    userCreateTeam(
      variables: UserCreateTeamMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserCreateTeamMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserCreateTeamMutation>(UserCreateTeamDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userCreateTeam',
        'mutation',
        variables,
      )
    },
    userUpdateTeam(
      variables: UserUpdateTeamMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserUpdateTeamMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserUpdateTeamMutation>(UserUpdateTeamDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userUpdateTeam',
        'mutation',
        variables,
      )
    },
    userDeleteTeam(
      variables: UserDeleteTeamMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserDeleteTeamMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserDeleteTeamMutation>(UserDeleteTeamDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userDeleteTeam',
        'mutation',
        variables,
      )
    },
    adminFindManyTeam(
      variables: AdminFindManyTeamQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindManyTeamQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyTeamQuery>(AdminFindManyTeamDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyTeam',
        'query',
        variables,
      )
    },
    adminGetTeamMembers(
      variables: AdminGetTeamMembersQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminGetTeamMembersQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminGetTeamMembersQuery>(AdminGetTeamMembersDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminGetTeamMembers',
        'query',
        variables,
      )
    },
    adminFindOneTeam(
      variables: AdminFindOneTeamQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindOneTeamQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindOneTeamQuery>(AdminFindOneTeamDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindOneTeam',
        'query',
        variables,
      )
    },
    adminUpdateTeam(
      variables: AdminUpdateTeamMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminUpdateTeamMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminUpdateTeamMutation>(AdminUpdateTeamDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminUpdateTeam',
        'mutation',
        variables,
      )
    },
    adminDeleteTeam(
      variables: AdminDeleteTeamMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteTeamMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteTeamMutation>(AdminDeleteTeamDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteTeam',
        'mutation',
        variables,
      )
    },
    adminAddTeamMember(
      variables: AdminAddTeamMemberMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminAddTeamMemberMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminAddTeamMemberMutation>(AdminAddTeamMemberDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminAddTeamMember',
        'mutation',
        variables,
      )
    },
    adminRemoveTeamMember(
      variables: AdminRemoveTeamMemberMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminRemoveTeamMemberMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminRemoveTeamMemberMutation>(AdminRemoveTeamMemberDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminRemoveTeamMember',
        'mutation',
        variables,
      )
    },
    adminToggleTeamAdmin(
      variables: AdminToggleTeamAdminMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminToggleTeamAdminMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminToggleTeamAdminMutation>(AdminToggleTeamAdminDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminToggleTeamAdmin',
        'mutation',
        variables,
      )
    },
    userAddTeamMember(
      variables: UserAddTeamMemberMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserAddTeamMemberMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserAddTeamMemberMutation>(UserAddTeamMemberDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userAddTeamMember',
        'mutation',
        variables,
      )
    },
    userRemoveTeamMember(
      variables: UserRemoveTeamMemberMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserRemoveTeamMemberMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserRemoveTeamMemberMutation>(UserRemoveTeamMemberDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userRemoveTeamMember',
        'mutation',
        variables,
      )
    },
    userToggleTeamAdmin(
      variables: UserToggleTeamAdminMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserToggleTeamAdminMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserToggleTeamAdminMutation>(UserToggleTeamAdminDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userToggleTeamAdmin',
        'mutation',
        variables,
      )
    },
    adminCreateUser(
      variables: AdminCreateUserMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminCreateUserMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateUserMutation>(AdminCreateUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateUser',
        'mutation',
        variables,
      )
    },
    adminDeleteUser(
      variables: AdminDeleteUserMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteUserMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteUserMutation>(AdminDeleteUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteUser',
        'mutation',
        variables,
      )
    },
    adminFindManyUser(
      variables: AdminFindManyUserQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindManyUserQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyUserQuery>(AdminFindManyUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyUser',
        'query',
        variables,
      )
    },
    adminFindOneUser(
      variables: AdminFindOneUserQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindOneUserQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindOneUserQuery>(AdminFindOneUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindOneUser',
        'query',
        variables,
      )
    },
    adminUpdateUser(
      variables: AdminUpdateUserMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminUpdateUserMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminUpdateUserMutation>(AdminUpdateUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminUpdateUser',
        'mutation',
        variables,
      )
    },
    userFindManyUser(
      variables: UserFindManyUserQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindManyUserQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindManyUserQuery>(UserFindManyUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindManyUser',
        'query',
        variables,
      )
    },
    userFindOneUser(
      variables: UserFindOneUserQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindOneUserQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindOneUserQuery>(UserFindOneUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindOneUser',
        'query',
        variables,
      )
    },
    userUpdateUser(
      variables: UserUpdateUserMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserUpdateUserMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserUpdateUserMutation>(UserUpdateUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userUpdateUser',
        'mutation',
        variables,
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>

type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K], any, T[K]>
}>

type definedNonNullAny = {}

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny => v !== undefined && v !== null

export const definedNonNullAnySchema = z.any().refine((v) => isDefinedNonNullAny(v))

export const CommentCategorySchema = z.nativeEnum(CommentCategory)

export const IdentityProviderSchema = z.nativeEnum(IdentityProvider)

export const UserRoleSchema = z.nativeEnum(UserRole)

export const UserStatusSchema = z.nativeEnum(UserStatus)

export function AdminCreateIdentityInputSchema(): z.ZodObject<Properties<AdminCreateIdentityInput>> {
  return z.object({
    ownerId: z.string(),
    provider: IdentityProviderSchema,
    providerId: z.string(),
  })
}

export function AdminCreateUserInputSchema(): z.ZodObject<Properties<AdminCreateUserInput>> {
  return z.object({
    password: z.string().nullish(),
    username: z.string(),
  })
}

export function AdminFindManyCommentInputSchema(): z.ZodObject<Properties<AdminFindManyCommentInput>> {
  return z.object({
    reviewId: z.string(),
    search: z.string().nullish(),
  })
}

export function AdminFindManyIdentityInputSchema(): z.ZodObject<Properties<AdminFindManyIdentityInput>> {
  return z.object({
    ownerId: z.string().nullish(),
    provider: IdentityProviderSchema.nullish(),
  })
}

export function AdminFindManyProjectInputSchema(): z.ZodObject<Properties<AdminFindManyProjectInput>> {
  return z.object({
    limit: z.number().nullish(),
    page: z.number().nullish(),
    search: z.string().nullish(),
    teamId: z.string().nullish(),
  })
}

export function AdminFindManyRatingInputSchema(): z.ZodObject<Properties<AdminFindManyRatingInput>> {
  return z.object({
    commentId: z.string().nullish(),
    search: z.string().nullish(),
  })
}

export function AdminFindManyReviewInputSchema(): z.ZodObject<Properties<AdminFindManyReviewInput>> {
  return z.object({
    limit: z.number().nullish(),
    page: z.number().nullish(),
    projectId: z.string(),
    search: z.string().nullish(),
  })
}

export function AdminFindManyTeamInputSchema(): z.ZodObject<Properties<AdminFindManyTeamInput>> {
  return z.object({
    limit: z.number().nullish(),
    page: z.number().nullish(),
    search: z.string().nullish(),
  })
}

export function AdminFindManyUserInputSchema(): z.ZodObject<Properties<AdminFindManyUserInput>> {
  return z.object({
    limit: z.number().nullish(),
    page: z.number().nullish(),
    role: UserRoleSchema.nullish(),
    search: z.string().nullish(),
    status: UserStatusSchema.nullish(),
  })
}

export function AdminUpdateCommentInputSchema(): z.ZodObject<Properties<AdminUpdateCommentInput>> {
  return z.object({
    content: z.string().nullish(),
  })
}

export function AdminUpdateDiscordServerInputSchema(): z.ZodObject<Properties<AdminUpdateDiscordServerInput>> {
  return z.object({
    createChannels: z.boolean().nullish(),
    logChannelId: z.string().nullish(),
    projectCategoryId: z.string().nullish(),
    teamCategoryId: z.string().nullish(),
  })
}

export function AdminUpdateProjectInputSchema(): z.ZodObject<Properties<AdminUpdateProjectInput>> {
  return z.object({
    avatarUrl: z.string().nullish(),
    duration: z.number().nullish(),
    name: z.string().nullish(),
    startDate: definedNonNullAnySchema.nullish(),
    teamId: z.string().nullish(),
  })
}

export function AdminUpdateRatingInputSchema(): z.ZodObject<Properties<AdminUpdateRatingInput>> {
  return z.object({
    content: z.string().nullish(),
    rating: z.number(),
  })
}

export function AdminUpdateTeamInputSchema(): z.ZodObject<Properties<AdminUpdateTeamInput>> {
  return z.object({
    avatarUrl: z.string().nullish(),
    homeServerId: z.string().nullish(),
    name: z.string().nullish(),
  })
}

export function AdminUpdateUserInputSchema(): z.ZodObject<Properties<AdminUpdateUserInput>> {
  return z.object({
    avatarUrl: z.string().nullish(),
    developer: z.boolean().nullish(),
    name: z.string().nullish(),
    role: UserRoleSchema.nullish(),
    status: UserStatusSchema.nullish(),
    username: z.string().nullish(),
  })
}

export function LinkIdentityInputSchema(): z.ZodObject<Properties<LinkIdentityInput>> {
  return z.object({
    provider: IdentityProviderSchema,
    providerId: z.string(),
  })
}

export function LoginInputSchema(): z.ZodObject<Properties<LoginInput>> {
  return z.object({
    password: z.string(),
    username: z.string(),
  })
}

export function RegisterInputSchema(): z.ZodObject<Properties<RegisterInput>> {
  return z.object({
    password: z.string(),
    username: z.string(),
  })
}

export function RequestIdentityChallengeInputSchema(): z.ZodObject<Properties<RequestIdentityChallengeInput>> {
  return z.object({
    provider: IdentityProviderSchema,
    providerId: z.string(),
  })
}

export function UserCreateCommentInputSchema(): z.ZodObject<Properties<UserCreateCommentInput>> {
  return z.object({
    content: z.string(),
    parentId: z.string().nullish(),
    reviewId: z.string(),
  })
}

export function UserCreateProjectInputSchema(): z.ZodObject<Properties<UserCreateProjectInput>> {
  return z.object({
    duration: z.number().nullish(),
    name: z.string(),
    startDate: definedNonNullAnySchema.nullish(),
    teamId: z.string(),
  })
}

export function UserCreateRatingInputSchema(): z.ZodObject<Properties<UserCreateRatingInput>> {
  return z.object({
    commentId: z.string(),
    content: z.string().nullish(),
    rating: z.number(),
  })
}

export function UserCreateTeamInputSchema(): z.ZodObject<Properties<UserCreateTeamInput>> {
  return z.object({
    name: z.string(),
  })
}

export function UserFindManyCommentInputSchema(): z.ZodObject<Properties<UserFindManyCommentInput>> {
  return z.object({
    reviewId: z.string(),
    search: z.string().nullish(),
  })
}

export function UserFindManyIdentityInputSchema(): z.ZodObject<Properties<UserFindManyIdentityInput>> {
  return z.object({
    username: z.string(),
  })
}

export function UserFindManyProjectInputSchema(): z.ZodObject<Properties<UserFindManyProjectInput>> {
  return z.object({
    limit: z.number().nullish(),
    page: z.number().nullish(),
    search: z.string().nullish(),
    teamId: z.string().nullish(),
  })
}

export function UserFindManyRatingInputSchema(): z.ZodObject<Properties<UserFindManyRatingInput>> {
  return z.object({
    search: z.string().nullish(),
  })
}

export function UserFindManyReviewInputSchema(): z.ZodObject<Properties<UserFindManyReviewInput>> {
  return z.object({
    projectId: z.string(),
    search: z.string().nullish(),
  })
}

export function UserFindManyTeamInputSchema(): z.ZodObject<Properties<UserFindManyTeamInput>> {
  return z.object({
    limit: z.number().nullish(),
    page: z.number().nullish(),
    search: z.string().nullish(),
  })
}

export function UserFindManyUserInputSchema(): z.ZodObject<Properties<UserFindManyUserInput>> {
  return z.object({
    limit: z.number().nullish(),
    page: z.number().nullish(),
    search: z.string().nullish(),
  })
}

export function UserUpdateCommentInputSchema(): z.ZodObject<Properties<UserUpdateCommentInput>> {
  return z.object({
    content: z.string().nullish(),
  })
}

export function UserUpdateProjectInputSchema(): z.ZodObject<Properties<UserUpdateProjectInput>> {
  return z.object({
    avatarUrl: z.string().nullish(),
    duration: z.number().nullish(),
    name: z.string().nullish(),
    startDate: definedNonNullAnySchema.nullish(),
  })
}

export function UserUpdateRatingInputSchema(): z.ZodObject<Properties<UserUpdateRatingInput>> {
  return z.object({
    content: z.string().nullish(),
    rating: z.number().nullish(),
  })
}

export function UserUpdateTeamInputSchema(): z.ZodObject<Properties<UserUpdateTeamInput>> {
  return z.object({
    avatarUrl: z.string().nullish(),
    homeServerId: z.string().nullish(),
    name: z.string().nullish(),
  })
}

export function UserUpdateUserInputSchema(): z.ZodObject<Properties<UserUpdateUserInput>> {
  return z.object({
    developer: z.boolean().nullish(),
  })
}

export function VerifyIdentityChallengeInputSchema(): z.ZodObject<Properties<VerifyIdentityChallengeInput>> {
  return z.object({
    challenge: z.string(),
    provider: IdentityProviderSchema,
    providerId: z.string(),
    signature: z.string(),
    useLedger: z.boolean().nullish(),
  })
}
