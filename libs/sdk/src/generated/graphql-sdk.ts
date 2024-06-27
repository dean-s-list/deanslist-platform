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

export type AdminFindManyCommunityInput = {
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type AdminFindManyIdentityInput = {
  ownerId?: InputMaybe<Scalars['String']['input']>
  provider?: InputMaybe<IdentityProvider>
}

export type AdminFindManyProjectInput = {
  communityId?: InputMaybe<Scalars['String']['input']>
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
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

export type AdminUpdateCommunityInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>
  homeServerId?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
}

export type AdminUpdateDiscordServerInput = {
  communityCategoryId?: InputMaybe<Scalars['String']['input']>
  createChannels?: InputMaybe<Scalars['Boolean']['input']>
  logChannelId?: InputMaybe<Scalars['String']['input']>
  projectCategoryId?: InputMaybe<Scalars['String']['input']>
}

export type AdminUpdateProjectInput = {
  amountManagerUsd?: InputMaybe<Scalars['Int']['input']>
  amountReferralUsd?: InputMaybe<Scalars['Int']['input']>
  amountTotalUsd?: InputMaybe<Scalars['Int']['input']>
  avatarUrl?: InputMaybe<Scalars['String']['input']>
  communityId?: InputMaybe<Scalars['String']['input']>
  duration?: InputMaybe<Scalars['Int']['input']>
  instructions?: InputMaybe<Scalars['String']['input']>
  linkDiscord?: InputMaybe<Scalars['String']['input']>
  linkGithub?: InputMaybe<Scalars['String']['input']>
  linkTelegram?: InputMaybe<Scalars['String']['input']>
  linkTwitter?: InputMaybe<Scalars['String']['input']>
  linkWebsite?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  startDate?: InputMaybe<Scalars['DateTime']['input']>
  status?: InputMaybe<ProjectStatus>
  tags?: InputMaybe<Array<Scalars['String']['input']>>
}

export type AdminUpdateRatingInput = {
  content?: InputMaybe<Scalars['String']['input']>
  rating: Scalars['Float']['input']
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

export type Community = {
  __typename?: 'Community'
  activeProjectsCount?: Maybe<Scalars['Int']['output']>
  avatarUrl?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  homeServerId?: Maybe<Scalars['String']['output']>
  id: Scalars['String']['output']
  manageUrl: Scalars['String']['output']
  memberCount?: Maybe<Scalars['Int']['output']>
  members?: Maybe<Array<CommunityMember>>
  name: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  viewUrl: Scalars['String']['output']
}

export type CommunityMember = {
  __typename?: 'CommunityMember'
  admin?: Maybe<Scalars['Boolean']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  id: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  user?: Maybe<User>
  userId: Scalars['String']['output']
}

export type CommunityPaging = {
  __typename?: 'CommunityPaging'
  data: Array<Community>
  meta: PagingMeta
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
  communityCategoryId?: Maybe<Scalars['String']['output']>
  createChannels?: Maybe<Scalars['Boolean']['output']>
  id: Scalars['String']['output']
  logChannelId?: Maybe<Scalars['String']['output']>
  name: Scalars['String']['output']
  permissions?: Maybe<Array<Scalars['String']['output']>>
  projectCategoryId?: Maybe<Scalars['String']['output']>
}

export type Identity = {
  __typename?: 'Identity'
  challenges?: Maybe<Array<IdentityChallenge>>
  createdAt: Scalars['DateTime']['output']
  expired?: Maybe<Scalars['Boolean']['output']>
  id: Scalars['String']['output']
  name?: Maybe<Scalars['String']['output']>
  owner?: Maybe<User>
  primary?: Maybe<Scalars['Boolean']['output']>
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

export type ManagerCreateCommunityInput = {
  name: Scalars['String']['input']
}

export type ManagerCreateProjectInput = {
  communityId: Scalars['String']['input']
  duration?: InputMaybe<Scalars['Int']['input']>
  name: Scalars['String']['input']
  startDate?: InputMaybe<Scalars['DateTime']['input']>
}

export type ManagerFindManyCommunityInput = {
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type ManagerFindManyProjectInput = {
  communityId?: InputMaybe<Scalars['String']['input']>
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type ManagerUpdateCommunityInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>
  homeServerId?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
}

export type ManagerUpdateProjectInput = {
  amountManagerUsd?: InputMaybe<Scalars['Int']['input']>
  amountReferralUsd?: InputMaybe<Scalars['Int']['input']>
  amountTotalUsd?: InputMaybe<Scalars['Int']['input']>
  avatarUrl?: InputMaybe<Scalars['String']['input']>
  duration?: InputMaybe<Scalars['Int']['input']>
  instructions?: InputMaybe<Scalars['String']['input']>
  linkDiscord?: InputMaybe<Scalars['String']['input']>
  linkGithub?: InputMaybe<Scalars['String']['input']>
  linkTelegram?: InputMaybe<Scalars['String']['input']>
  linkTwitter?: InputMaybe<Scalars['String']['input']>
  linkWebsite?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  referralId?: InputMaybe<Scalars['String']['input']>
  startDate?: InputMaybe<Scalars['DateTime']['input']>
  status?: InputMaybe<ProjectStatus>
  tags?: InputMaybe<Array<Scalars['String']['input']>>
}

export type Mutation = {
  __typename?: 'Mutation'
  adminAddCommunityMember?: Maybe<Scalars['Boolean']['output']>
  adminAddProjectManager?: Maybe<Scalars['Boolean']['output']>
  adminAddProjectMember?: Maybe<Scalars['Boolean']['output']>
  adminAddProjectReferral?: Maybe<Scalars['Boolean']['output']>
  adminCreateCommunityChannel: Scalars['Boolean']['output']
  adminCreateIdentity?: Maybe<Identity>
  adminCreateProjectChannel: Scalars['Boolean']['output']
  adminCreateUser?: Maybe<User>
  adminDeleteComment?: Maybe<Scalars['Boolean']['output']>
  adminDeleteCommunity?: Maybe<Scalars['Boolean']['output']>
  adminDeleteCommunityChannel: Scalars['Boolean']['output']
  adminDeleteIdentity?: Maybe<Scalars['Boolean']['output']>
  adminDeleteProject?: Maybe<Scalars['Boolean']['output']>
  adminDeleteProjectChannel: Scalars['Boolean']['output']
  adminDeleteRating?: Maybe<Scalars['Boolean']['output']>
  adminDeleteReview?: Maybe<Scalars['Boolean']['output']>
  adminDeleteUser?: Maybe<Scalars['Boolean']['output']>
  adminLeaveDiscordServer: Scalars['Boolean']['output']
  adminPingDiscordChannel: Scalars['Boolean']['output']
  adminRemoveCommunityMember?: Maybe<Scalars['Boolean']['output']>
  adminRemoveProjectManager?: Maybe<Scalars['Boolean']['output']>
  adminRemoveProjectMember?: Maybe<Scalars['Boolean']['output']>
  adminRemoveProjectReferral?: Maybe<Scalars['Boolean']['output']>
  adminToggleCommunityAdmin?: Maybe<Scalars['Boolean']['output']>
  adminUpdateComment?: Maybe<Comment>
  adminUpdateCommunity?: Maybe<Community>
  adminUpdateDiscordServer: Scalars['Boolean']['output']
  adminUpdateProject?: Maybe<Project>
  adminUpdateRating?: Maybe<Rating>
  adminUpdateUser?: Maybe<User>
  anonVerifyIdentityChallenge?: Maybe<IdentityChallenge>
  login?: Maybe<User>
  logout?: Maybe<Scalars['Boolean']['output']>
  managerAddCommunityMember?: Maybe<Scalars['Boolean']['output']>
  managerAddProjectManager?: Maybe<Scalars['Boolean']['output']>
  managerAddProjectMember?: Maybe<Scalars['Boolean']['output']>
  managerAddProjectReferral?: Maybe<Scalars['Boolean']['output']>
  managerCreateCommunity?: Maybe<Community>
  managerCreateProject?: Maybe<Project>
  managerDeleteCommunity?: Maybe<Scalars['Boolean']['output']>
  managerDeleteProject?: Maybe<Scalars['Boolean']['output']>
  managerRemoveCommunityMember?: Maybe<Scalars['Boolean']['output']>
  managerRemoveProjectManager?: Maybe<Scalars['Boolean']['output']>
  managerRemoveProjectMember?: Maybe<Scalars['Boolean']['output']>
  managerRemoveProjectReferral?: Maybe<Scalars['Boolean']['output']>
  managerToggleCommunityAdmin?: Maybe<Scalars['Boolean']['output']>
  managerUpdateCommunity?: Maybe<Community>
  managerUpdateProject?: Maybe<Project>
  register?: Maybe<User>
  reviewerCreateReview?: Maybe<Review>
  reviewerDeleteReview?: Maybe<Scalars['Boolean']['output']>
  userCreateComment?: Maybe<Comment>
  userCreateRating?: Maybe<Rating>
  userDeleteComment?: Maybe<Scalars['Boolean']['output']>
  userDeleteIdentity?: Maybe<Scalars['Boolean']['output']>
  userDeleteRating?: Maybe<Scalars['Boolean']['output']>
  userLinkIdentity?: Maybe<Identity>
  userSetPrimaryIdentity?: Maybe<Identity>
  userUpdateComment?: Maybe<Comment>
  userUpdateRating?: Maybe<Rating>
  userUpdateUser?: Maybe<User>
  userVerifyIdentityChallenge?: Maybe<IdentityChallenge>
}

export type MutationAdminAddCommunityMemberArgs = {
  communityId: Scalars['String']['input']
  userId: Scalars['String']['input']
}

export type MutationAdminAddProjectManagerArgs = {
  managerUserId: Scalars['String']['input']
  projectId: Scalars['String']['input']
}

export type MutationAdminAddProjectMemberArgs = {
  memberUserId: Scalars['String']['input']
  projectId: Scalars['String']['input']
}

export type MutationAdminAddProjectReferralArgs = {
  projectId: Scalars['String']['input']
  referralUserId: Scalars['String']['input']
}

export type MutationAdminCreateCommunityChannelArgs = {
  channelId: Scalars['String']['input']
  communityId: Scalars['String']['input']
  serverId: Scalars['String']['input']
}

export type MutationAdminCreateIdentityArgs = {
  input: AdminCreateIdentityInput
}

export type MutationAdminCreateProjectChannelArgs = {
  channelId: Scalars['String']['input']
  projectId: Scalars['String']['input']
  serverId: Scalars['String']['input']
}

export type MutationAdminCreateUserArgs = {
  input: AdminCreateUserInput
}

export type MutationAdminDeleteCommentArgs = {
  commentId: Scalars['String']['input']
}

export type MutationAdminDeleteCommunityArgs = {
  communityId: Scalars['String']['input']
}

export type MutationAdminDeleteCommunityChannelArgs = {
  channelId: Scalars['String']['input']
  communityId: Scalars['String']['input']
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

export type MutationAdminRemoveCommunityMemberArgs = {
  communityId: Scalars['String']['input']
  userId: Scalars['String']['input']
}

export type MutationAdminRemoveProjectManagerArgs = {
  managerUserId: Scalars['String']['input']
  projectId: Scalars['String']['input']
}

export type MutationAdminRemoveProjectMemberArgs = {
  memberUserId: Scalars['String']['input']
  projectId: Scalars['String']['input']
}

export type MutationAdminRemoveProjectReferralArgs = {
  projectId: Scalars['String']['input']
  referralUserId: Scalars['String']['input']
}

export type MutationAdminToggleCommunityAdminArgs = {
  communityId: Scalars['String']['input']
  userId: Scalars['String']['input']
}

export type MutationAdminUpdateCommentArgs = {
  commentId: Scalars['String']['input']
  input: AdminUpdateCommentInput
}

export type MutationAdminUpdateCommunityArgs = {
  communityId: Scalars['String']['input']
  input: AdminUpdateCommunityInput
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

export type MutationManagerAddCommunityMemberArgs = {
  communityId: Scalars['String']['input']
  userId: Scalars['String']['input']
}

export type MutationManagerAddProjectManagerArgs = {
  managerUserId: Scalars['String']['input']
  projectId: Scalars['String']['input']
}

export type MutationManagerAddProjectMemberArgs = {
  memberUserId: Scalars['String']['input']
  projectId: Scalars['String']['input']
}

export type MutationManagerAddProjectReferralArgs = {
  projectId: Scalars['String']['input']
  referralUserId: Scalars['String']['input']
}

export type MutationManagerCreateCommunityArgs = {
  input: ManagerCreateCommunityInput
}

export type MutationManagerCreateProjectArgs = {
  input: ManagerCreateProjectInput
}

export type MutationManagerDeleteCommunityArgs = {
  communityId: Scalars['String']['input']
}

export type MutationManagerDeleteProjectArgs = {
  projectId: Scalars['String']['input']
}

export type MutationManagerRemoveCommunityMemberArgs = {
  communityId: Scalars['String']['input']
  userId: Scalars['String']['input']
}

export type MutationManagerRemoveProjectManagerArgs = {
  managerUserId: Scalars['String']['input']
  projectId: Scalars['String']['input']
}

export type MutationManagerRemoveProjectMemberArgs = {
  memberUserId: Scalars['String']['input']
  projectId: Scalars['String']['input']
}

export type MutationManagerRemoveProjectReferralArgs = {
  projectId: Scalars['String']['input']
  referralUserId: Scalars['String']['input']
}

export type MutationManagerToggleCommunityAdminArgs = {
  communityId: Scalars['String']['input']
  userId: Scalars['String']['input']
}

export type MutationManagerUpdateCommunityArgs = {
  communityId: Scalars['String']['input']
  input: ManagerUpdateCommunityInput
}

export type MutationManagerUpdateProjectArgs = {
  input: ManagerUpdateProjectInput
  projectId: Scalars['String']['input']
}

export type MutationRegisterArgs = {
  input: RegisterInput
}

export type MutationReviewerCreateReviewArgs = {
  projectId: Scalars['String']['input']
}

export type MutationReviewerDeleteReviewArgs = {
  reviewId: Scalars['String']['input']
}

export type MutationUserCreateCommentArgs = {
  input: UserCreateCommentInput
}

export type MutationUserCreateRatingArgs = {
  input: UserCreateRatingInput
}

export type MutationUserDeleteCommentArgs = {
  commentId: Scalars['String']['input']
}

export type MutationUserDeleteIdentityArgs = {
  identityId: Scalars['String']['input']
}

export type MutationUserDeleteRatingArgs = {
  ratingId: Scalars['String']['input']
}

export type MutationUserLinkIdentityArgs = {
  input: LinkIdentityInput
}

export type MutationUserSetPrimaryIdentityArgs = {
  identityId: Scalars['String']['input']
}

export type MutationUserUpdateCommentArgs = {
  commentId: Scalars['String']['input']
  input: UserUpdateCommentInput
}

export type MutationUserUpdateRatingArgs = {
  input: UserUpdateRatingInput
  ratingId: Scalars['String']['input']
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
  amountManagerUsd?: Maybe<Scalars['Int']['output']>
  amountReferralUsd?: Maybe<Scalars['Int']['output']>
  amountTotalUsd?: Maybe<Scalars['Int']['output']>
  avatarUrl?: Maybe<Scalars['String']['output']>
  community?: Maybe<Community>
  communityId: Scalars['String']['output']
  createdAt?: Maybe<Scalars['DateTime']['output']>
  duration?: Maybe<Scalars['Int']['output']>
  endDate?: Maybe<Scalars['DateTime']['output']>
  id: Scalars['String']['output']
  instructions?: Maybe<Scalars['String']['output']>
  linkDiscord?: Maybe<Scalars['String']['output']>
  linkGithub?: Maybe<Scalars['String']['output']>
  linkTelegram?: Maybe<Scalars['String']['output']>
  linkTwitter?: Maybe<Scalars['String']['output']>
  linkWebsite?: Maybe<Scalars['String']['output']>
  manageUrl: Scalars['String']['output']
  managers?: Maybe<Array<User>>
  members?: Maybe<Array<User>>
  name: Scalars['String']['output']
  referral?: Maybe<User>
  reviewCount?: Maybe<Scalars['Int']['output']>
  slug: Scalars['String']['output']
  startDate?: Maybe<Scalars['DateTime']['output']>
  status?: Maybe<ProjectStatus>
  tags?: Maybe<Array<Scalars['String']['output']>>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  viewUrl: Scalars['String']['output']
}

export type ProjectPaging = {
  __typename?: 'ProjectPaging'
  data: Array<Project>
  meta: PagingMeta
}

export enum ProjectStatus {
  Active = 'Active',
  Draft = 'Draft',
  Inactive = 'Inactive',
}

export type Query = {
  __typename?: 'Query'
  adminFindManyComment?: Maybe<Array<Comment>>
  adminFindManyCommunity: CommunityPaging
  adminFindManyIdentity?: Maybe<Array<Identity>>
  adminFindManyProject: ProjectPaging
  adminFindManyRating: Array<Rating>
  adminFindManyReview: ReviewPaging
  adminFindManyUser: UserPaging
  adminFindOneCommunity?: Maybe<Community>
  adminFindOneProject?: Maybe<Project>
  adminFindOneReview?: Maybe<Review>
  adminFindOneUser?: Maybe<User>
  adminGetCommunityChannels: Array<DiscordChannel>
  adminGetCommunityMembers?: Maybe<Array<CommunityMember>>
  adminGetDiscordBot: DiscordBot
  adminGetDiscordChannels: Array<DiscordChannel>
  adminGetDiscordRoles: Array<DiscordRole>
  adminGetDiscordServers: Array<DiscordServer>
  adminGetProjectChannels: Array<DiscordChannel>
  anonRequestIdentityChallenge?: Maybe<IdentityChallenge>
  appConfig: AppConfig
  managerFindManyCommunity: CommunityPaging
  managerFindManyProject: ProjectPaging
  managerFindOneCommunity?: Maybe<Community>
  managerFindOneProject?: Maybe<Project>
  managerGetCommunityMember?: Maybe<CommunityMember>
  managerGetCommunityMembers?: Maybe<Array<CommunityMember>>
  me?: Maybe<User>
  reviewerFindManyProject: ProjectPaging
  reviewerFindManyReviewByProject?: Maybe<Array<Review>>
  reviewerFindManyReviewByUsername?: Maybe<Array<Review>>
  reviewerFindOneProject?: Maybe<Project>
  reviewerFindOneReview?: Maybe<Review>
  reviewerFindUserProjectReview?: Maybe<Review>
  uptime: Scalars['Float']['output']
  userFindManyComment?: Maybe<Array<Comment>>
  userFindManyCommunity: CommunityPaging
  userFindManyIdentity?: Maybe<Array<Identity>>
  userFindManyRating: Array<Rating>
  userFindManyUser: UserPaging
  userFindOneCommunity?: Maybe<Community>
  userFindOneUser?: Maybe<User>
  userGetCommunityChannels: Array<DiscordChannel>
  userGetDiscordServers: Array<DiscordServer>
  userGetProjectChannels: Array<DiscordChannel>
  userRequestIdentityChallenge?: Maybe<IdentityChallenge>
}

export type QueryAdminFindManyCommentArgs = {
  input: AdminFindManyCommentInput
}

export type QueryAdminFindManyCommunityArgs = {
  input: AdminFindManyCommunityInput
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

export type QueryAdminFindManyUserArgs = {
  input: AdminFindManyUserInput
}

export type QueryAdminFindOneCommunityArgs = {
  communityId: Scalars['String']['input']
}

export type QueryAdminFindOneProjectArgs = {
  projectId: Scalars['String']['input']
}

export type QueryAdminFindOneReviewArgs = {
  reviewId: Scalars['String']['input']
}

export type QueryAdminFindOneUserArgs = {
  userId: Scalars['String']['input']
}

export type QueryAdminGetCommunityChannelsArgs = {
  communityId: Scalars['String']['input']
}

export type QueryAdminGetCommunityMembersArgs = {
  communityId: Scalars['String']['input']
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

export type QueryAnonRequestIdentityChallengeArgs = {
  input: RequestIdentityChallengeInput
}

export type QueryManagerFindManyCommunityArgs = {
  input: ManagerFindManyCommunityInput
}

export type QueryManagerFindManyProjectArgs = {
  input: ManagerFindManyProjectInput
}

export type QueryManagerFindOneCommunityArgs = {
  communityId: Scalars['String']['input']
}

export type QueryManagerFindOneProjectArgs = {
  projectId: Scalars['String']['input']
}

export type QueryManagerGetCommunityMemberArgs = {
  communityId: Scalars['String']['input']
}

export type QueryManagerGetCommunityMembersArgs = {
  communityId: Scalars['String']['input']
}

export type QueryReviewerFindManyProjectArgs = {
  input: ReviewerFindManyProjectInput
}

export type QueryReviewerFindManyReviewByProjectArgs = {
  input: ReviewerFindManyReviewByProjectInput
}

export type QueryReviewerFindManyReviewByUsernameArgs = {
  input: ReviewerFindManyReviewByUsernameInput
}

export type QueryReviewerFindOneProjectArgs = {
  projectId: Scalars['String']['input']
}

export type QueryReviewerFindOneReviewArgs = {
  reviewId: Scalars['String']['input']
}

export type QueryReviewerFindUserProjectReviewArgs = {
  projectId: Scalars['String']['input']
}

export type QueryUserFindManyCommentArgs = {
  input: UserFindManyCommentInput
}

export type QueryUserFindManyCommunityArgs = {
  input: UserFindManyCommunityInput
}

export type QueryUserFindManyIdentityArgs = {
  input: UserFindManyIdentityInput
}

export type QueryUserFindManyRatingArgs = {
  input: UserFindManyRatingInput
}

export type QueryUserFindManyUserArgs = {
  input: UserFindManyUserInput
}

export type QueryUserFindOneCommunityArgs = {
  communityId: Scalars['String']['input']
}

export type QueryUserFindOneUserArgs = {
  username: Scalars['String']['input']
}

export type QueryUserGetCommunityChannelsArgs = {
  communityId: Scalars['String']['input']
}

export type QueryUserGetProjectChannelsArgs = {
  projectId: Scalars['String']['input']
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

export type ReviewerFindManyProjectInput = {
  communityId?: InputMaybe<Scalars['String']['input']>
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  status?: InputMaybe<ProjectStatus>
}

export type ReviewerFindManyReviewByProjectInput = {
  projectId: Scalars['String']['input']
  search?: InputMaybe<Scalars['String']['input']>
}

export type ReviewerFindManyReviewByUsernameInput = {
  search?: InputMaybe<Scalars['String']['input']>
  username: Scalars['String']['input']
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
  walletAddress?: Maybe<Scalars['String']['output']>
}

export type UserCreateCommentInput = {
  content: Scalars['String']['input']
  parentId?: InputMaybe<Scalars['String']['input']>
  reviewId: Scalars['String']['input']
}

export type UserCreateRatingInput = {
  commentId: Scalars['String']['input']
  content?: InputMaybe<Scalars['String']['input']>
  rating: Scalars['Float']['input']
}

export type UserFindManyCommentInput = {
  reviewId: Scalars['String']['input']
  search?: InputMaybe<Scalars['String']['input']>
}

export type UserFindManyCommunityInput = {
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type UserFindManyIdentityInput = {
  username: Scalars['String']['input']
}

export type UserFindManyRatingInput = {
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

export type UserUpdateRatingInput = {
  content?: InputMaybe<Scalars['String']['input']>
  rating?: InputMaybe<Scalars['Float']['input']>
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
    walletAddress?: string | null
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
    walletAddress?: string | null
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
    walletAddress?: string | null
    identities?: Array<{
      __typename?: 'Identity'
      createdAt: Date
      expired?: boolean | null
      id: string
      name?: string | null
      primary?: boolean | null
      profile?: any | null
      provider: IdentityProvider
      providerId: string
      updatedAt: Date
      url?: string | null
      verified?: boolean | null
    }> | null
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
    walletAddress?: string | null
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
        walletAddress?: string | null
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
      walletAddress?: string | null
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
      walletAddress?: string | null
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
      walletAddress?: string | null
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
        walletAddress?: string | null
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
      walletAddress?: string | null
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
      walletAddress?: string | null
    } | null
  } | null
}

export type AdminDeleteCommentMutationVariables = Exact<{
  commentId: Scalars['String']['input']
}>

export type AdminDeleteCommentMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type CommunityDetailsFragment = {
  __typename?: 'Community'
  activeProjectsCount?: number | null
  avatarUrl?: string | null
  createdAt?: Date | null
  homeServerId?: string | null
  id: string
  memberCount?: number | null
  name: string
  updatedAt?: Date | null
  viewUrl: string
  manageUrl: string
  members?: Array<{
    __typename?: 'CommunityMember'
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
      walletAddress?: string | null
    } | null
  }> | null
}

export type CommunityMemberDetailsFragment = {
  __typename?: 'CommunityMember'
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
    walletAddress?: string | null
  } | null
}

export type UserFindManyCommunityQueryVariables = Exact<{
  input: UserFindManyCommunityInput
}>

export type UserFindManyCommunityQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'CommunityPaging'
    data: Array<{
      __typename?: 'Community'
      activeProjectsCount?: number | null
      avatarUrl?: string | null
      createdAt?: Date | null
      homeServerId?: string | null
      id: string
      memberCount?: number | null
      name: string
      updatedAt?: Date | null
      viewUrl: string
      manageUrl: string
      members?: Array<{
        __typename?: 'CommunityMember'
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
          walletAddress?: string | null
        } | null
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

export type UserFindOneCommunityQueryVariables = Exact<{
  communityId: Scalars['String']['input']
}>

export type UserFindOneCommunityQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Community'
    activeProjectsCount?: number | null
    avatarUrl?: string | null
    createdAt?: Date | null
    homeServerId?: string | null
    id: string
    memberCount?: number | null
    name: string
    updatedAt?: Date | null
    viewUrl: string
    manageUrl: string
    members?: Array<{
      __typename?: 'CommunityMember'
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
        walletAddress?: string | null
      } | null
    }> | null
  } | null
}

export type ManagerGetCommunityMembersQueryVariables = Exact<{
  communityId: Scalars['String']['input']
}>

export type ManagerGetCommunityMembersQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'CommunityMember'
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
      walletAddress?: string | null
    } | null
  }> | null
}

export type ManagerGetCommunityMemberQueryVariables = Exact<{
  communityId: Scalars['String']['input']
}>

export type ManagerGetCommunityMemberQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'CommunityMember'
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
      walletAddress?: string | null
    } | null
  } | null
}

export type ManagerFindManyCommunityQueryVariables = Exact<{
  input: ManagerFindManyCommunityInput
}>

export type ManagerFindManyCommunityQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'CommunityPaging'
    data: Array<{
      __typename?: 'Community'
      activeProjectsCount?: number | null
      avatarUrl?: string | null
      createdAt?: Date | null
      homeServerId?: string | null
      id: string
      memberCount?: number | null
      name: string
      updatedAt?: Date | null
      viewUrl: string
      manageUrl: string
      members?: Array<{
        __typename?: 'CommunityMember'
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
          walletAddress?: string | null
        } | null
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

export type ManagerFindOneCommunityQueryVariables = Exact<{
  communityId: Scalars['String']['input']
}>

export type ManagerFindOneCommunityQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Community'
    activeProjectsCount?: number | null
    avatarUrl?: string | null
    createdAt?: Date | null
    homeServerId?: string | null
    id: string
    memberCount?: number | null
    name: string
    updatedAt?: Date | null
    viewUrl: string
    manageUrl: string
    members?: Array<{
      __typename?: 'CommunityMember'
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
        walletAddress?: string | null
      } | null
    }> | null
  } | null
}

export type ManagerCreateCommunityMutationVariables = Exact<{
  input: ManagerCreateCommunityInput
}>

export type ManagerCreateCommunityMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Community'
    activeProjectsCount?: number | null
    avatarUrl?: string | null
    createdAt?: Date | null
    homeServerId?: string | null
    id: string
    memberCount?: number | null
    name: string
    updatedAt?: Date | null
    viewUrl: string
    manageUrl: string
    members?: Array<{
      __typename?: 'CommunityMember'
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
        walletAddress?: string | null
      } | null
    }> | null
  } | null
}

export type ManagerUpdateCommunityMutationVariables = Exact<{
  communityId: Scalars['String']['input']
  input: ManagerUpdateCommunityInput
}>

export type ManagerUpdateCommunityMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'Community'
    activeProjectsCount?: number | null
    avatarUrl?: string | null
    createdAt?: Date | null
    homeServerId?: string | null
    id: string
    memberCount?: number | null
    name: string
    updatedAt?: Date | null
    viewUrl: string
    manageUrl: string
    members?: Array<{
      __typename?: 'CommunityMember'
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
        walletAddress?: string | null
      } | null
    }> | null
  } | null
}

export type ManagerDeleteCommunityMutationVariables = Exact<{
  communityId: Scalars['String']['input']
}>

export type ManagerDeleteCommunityMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type AdminFindManyCommunityQueryVariables = Exact<{
  input: AdminFindManyCommunityInput
}>

export type AdminFindManyCommunityQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'CommunityPaging'
    data: Array<{
      __typename?: 'Community'
      activeProjectsCount?: number | null
      avatarUrl?: string | null
      createdAt?: Date | null
      homeServerId?: string | null
      id: string
      memberCount?: number | null
      name: string
      updatedAt?: Date | null
      viewUrl: string
      manageUrl: string
      members?: Array<{
        __typename?: 'CommunityMember'
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
          walletAddress?: string | null
        } | null
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

export type AdminGetCommunityMembersQueryVariables = Exact<{
  communityId: Scalars['String']['input']
}>

export type AdminGetCommunityMembersQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'CommunityMember'
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
      walletAddress?: string | null
    } | null
  }> | null
}

export type AdminFindOneCommunityQueryVariables = Exact<{
  communityId: Scalars['String']['input']
}>

export type AdminFindOneCommunityQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Community'
    activeProjectsCount?: number | null
    avatarUrl?: string | null
    createdAt?: Date | null
    homeServerId?: string | null
    id: string
    memberCount?: number | null
    name: string
    updatedAt?: Date | null
    viewUrl: string
    manageUrl: string
    members?: Array<{
      __typename?: 'CommunityMember'
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
        walletAddress?: string | null
      } | null
    }> | null
  } | null
}

export type AdminUpdateCommunityMutationVariables = Exact<{
  communityId: Scalars['String']['input']
  input: AdminUpdateCommunityInput
}>

export type AdminUpdateCommunityMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'Community'
    activeProjectsCount?: number | null
    avatarUrl?: string | null
    createdAt?: Date | null
    homeServerId?: string | null
    id: string
    memberCount?: number | null
    name: string
    updatedAt?: Date | null
    viewUrl: string
    manageUrl: string
    members?: Array<{
      __typename?: 'CommunityMember'
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
        walletAddress?: string | null
      } | null
    }> | null
  } | null
}

export type AdminDeleteCommunityMutationVariables = Exact<{
  communityId: Scalars['String']['input']
}>

export type AdminDeleteCommunityMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type AdminAddCommunityMemberMutationVariables = Exact<{
  communityId: Scalars['String']['input']
  userId: Scalars['String']['input']
}>

export type AdminAddCommunityMemberMutation = { __typename?: 'Mutation'; added?: boolean | null }

export type AdminRemoveCommunityMemberMutationVariables = Exact<{
  communityId: Scalars['String']['input']
  userId: Scalars['String']['input']
}>

export type AdminRemoveCommunityMemberMutation = { __typename?: 'Mutation'; removed?: boolean | null }

export type AdminToggleCommunityAdminMutationVariables = Exact<{
  communityId: Scalars['String']['input']
  userId: Scalars['String']['input']
}>

export type AdminToggleCommunityAdminMutation = { __typename?: 'Mutation'; toggled?: boolean | null }

export type ManagerAddCommunityMemberMutationVariables = Exact<{
  communityId: Scalars['String']['input']
  userId: Scalars['String']['input']
}>

export type ManagerAddCommunityMemberMutation = { __typename?: 'Mutation'; added?: boolean | null }

export type ManagerRemoveCommunityMemberMutationVariables = Exact<{
  communityId: Scalars['String']['input']
  userId: Scalars['String']['input']
}>

export type ManagerRemoveCommunityMemberMutation = { __typename?: 'Mutation'; removed?: boolean | null }

export type ManagerToggleCommunityAdminMutationVariables = Exact<{
  communityId: Scalars['String']['input']
  userId: Scalars['String']['input']
}>

export type ManagerToggleCommunityAdminMutation = { __typename?: 'Mutation'; toggled?: boolean | null }

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
  communityCategoryId?: string | null
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
    communityCategoryId?: string | null
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

export type AdminGetCommunityChannelsQueryVariables = Exact<{
  communityId: Scalars['String']['input']
}>

export type AdminGetCommunityChannelsQuery = {
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

export type AdminCreateCommunityChannelMutationVariables = Exact<{
  serverId: Scalars['String']['input']
  channelId: Scalars['String']['input']
  communityId: Scalars['String']['input']
}>

export type AdminCreateCommunityChannelMutation = { __typename?: 'Mutation'; created: boolean }

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

export type AdminDeleteCommunityChannelMutationVariables = Exact<{
  channelId: Scalars['String']['input']
  communityId: Scalars['String']['input']
}>

export type AdminDeleteCommunityChannelMutation = { __typename?: 'Mutation'; deleted: boolean }

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
    communityCategoryId?: string | null
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

export type UserGetCommunityChannelsQueryVariables = Exact<{
  communityId: Scalars['String']['input']
}>

export type UserGetCommunityChannelsQuery = {
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
  primary?: boolean | null
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
    primary?: boolean | null
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
      walletAddress?: string | null
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
    primary?: boolean | null
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
    primary?: boolean | null
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
    primary?: boolean | null
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

export type UserSetPrimaryIdentityMutationVariables = Exact<{
  identityId: Scalars['String']['input']
}>

export type UserSetPrimaryIdentityMutation = {
  __typename?: 'Mutation'
  set?: {
    __typename?: 'Identity'
    createdAt: Date
    expired?: boolean | null
    id: string
    name?: string | null
    primary?: boolean | null
    profile?: any | null
    provider: IdentityProvider
    providerId: string
    updatedAt: Date
    url?: string | null
    verified?: boolean | null
  } | null
}

export type ProjectDetailsFragment = {
  __typename?: 'Project'
  amountManagerUsd?: number | null
  amountReferralUsd?: number | null
  amountTotalUsd?: number | null
  avatarUrl?: string | null
  communityId: string
  createdAt?: Date | null
  id: string
  instructions?: string | null
  linkDiscord?: string | null
  linkGithub?: string | null
  linkTelegram?: string | null
  linkTwitter?: string | null
  linkWebsite?: string | null
  manageUrl: string
  name: string
  reviewCount?: number | null
  slug: string
  status?: ProjectStatus | null
  tags?: Array<string> | null
  updatedAt?: Date | null
  viewUrl: string
  community?: {
    __typename?: 'Community'
    activeProjectsCount?: number | null
    avatarUrl?: string | null
    createdAt?: Date | null
    homeServerId?: string | null
    id: string
    memberCount?: number | null
    name: string
    updatedAt?: Date | null
    viewUrl: string
    manageUrl: string
    members?: Array<{
      __typename?: 'CommunityMember'
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
        walletAddress?: string | null
      } | null
    }> | null
  } | null
  managers?: Array<{
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
    walletAddress?: string | null
  }> | null
}

export type ReviewerFindManyProjectQueryVariables = Exact<{
  input: ReviewerFindManyProjectInput
}>

export type ReviewerFindManyProjectQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'ProjectPaging'
    data: Array<{
      __typename?: 'Project'
      amountManagerUsd?: number | null
      amountReferralUsd?: number | null
      amountTotalUsd?: number | null
      avatarUrl?: string | null
      communityId: string
      createdAt?: Date | null
      id: string
      instructions?: string | null
      linkDiscord?: string | null
      linkGithub?: string | null
      linkTelegram?: string | null
      linkTwitter?: string | null
      linkWebsite?: string | null
      manageUrl: string
      name: string
      reviewCount?: number | null
      slug: string
      status?: ProjectStatus | null
      tags?: Array<string> | null
      updatedAt?: Date | null
      viewUrl: string
      community?: {
        __typename?: 'Community'
        activeProjectsCount?: number | null
        avatarUrl?: string | null
        createdAt?: Date | null
        homeServerId?: string | null
        id: string
        memberCount?: number | null
        name: string
        updatedAt?: Date | null
        viewUrl: string
        manageUrl: string
        members?: Array<{
          __typename?: 'CommunityMember'
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
            walletAddress?: string | null
          } | null
        }> | null
      } | null
      managers?: Array<{
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
        walletAddress?: string | null
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

export type ReviewerFindOneProjectQueryVariables = Exact<{
  projectId: Scalars['String']['input']
}>

export type ReviewerFindOneProjectQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Project'
    amountManagerUsd?: number | null
    amountReferralUsd?: number | null
    amountTotalUsd?: number | null
    avatarUrl?: string | null
    communityId: string
    createdAt?: Date | null
    id: string
    instructions?: string | null
    linkDiscord?: string | null
    linkGithub?: string | null
    linkTelegram?: string | null
    linkTwitter?: string | null
    linkWebsite?: string | null
    manageUrl: string
    name: string
    reviewCount?: number | null
    slug: string
    status?: ProjectStatus | null
    tags?: Array<string> | null
    updatedAt?: Date | null
    viewUrl: string
    community?: {
      __typename?: 'Community'
      activeProjectsCount?: number | null
      avatarUrl?: string | null
      createdAt?: Date | null
      homeServerId?: string | null
      id: string
      memberCount?: number | null
      name: string
      updatedAt?: Date | null
      viewUrl: string
      manageUrl: string
      members?: Array<{
        __typename?: 'CommunityMember'
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
          walletAddress?: string | null
        } | null
      }> | null
    } | null
    managers?: Array<{
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
      walletAddress?: string | null
    }> | null
  } | null
}

export type AdminFindManyProjectQueryVariables = Exact<{
  input: AdminFindManyProjectInput
}>

export type AdminFindManyProjectQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'ProjectPaging'
    data: Array<{
      __typename?: 'Project'
      amountManagerUsd?: number | null
      amountReferralUsd?: number | null
      amountTotalUsd?: number | null
      avatarUrl?: string | null
      communityId: string
      createdAt?: Date | null
      id: string
      instructions?: string | null
      linkDiscord?: string | null
      linkGithub?: string | null
      linkTelegram?: string | null
      linkTwitter?: string | null
      linkWebsite?: string | null
      manageUrl: string
      name: string
      reviewCount?: number | null
      slug: string
      status?: ProjectStatus | null
      tags?: Array<string> | null
      updatedAt?: Date | null
      viewUrl: string
      community?: {
        __typename?: 'Community'
        activeProjectsCount?: number | null
        avatarUrl?: string | null
        createdAt?: Date | null
        homeServerId?: string | null
        id: string
        memberCount?: number | null
        name: string
        updatedAt?: Date | null
        viewUrl: string
        manageUrl: string
        members?: Array<{
          __typename?: 'CommunityMember'
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
            walletAddress?: string | null
          } | null
        }> | null
      } | null
      managers?: Array<{
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
        walletAddress?: string | null
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

export type AdminFindOneProjectQueryVariables = Exact<{
  projectId: Scalars['String']['input']
}>

export type AdminFindOneProjectQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Project'
    amountManagerUsd?: number | null
    amountReferralUsd?: number | null
    amountTotalUsd?: number | null
    avatarUrl?: string | null
    communityId: string
    createdAt?: Date | null
    id: string
    instructions?: string | null
    linkDiscord?: string | null
    linkGithub?: string | null
    linkTelegram?: string | null
    linkTwitter?: string | null
    linkWebsite?: string | null
    manageUrl: string
    name: string
    reviewCount?: number | null
    slug: string
    status?: ProjectStatus | null
    tags?: Array<string> | null
    updatedAt?: Date | null
    viewUrl: string
    referral?: {
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
      walletAddress?: string | null
    } | null
    members?: Array<{
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
      walletAddress?: string | null
    }> | null
    community?: {
      __typename?: 'Community'
      activeProjectsCount?: number | null
      avatarUrl?: string | null
      createdAt?: Date | null
      homeServerId?: string | null
      id: string
      memberCount?: number | null
      name: string
      updatedAt?: Date | null
      viewUrl: string
      manageUrl: string
      members?: Array<{
        __typename?: 'CommunityMember'
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
          walletAddress?: string | null
        } | null
      }> | null
    } | null
    managers?: Array<{
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
      walletAddress?: string | null
    }> | null
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
    amountManagerUsd?: number | null
    amountReferralUsd?: number | null
    amountTotalUsd?: number | null
    avatarUrl?: string | null
    communityId: string
    createdAt?: Date | null
    id: string
    instructions?: string | null
    linkDiscord?: string | null
    linkGithub?: string | null
    linkTelegram?: string | null
    linkTwitter?: string | null
    linkWebsite?: string | null
    manageUrl: string
    name: string
    reviewCount?: number | null
    slug: string
    status?: ProjectStatus | null
    tags?: Array<string> | null
    updatedAt?: Date | null
    viewUrl: string
    community?: {
      __typename?: 'Community'
      activeProjectsCount?: number | null
      avatarUrl?: string | null
      createdAt?: Date | null
      homeServerId?: string | null
      id: string
      memberCount?: number | null
      name: string
      updatedAt?: Date | null
      viewUrl: string
      manageUrl: string
      members?: Array<{
        __typename?: 'CommunityMember'
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
          walletAddress?: string | null
        } | null
      }> | null
    } | null
    managers?: Array<{
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
      walletAddress?: string | null
    }> | null
  } | null
}

export type AdminDeleteProjectMutationVariables = Exact<{
  projectId: Scalars['String']['input']
}>

export type AdminDeleteProjectMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type AdminAddProjectManagerMutationVariables = Exact<{
  projectId: Scalars['String']['input']
  managerUserId: Scalars['String']['input']
}>

export type AdminAddProjectManagerMutation = { __typename?: 'Mutation'; added?: boolean | null }

export type AdminRemoveProjectManagerMutationVariables = Exact<{
  projectId: Scalars['String']['input']
  managerUserId: Scalars['String']['input']
}>

export type AdminRemoveProjectManagerMutation = { __typename?: 'Mutation'; removed?: boolean | null }

export type AdminAddProjectMemberMutationVariables = Exact<{
  projectId: Scalars['String']['input']
  memberUserId: Scalars['String']['input']
}>

export type AdminAddProjectMemberMutation = { __typename?: 'Mutation'; added?: boolean | null }

export type AdminRemoveProjectMemberMutationVariables = Exact<{
  projectId: Scalars['String']['input']
  memberUserId: Scalars['String']['input']
}>

export type AdminRemoveProjectMemberMutation = { __typename?: 'Mutation'; removed?: boolean | null }

export type AdminAddProjectReferralMutationVariables = Exact<{
  projectId: Scalars['String']['input']
  referralUserId: Scalars['String']['input']
}>

export type AdminAddProjectReferralMutation = { __typename?: 'Mutation'; added?: boolean | null }

export type AdminRemoveProjectReferralMutationVariables = Exact<{
  projectId: Scalars['String']['input']
  referralUserId: Scalars['String']['input']
}>

export type AdminRemoveProjectReferralMutation = { __typename?: 'Mutation'; removed?: boolean | null }

export type ManagerFindManyProjectQueryVariables = Exact<{
  input: ManagerFindManyProjectInput
}>

export type ManagerFindManyProjectQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'ProjectPaging'
    data: Array<{
      __typename?: 'Project'
      amountManagerUsd?: number | null
      amountReferralUsd?: number | null
      amountTotalUsd?: number | null
      avatarUrl?: string | null
      communityId: string
      createdAt?: Date | null
      id: string
      instructions?: string | null
      linkDiscord?: string | null
      linkGithub?: string | null
      linkTelegram?: string | null
      linkTwitter?: string | null
      linkWebsite?: string | null
      manageUrl: string
      name: string
      reviewCount?: number | null
      slug: string
      status?: ProjectStatus | null
      tags?: Array<string> | null
      updatedAt?: Date | null
      viewUrl: string
      community?: {
        __typename?: 'Community'
        activeProjectsCount?: number | null
        avatarUrl?: string | null
        createdAt?: Date | null
        homeServerId?: string | null
        id: string
        memberCount?: number | null
        name: string
        updatedAt?: Date | null
        viewUrl: string
        manageUrl: string
        members?: Array<{
          __typename?: 'CommunityMember'
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
            walletAddress?: string | null
          } | null
        }> | null
      } | null
      managers?: Array<{
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
        walletAddress?: string | null
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

export type ManagerFindOneProjectQueryVariables = Exact<{
  projectId: Scalars['String']['input']
}>

export type ManagerFindOneProjectQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Project'
    amountManagerUsd?: number | null
    amountReferralUsd?: number | null
    amountTotalUsd?: number | null
    avatarUrl?: string | null
    communityId: string
    createdAt?: Date | null
    id: string
    instructions?: string | null
    linkDiscord?: string | null
    linkGithub?: string | null
    linkTelegram?: string | null
    linkTwitter?: string | null
    linkWebsite?: string | null
    manageUrl: string
    name: string
    reviewCount?: number | null
    slug: string
    status?: ProjectStatus | null
    tags?: Array<string> | null
    updatedAt?: Date | null
    viewUrl: string
    referral?: {
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
      walletAddress?: string | null
    } | null
    members?: Array<{
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
      walletAddress?: string | null
    }> | null
    community?: {
      __typename?: 'Community'
      activeProjectsCount?: number | null
      avatarUrl?: string | null
      createdAt?: Date | null
      homeServerId?: string | null
      id: string
      memberCount?: number | null
      name: string
      updatedAt?: Date | null
      viewUrl: string
      manageUrl: string
      members?: Array<{
        __typename?: 'CommunityMember'
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
          walletAddress?: string | null
        } | null
      }> | null
    } | null
    managers?: Array<{
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
      walletAddress?: string | null
    }> | null
  } | null
}

export type ManagerCreateProjectMutationVariables = Exact<{
  input: ManagerCreateProjectInput
}>

export type ManagerCreateProjectMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Project'
    amountManagerUsd?: number | null
    amountReferralUsd?: number | null
    amountTotalUsd?: number | null
    avatarUrl?: string | null
    communityId: string
    createdAt?: Date | null
    id: string
    instructions?: string | null
    linkDiscord?: string | null
    linkGithub?: string | null
    linkTelegram?: string | null
    linkTwitter?: string | null
    linkWebsite?: string | null
    manageUrl: string
    name: string
    reviewCount?: number | null
    slug: string
    status?: ProjectStatus | null
    tags?: Array<string> | null
    updatedAt?: Date | null
    viewUrl: string
    community?: {
      __typename?: 'Community'
      activeProjectsCount?: number | null
      avatarUrl?: string | null
      createdAt?: Date | null
      homeServerId?: string | null
      id: string
      memberCount?: number | null
      name: string
      updatedAt?: Date | null
      viewUrl: string
      manageUrl: string
      members?: Array<{
        __typename?: 'CommunityMember'
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
          walletAddress?: string | null
        } | null
      }> | null
    } | null
    managers?: Array<{
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
      walletAddress?: string | null
    }> | null
  } | null
}

export type ManagerUpdateProjectMutationVariables = Exact<{
  projectId: Scalars['String']['input']
  input: ManagerUpdateProjectInput
}>

export type ManagerUpdateProjectMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'Project'
    amountManagerUsd?: number | null
    amountReferralUsd?: number | null
    amountTotalUsd?: number | null
    avatarUrl?: string | null
    communityId: string
    createdAt?: Date | null
    id: string
    instructions?: string | null
    linkDiscord?: string | null
    linkGithub?: string | null
    linkTelegram?: string | null
    linkTwitter?: string | null
    linkWebsite?: string | null
    manageUrl: string
    name: string
    reviewCount?: number | null
    slug: string
    status?: ProjectStatus | null
    tags?: Array<string> | null
    updatedAt?: Date | null
    viewUrl: string
    community?: {
      __typename?: 'Community'
      activeProjectsCount?: number | null
      avatarUrl?: string | null
      createdAt?: Date | null
      homeServerId?: string | null
      id: string
      memberCount?: number | null
      name: string
      updatedAt?: Date | null
      viewUrl: string
      manageUrl: string
      members?: Array<{
        __typename?: 'CommunityMember'
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
          walletAddress?: string | null
        } | null
      }> | null
    } | null
    managers?: Array<{
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
      walletAddress?: string | null
    }> | null
  } | null
}

export type ManagerDeleteProjectMutationVariables = Exact<{
  projectId: Scalars['String']['input']
}>

export type ManagerDeleteProjectMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type ManagerAddProjectManagerMutationVariables = Exact<{
  projectId: Scalars['String']['input']
  managerUserId: Scalars['String']['input']
}>

export type ManagerAddProjectManagerMutation = { __typename?: 'Mutation'; added?: boolean | null }

export type ManagerRemoveProjectManagerMutationVariables = Exact<{
  projectId: Scalars['String']['input']
  managerUserId: Scalars['String']['input']
}>

export type ManagerRemoveProjectManagerMutation = { __typename?: 'Mutation'; removed?: boolean | null }

export type ManagerAddProjectMemberMutationVariables = Exact<{
  projectId: Scalars['String']['input']
  memberUserId: Scalars['String']['input']
}>

export type ManagerAddProjectMemberMutation = { __typename?: 'Mutation'; added?: boolean | null }

export type ManagerRemoveProjectMemberMutationVariables = Exact<{
  projectId: Scalars['String']['input']
  memberUserId: Scalars['String']['input']
}>

export type ManagerRemoveProjectMemberMutation = { __typename?: 'Mutation'; removed?: boolean | null }

export type ManagerAddProjectReferralMutationVariables = Exact<{
  projectId: Scalars['String']['input']
  referralUserId: Scalars['String']['input']
}>

export type ManagerAddProjectReferralMutation = { __typename?: 'Mutation'; added?: boolean | null }

export type ManagerRemoveProjectReferralMutationVariables = Exact<{
  projectId: Scalars['String']['input']
  referralUserId: Scalars['String']['input']
}>

export type ManagerRemoveProjectReferralMutation = { __typename?: 'Mutation'; removed?: boolean | null }

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
    amountManagerUsd?: number | null
    amountReferralUsd?: number | null
    amountTotalUsd?: number | null
    avatarUrl?: string | null
    communityId: string
    createdAt?: Date | null
    id: string
    instructions?: string | null
    linkDiscord?: string | null
    linkGithub?: string | null
    linkTelegram?: string | null
    linkTwitter?: string | null
    linkWebsite?: string | null
    manageUrl: string
    name: string
    reviewCount?: number | null
    slug: string
    status?: ProjectStatus | null
    tags?: Array<string> | null
    updatedAt?: Date | null
    viewUrl: string
    community?: {
      __typename?: 'Community'
      activeProjectsCount?: number | null
      avatarUrl?: string | null
      createdAt?: Date | null
      homeServerId?: string | null
      id: string
      memberCount?: number | null
      name: string
      updatedAt?: Date | null
      viewUrl: string
      manageUrl: string
      members?: Array<{
        __typename?: 'CommunityMember'
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
          walletAddress?: string | null
        } | null
      }> | null
    } | null
    managers?: Array<{
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
      walletAddress?: string | null
    }> | null
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
    walletAddress?: string | null
  } | null
}

export type ReviewerFindManyReviewByProjectQueryVariables = Exact<{
  input: ReviewerFindManyReviewByProjectInput
}>

export type ReviewerFindManyReviewByProjectQuery = {
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
      amountManagerUsd?: number | null
      amountReferralUsd?: number | null
      amountTotalUsd?: number | null
      avatarUrl?: string | null
      communityId: string
      createdAt?: Date | null
      id: string
      instructions?: string | null
      linkDiscord?: string | null
      linkGithub?: string | null
      linkTelegram?: string | null
      linkTwitter?: string | null
      linkWebsite?: string | null
      manageUrl: string
      name: string
      reviewCount?: number | null
      slug: string
      status?: ProjectStatus | null
      tags?: Array<string> | null
      updatedAt?: Date | null
      viewUrl: string
      community?: {
        __typename?: 'Community'
        activeProjectsCount?: number | null
        avatarUrl?: string | null
        createdAt?: Date | null
        homeServerId?: string | null
        id: string
        memberCount?: number | null
        name: string
        updatedAt?: Date | null
        viewUrl: string
        manageUrl: string
        members?: Array<{
          __typename?: 'CommunityMember'
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
            walletAddress?: string | null
          } | null
        }> | null
      } | null
      managers?: Array<{
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
        walletAddress?: string | null
      }> | null
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
      walletAddress?: string | null
    } | null
  }> | null
}

export type ReviewerFindManyReviewByUsernameQueryVariables = Exact<{
  input: ReviewerFindManyReviewByUsernameInput
}>

export type ReviewerFindManyReviewByUsernameQuery = {
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
      amountManagerUsd?: number | null
      amountReferralUsd?: number | null
      amountTotalUsd?: number | null
      avatarUrl?: string | null
      communityId: string
      createdAt?: Date | null
      id: string
      instructions?: string | null
      linkDiscord?: string | null
      linkGithub?: string | null
      linkTelegram?: string | null
      linkTwitter?: string | null
      linkWebsite?: string | null
      manageUrl: string
      name: string
      reviewCount?: number | null
      slug: string
      status?: ProjectStatus | null
      tags?: Array<string> | null
      updatedAt?: Date | null
      viewUrl: string
      community?: {
        __typename?: 'Community'
        activeProjectsCount?: number | null
        avatarUrl?: string | null
        createdAt?: Date | null
        homeServerId?: string | null
        id: string
        memberCount?: number | null
        name: string
        updatedAt?: Date | null
        viewUrl: string
        manageUrl: string
        members?: Array<{
          __typename?: 'CommunityMember'
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
            walletAddress?: string | null
          } | null
        }> | null
      } | null
      managers?: Array<{
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
        walletAddress?: string | null
      }> | null
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
      walletAddress?: string | null
    } | null
  }> | null
}

export type ReviewerFindUserProjectReviewQueryVariables = Exact<{
  projectId: Scalars['String']['input']
}>

export type ReviewerFindUserProjectReviewQuery = {
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
      amountManagerUsd?: number | null
      amountReferralUsd?: number | null
      amountTotalUsd?: number | null
      avatarUrl?: string | null
      communityId: string
      createdAt?: Date | null
      id: string
      instructions?: string | null
      linkDiscord?: string | null
      linkGithub?: string | null
      linkTelegram?: string | null
      linkTwitter?: string | null
      linkWebsite?: string | null
      manageUrl: string
      name: string
      reviewCount?: number | null
      slug: string
      status?: ProjectStatus | null
      tags?: Array<string> | null
      updatedAt?: Date | null
      viewUrl: string
      community?: {
        __typename?: 'Community'
        activeProjectsCount?: number | null
        avatarUrl?: string | null
        createdAt?: Date | null
        homeServerId?: string | null
        id: string
        memberCount?: number | null
        name: string
        updatedAt?: Date | null
        viewUrl: string
        manageUrl: string
        members?: Array<{
          __typename?: 'CommunityMember'
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
            walletAddress?: string | null
          } | null
        }> | null
      } | null
      managers?: Array<{
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
        walletAddress?: string | null
      }> | null
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
      walletAddress?: string | null
    } | null
  } | null
}

export type ReviewerFindOneReviewQueryVariables = Exact<{
  reviewId: Scalars['String']['input']
}>

export type ReviewerFindOneReviewQuery = {
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
      amountManagerUsd?: number | null
      amountReferralUsd?: number | null
      amountTotalUsd?: number | null
      avatarUrl?: string | null
      communityId: string
      createdAt?: Date | null
      id: string
      instructions?: string | null
      linkDiscord?: string | null
      linkGithub?: string | null
      linkTelegram?: string | null
      linkTwitter?: string | null
      linkWebsite?: string | null
      manageUrl: string
      name: string
      reviewCount?: number | null
      slug: string
      status?: ProjectStatus | null
      tags?: Array<string> | null
      updatedAt?: Date | null
      viewUrl: string
      community?: {
        __typename?: 'Community'
        activeProjectsCount?: number | null
        avatarUrl?: string | null
        createdAt?: Date | null
        homeServerId?: string | null
        id: string
        memberCount?: number | null
        name: string
        updatedAt?: Date | null
        viewUrl: string
        manageUrl: string
        members?: Array<{
          __typename?: 'CommunityMember'
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
            walletAddress?: string | null
          } | null
        }> | null
      } | null
      managers?: Array<{
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
        walletAddress?: string | null
      }> | null
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
      walletAddress?: string | null
    } | null
  } | null
}

export type ReviewerCreateReviewMutationVariables = Exact<{
  projectId: Scalars['String']['input']
}>

export type ReviewerCreateReviewMutation = {
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
      amountManagerUsd?: number | null
      amountReferralUsd?: number | null
      amountTotalUsd?: number | null
      avatarUrl?: string | null
      communityId: string
      createdAt?: Date | null
      id: string
      instructions?: string | null
      linkDiscord?: string | null
      linkGithub?: string | null
      linkTelegram?: string | null
      linkTwitter?: string | null
      linkWebsite?: string | null
      manageUrl: string
      name: string
      reviewCount?: number | null
      slug: string
      status?: ProjectStatus | null
      tags?: Array<string> | null
      updatedAt?: Date | null
      viewUrl: string
      community?: {
        __typename?: 'Community'
        activeProjectsCount?: number | null
        avatarUrl?: string | null
        createdAt?: Date | null
        homeServerId?: string | null
        id: string
        memberCount?: number | null
        name: string
        updatedAt?: Date | null
        viewUrl: string
        manageUrl: string
        members?: Array<{
          __typename?: 'CommunityMember'
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
            walletAddress?: string | null
          } | null
        }> | null
      } | null
      managers?: Array<{
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
        walletAddress?: string | null
      }> | null
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
      walletAddress?: string | null
    } | null
  } | null
}

export type ReviewerDeleteReviewMutationVariables = Exact<{
  reviewId: Scalars['String']['input']
}>

export type ReviewerDeleteReviewMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

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
        amountManagerUsd?: number | null
        amountReferralUsd?: number | null
        amountTotalUsd?: number | null
        avatarUrl?: string | null
        communityId: string
        createdAt?: Date | null
        id: string
        instructions?: string | null
        linkDiscord?: string | null
        linkGithub?: string | null
        linkTelegram?: string | null
        linkTwitter?: string | null
        linkWebsite?: string | null
        manageUrl: string
        name: string
        reviewCount?: number | null
        slug: string
        status?: ProjectStatus | null
        tags?: Array<string> | null
        updatedAt?: Date | null
        viewUrl: string
        community?: {
          __typename?: 'Community'
          activeProjectsCount?: number | null
          avatarUrl?: string | null
          createdAt?: Date | null
          homeServerId?: string | null
          id: string
          memberCount?: number | null
          name: string
          updatedAt?: Date | null
          viewUrl: string
          manageUrl: string
          members?: Array<{
            __typename?: 'CommunityMember'
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
              walletAddress?: string | null
            } | null
          }> | null
        } | null
        managers?: Array<{
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
          walletAddress?: string | null
        }> | null
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
        walletAddress?: string | null
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
      amountManagerUsd?: number | null
      amountReferralUsd?: number | null
      amountTotalUsd?: number | null
      avatarUrl?: string | null
      communityId: string
      createdAt?: Date | null
      id: string
      instructions?: string | null
      linkDiscord?: string | null
      linkGithub?: string | null
      linkTelegram?: string | null
      linkTwitter?: string | null
      linkWebsite?: string | null
      manageUrl: string
      name: string
      reviewCount?: number | null
      slug: string
      status?: ProjectStatus | null
      tags?: Array<string> | null
      updatedAt?: Date | null
      viewUrl: string
      community?: {
        __typename?: 'Community'
        activeProjectsCount?: number | null
        avatarUrl?: string | null
        createdAt?: Date | null
        homeServerId?: string | null
        id: string
        memberCount?: number | null
        name: string
        updatedAt?: Date | null
        viewUrl: string
        manageUrl: string
        members?: Array<{
          __typename?: 'CommunityMember'
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
            walletAddress?: string | null
          } | null
        }> | null
      } | null
      managers?: Array<{
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
        walletAddress?: string | null
      }> | null
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
      walletAddress?: string | null
    } | null
  } | null
}

export type AdminDeleteReviewMutationVariables = Exact<{
  reviewId: Scalars['String']['input']
}>

export type AdminDeleteReviewMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

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
  walletAddress?: string | null
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
    walletAddress?: string | null
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
      walletAddress?: string | null
      identities?: Array<{
        __typename?: 'Identity'
        createdAt: Date
        expired?: boolean | null
        id: string
        name?: string | null
        primary?: boolean | null
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
    walletAddress?: string | null
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
    walletAddress?: string | null
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
      walletAddress?: string | null
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
    walletAddress?: string | null
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
    walletAddress?: string | null
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
    walletAddress
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
    communityCategoryId
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
    primary
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
export const CommunityMemberDetailsFragmentDoc = gql`
  fragment CommunityMemberDetails on CommunityMember {
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
export const CommunityDetailsFragmentDoc = gql`
  fragment CommunityDetails on Community {
    activeProjectsCount
    avatarUrl
    createdAt
    homeServerId
    id
    memberCount
    name
    updatedAt
    viewUrl
    manageUrl
    members {
      ...CommunityMemberDetails
    }
  }
  ${CommunityMemberDetailsFragmentDoc}
`
export const ProjectDetailsFragmentDoc = gql`
  fragment ProjectDetails on Project {
    amountManagerUsd
    amountReferralUsd
    amountTotalUsd
    avatarUrl
    communityId
    community {
      ...CommunityDetails
    }
    createdAt
    id
    instructions
    linkDiscord
    linkGithub
    linkTelegram
    linkTwitter
    linkWebsite
    managers {
      ...UserDetails
    }
    manageUrl
    name
    reviewCount
    slug
    status
    tags
    updatedAt
    viewUrl
  }
  ${CommunityDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
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
      identities {
        ...IdentityDetails
      }
    }
  }
  ${UserDetailsFragmentDoc}
  ${IdentityDetailsFragmentDoc}
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
export const UserFindManyCommunityDocument = gql`
  query userFindManyCommunity($input: UserFindManyCommunityInput!) {
    paging: userFindManyCommunity(input: $input) {
      data {
        ...CommunityDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${CommunityDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const UserFindOneCommunityDocument = gql`
  query userFindOneCommunity($communityId: String!) {
    item: userFindOneCommunity(communityId: $communityId) {
      ...CommunityDetails
    }
  }
  ${CommunityDetailsFragmentDoc}
`
export const ManagerGetCommunityMembersDocument = gql`
  query managerGetCommunityMembers($communityId: String!) {
    items: managerGetCommunityMembers(communityId: $communityId) {
      ...CommunityMemberDetails
    }
  }
  ${CommunityMemberDetailsFragmentDoc}
`
export const ManagerGetCommunityMemberDocument = gql`
  query managerGetCommunityMember($communityId: String!) {
    item: managerGetCommunityMember(communityId: $communityId) {
      ...CommunityMemberDetails
    }
  }
  ${CommunityMemberDetailsFragmentDoc}
`
export const ManagerFindManyCommunityDocument = gql`
  query managerFindManyCommunity($input: ManagerFindManyCommunityInput!) {
    paging: managerFindManyCommunity(input: $input) {
      data {
        ...CommunityDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${CommunityDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const ManagerFindOneCommunityDocument = gql`
  query managerFindOneCommunity($communityId: String!) {
    item: managerFindOneCommunity(communityId: $communityId) {
      ...CommunityDetails
    }
  }
  ${CommunityDetailsFragmentDoc}
`
export const ManagerCreateCommunityDocument = gql`
  mutation managerCreateCommunity($input: ManagerCreateCommunityInput!) {
    created: managerCreateCommunity(input: $input) {
      ...CommunityDetails
    }
  }
  ${CommunityDetailsFragmentDoc}
`
export const ManagerUpdateCommunityDocument = gql`
  mutation managerUpdateCommunity($communityId: String!, $input: ManagerUpdateCommunityInput!) {
    updated: managerUpdateCommunity(communityId: $communityId, input: $input) {
      ...CommunityDetails
    }
  }
  ${CommunityDetailsFragmentDoc}
`
export const ManagerDeleteCommunityDocument = gql`
  mutation managerDeleteCommunity($communityId: String!) {
    deleted: managerDeleteCommunity(communityId: $communityId)
  }
`
export const AdminFindManyCommunityDocument = gql`
  query adminFindManyCommunity($input: AdminFindManyCommunityInput!) {
    paging: adminFindManyCommunity(input: $input) {
      data {
        ...CommunityDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${CommunityDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const AdminGetCommunityMembersDocument = gql`
  query adminGetCommunityMembers($communityId: String!) {
    items: adminGetCommunityMembers(communityId: $communityId) {
      ...CommunityMemberDetails
    }
  }
  ${CommunityMemberDetailsFragmentDoc}
`
export const AdminFindOneCommunityDocument = gql`
  query adminFindOneCommunity($communityId: String!) {
    item: adminFindOneCommunity(communityId: $communityId) {
      ...CommunityDetails
    }
  }
  ${CommunityDetailsFragmentDoc}
`
export const AdminUpdateCommunityDocument = gql`
  mutation adminUpdateCommunity($communityId: String!, $input: AdminUpdateCommunityInput!) {
    updated: adminUpdateCommunity(communityId: $communityId, input: $input) {
      ...CommunityDetails
    }
  }
  ${CommunityDetailsFragmentDoc}
`
export const AdminDeleteCommunityDocument = gql`
  mutation adminDeleteCommunity($communityId: String!) {
    deleted: adminDeleteCommunity(communityId: $communityId)
  }
`
export const AdminAddCommunityMemberDocument = gql`
  mutation adminAddCommunityMember($communityId: String!, $userId: String!) {
    added: adminAddCommunityMember(communityId: $communityId, userId: $userId)
  }
`
export const AdminRemoveCommunityMemberDocument = gql`
  mutation adminRemoveCommunityMember($communityId: String!, $userId: String!) {
    removed: adminRemoveCommunityMember(communityId: $communityId, userId: $userId)
  }
`
export const AdminToggleCommunityAdminDocument = gql`
  mutation adminToggleCommunityAdmin($communityId: String!, $userId: String!) {
    toggled: adminToggleCommunityAdmin(communityId: $communityId, userId: $userId)
  }
`
export const ManagerAddCommunityMemberDocument = gql`
  mutation managerAddCommunityMember($communityId: String!, $userId: String!) {
    added: managerAddCommunityMember(communityId: $communityId, userId: $userId)
  }
`
export const ManagerRemoveCommunityMemberDocument = gql`
  mutation managerRemoveCommunityMember($communityId: String!, $userId: String!) {
    removed: managerRemoveCommunityMember(communityId: $communityId, userId: $userId)
  }
`
export const ManagerToggleCommunityAdminDocument = gql`
  mutation managerToggleCommunityAdmin($communityId: String!, $userId: String!) {
    toggled: managerToggleCommunityAdmin(communityId: $communityId, userId: $userId)
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
export const AdminGetCommunityChannelsDocument = gql`
  query adminGetCommunityChannels($communityId: String!) {
    items: adminGetCommunityChannels(communityId: $communityId) {
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
export const AdminCreateCommunityChannelDocument = gql`
  mutation adminCreateCommunityChannel($serverId: String!, $channelId: String!, $communityId: String!) {
    created: adminCreateCommunityChannel(serverId: $serverId, channelId: $channelId, communityId: $communityId)
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
export const AdminDeleteCommunityChannelDocument = gql`
  mutation adminDeleteCommunityChannel($channelId: String!, $communityId: String!) {
    deleted: adminDeleteCommunityChannel(channelId: $channelId, communityId: $communityId)
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
export const UserGetCommunityChannelsDocument = gql`
  query userGetCommunityChannels($communityId: String!) {
    items: userGetCommunityChannels(communityId: $communityId) {
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
export const UserSetPrimaryIdentityDocument = gql`
  mutation userSetPrimaryIdentity($identityId: String!) {
    set: userSetPrimaryIdentity(identityId: $identityId) {
      ...IdentityDetails
    }
  }
  ${IdentityDetailsFragmentDoc}
`
export const ReviewerFindManyProjectDocument = gql`
  query reviewerFindManyProject($input: ReviewerFindManyProjectInput!) {
    paging: reviewerFindManyProject(input: $input) {
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
export const ReviewerFindOneProjectDocument = gql`
  query reviewerFindOneProject($projectId: String!) {
    item: reviewerFindOneProject(projectId: $projectId) {
      ...ProjectDetails
    }
  }
  ${ProjectDetailsFragmentDoc}
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
      referral {
        ...UserDetails
      }
      members {
        ...UserDetails
      }
    }
  }
  ${ProjectDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
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
export const AdminAddProjectManagerDocument = gql`
  mutation adminAddProjectManager($projectId: String!, $managerUserId: String!) {
    added: adminAddProjectManager(projectId: $projectId, managerUserId: $managerUserId)
  }
`
export const AdminRemoveProjectManagerDocument = gql`
  mutation adminRemoveProjectManager($projectId: String!, $managerUserId: String!) {
    removed: adminRemoveProjectManager(projectId: $projectId, managerUserId: $managerUserId)
  }
`
export const AdminAddProjectMemberDocument = gql`
  mutation adminAddProjectMember($projectId: String!, $memberUserId: String!) {
    added: adminAddProjectMember(projectId: $projectId, memberUserId: $memberUserId)
  }
`
export const AdminRemoveProjectMemberDocument = gql`
  mutation adminRemoveProjectMember($projectId: String!, $memberUserId: String!) {
    removed: adminRemoveProjectMember(projectId: $projectId, memberUserId: $memberUserId)
  }
`
export const AdminAddProjectReferralDocument = gql`
  mutation adminAddProjectReferral($projectId: String!, $referralUserId: String!) {
    added: adminAddProjectReferral(projectId: $projectId, referralUserId: $referralUserId)
  }
`
export const AdminRemoveProjectReferralDocument = gql`
  mutation adminRemoveProjectReferral($projectId: String!, $referralUserId: String!) {
    removed: adminRemoveProjectReferral(projectId: $projectId, referralUserId: $referralUserId)
  }
`
export const ManagerFindManyProjectDocument = gql`
  query managerFindManyProject($input: ManagerFindManyProjectInput!) {
    paging: managerFindManyProject(input: $input) {
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
export const ManagerFindOneProjectDocument = gql`
  query managerFindOneProject($projectId: String!) {
    item: managerFindOneProject(projectId: $projectId) {
      ...ProjectDetails
      referral {
        ...UserDetails
      }
      members {
        ...UserDetails
      }
    }
  }
  ${ProjectDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
`
export const ManagerCreateProjectDocument = gql`
  mutation managerCreateProject($input: ManagerCreateProjectInput!) {
    created: managerCreateProject(input: $input) {
      ...ProjectDetails
    }
  }
  ${ProjectDetailsFragmentDoc}
`
export const ManagerUpdateProjectDocument = gql`
  mutation managerUpdateProject($projectId: String!, $input: ManagerUpdateProjectInput!) {
    updated: managerUpdateProject(projectId: $projectId, input: $input) {
      ...ProjectDetails
    }
  }
  ${ProjectDetailsFragmentDoc}
`
export const ManagerDeleteProjectDocument = gql`
  mutation managerDeleteProject($projectId: String!) {
    deleted: managerDeleteProject(projectId: $projectId)
  }
`
export const ManagerAddProjectManagerDocument = gql`
  mutation managerAddProjectManager($projectId: String!, $managerUserId: String!) {
    added: managerAddProjectManager(projectId: $projectId, managerUserId: $managerUserId)
  }
`
export const ManagerRemoveProjectManagerDocument = gql`
  mutation managerRemoveProjectManager($projectId: String!, $managerUserId: String!) {
    removed: managerRemoveProjectManager(projectId: $projectId, managerUserId: $managerUserId)
  }
`
export const ManagerAddProjectMemberDocument = gql`
  mutation managerAddProjectMember($projectId: String!, $memberUserId: String!) {
    added: managerAddProjectMember(projectId: $projectId, memberUserId: $memberUserId)
  }
`
export const ManagerRemoveProjectMemberDocument = gql`
  mutation managerRemoveProjectMember($projectId: String!, $memberUserId: String!) {
    removed: managerRemoveProjectMember(projectId: $projectId, memberUserId: $memberUserId)
  }
`
export const ManagerAddProjectReferralDocument = gql`
  mutation managerAddProjectReferral($projectId: String!, $referralUserId: String!) {
    added: managerAddProjectReferral(projectId: $projectId, referralUserId: $referralUserId)
  }
`
export const ManagerRemoveProjectReferralDocument = gql`
  mutation managerRemoveProjectReferral($projectId: String!, $referralUserId: String!) {
    removed: managerRemoveProjectReferral(projectId: $projectId, referralUserId: $referralUserId)
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
export const ReviewerFindManyReviewByProjectDocument = gql`
  query reviewerFindManyReviewByProject($input: ReviewerFindManyReviewByProjectInput!) {
    items: reviewerFindManyReviewByProject(input: $input) {
      ...ReviewDetails
    }
  }
  ${ReviewDetailsFragmentDoc}
`
export const ReviewerFindManyReviewByUsernameDocument = gql`
  query reviewerFindManyReviewByUsername($input: ReviewerFindManyReviewByUsernameInput!) {
    items: reviewerFindManyReviewByUsername(input: $input) {
      ...ReviewDetails
    }
  }
  ${ReviewDetailsFragmentDoc}
`
export const ReviewerFindUserProjectReviewDocument = gql`
  query reviewerFindUserProjectReview($projectId: String!) {
    item: reviewerFindUserProjectReview(projectId: $projectId) {
      ...ReviewDetails
    }
  }
  ${ReviewDetailsFragmentDoc}
`
export const ReviewerFindOneReviewDocument = gql`
  query reviewerFindOneReview($reviewId: String!) {
    item: reviewerFindOneReview(reviewId: $reviewId) {
      ...ReviewDetails
    }
  }
  ${ReviewDetailsFragmentDoc}
`
export const ReviewerCreateReviewDocument = gql`
  mutation reviewerCreateReview($projectId: String!) {
    created: reviewerCreateReview(projectId: $projectId) {
      ...ReviewDetails
    }
  }
  ${ReviewDetailsFragmentDoc}
`
export const ReviewerDeleteReviewDocument = gql`
  mutation reviewerDeleteReview($reviewId: String!) {
    deleted: reviewerDeleteReview(reviewId: $reviewId)
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
const UserFindManyCommunityDocumentString = print(UserFindManyCommunityDocument)
const UserFindOneCommunityDocumentString = print(UserFindOneCommunityDocument)
const ManagerGetCommunityMembersDocumentString = print(ManagerGetCommunityMembersDocument)
const ManagerGetCommunityMemberDocumentString = print(ManagerGetCommunityMemberDocument)
const ManagerFindManyCommunityDocumentString = print(ManagerFindManyCommunityDocument)
const ManagerFindOneCommunityDocumentString = print(ManagerFindOneCommunityDocument)
const ManagerCreateCommunityDocumentString = print(ManagerCreateCommunityDocument)
const ManagerUpdateCommunityDocumentString = print(ManagerUpdateCommunityDocument)
const ManagerDeleteCommunityDocumentString = print(ManagerDeleteCommunityDocument)
const AdminFindManyCommunityDocumentString = print(AdminFindManyCommunityDocument)
const AdminGetCommunityMembersDocumentString = print(AdminGetCommunityMembersDocument)
const AdminFindOneCommunityDocumentString = print(AdminFindOneCommunityDocument)
const AdminUpdateCommunityDocumentString = print(AdminUpdateCommunityDocument)
const AdminDeleteCommunityDocumentString = print(AdminDeleteCommunityDocument)
const AdminAddCommunityMemberDocumentString = print(AdminAddCommunityMemberDocument)
const AdminRemoveCommunityMemberDocumentString = print(AdminRemoveCommunityMemberDocument)
const AdminToggleCommunityAdminDocumentString = print(AdminToggleCommunityAdminDocument)
const ManagerAddCommunityMemberDocumentString = print(ManagerAddCommunityMemberDocument)
const ManagerRemoveCommunityMemberDocumentString = print(ManagerRemoveCommunityMemberDocument)
const ManagerToggleCommunityAdminDocumentString = print(ManagerToggleCommunityAdminDocument)
const UptimeDocumentString = print(UptimeDocument)
const AppConfigDocumentString = print(AppConfigDocument)
const AdminGetDiscordBotDocumentString = print(AdminGetDiscordBotDocument)
const AdminGetDiscordServersDocumentString = print(AdminGetDiscordServersDocument)
const AdminGetDiscordRolesDocumentString = print(AdminGetDiscordRolesDocument)
const AdminGetDiscordChannelsDocumentString = print(AdminGetDiscordChannelsDocument)
const AdminGetProjectChannelsDocumentString = print(AdminGetProjectChannelsDocument)
const AdminGetCommunityChannelsDocumentString = print(AdminGetCommunityChannelsDocument)
const AdminPingDiscordChannelDocumentString = print(AdminPingDiscordChannelDocument)
const AdminCreateProjectChannelDocumentString = print(AdminCreateProjectChannelDocument)
const AdminCreateCommunityChannelDocumentString = print(AdminCreateCommunityChannelDocument)
const AdminUpdateDiscordServerDocumentString = print(AdminUpdateDiscordServerDocument)
const AdminDeleteProjectChannelDocumentString = print(AdminDeleteProjectChannelDocument)
const AdminDeleteCommunityChannelDocumentString = print(AdminDeleteCommunityChannelDocument)
const AdminLeaveDiscordServerDocumentString = print(AdminLeaveDiscordServerDocument)
const UserGetDiscordServersDocumentString = print(UserGetDiscordServersDocument)
const UserGetProjectChannelsDocumentString = print(UserGetProjectChannelsDocument)
const UserGetCommunityChannelsDocumentString = print(UserGetCommunityChannelsDocument)
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
const UserSetPrimaryIdentityDocumentString = print(UserSetPrimaryIdentityDocument)
const ReviewerFindManyProjectDocumentString = print(ReviewerFindManyProjectDocument)
const ReviewerFindOneProjectDocumentString = print(ReviewerFindOneProjectDocument)
const AdminFindManyProjectDocumentString = print(AdminFindManyProjectDocument)
const AdminFindOneProjectDocumentString = print(AdminFindOneProjectDocument)
const AdminUpdateProjectDocumentString = print(AdminUpdateProjectDocument)
const AdminDeleteProjectDocumentString = print(AdminDeleteProjectDocument)
const AdminAddProjectManagerDocumentString = print(AdminAddProjectManagerDocument)
const AdminRemoveProjectManagerDocumentString = print(AdminRemoveProjectManagerDocument)
const AdminAddProjectMemberDocumentString = print(AdminAddProjectMemberDocument)
const AdminRemoveProjectMemberDocumentString = print(AdminRemoveProjectMemberDocument)
const AdminAddProjectReferralDocumentString = print(AdminAddProjectReferralDocument)
const AdminRemoveProjectReferralDocumentString = print(AdminRemoveProjectReferralDocument)
const ManagerFindManyProjectDocumentString = print(ManagerFindManyProjectDocument)
const ManagerFindOneProjectDocumentString = print(ManagerFindOneProjectDocument)
const ManagerCreateProjectDocumentString = print(ManagerCreateProjectDocument)
const ManagerUpdateProjectDocumentString = print(ManagerUpdateProjectDocument)
const ManagerDeleteProjectDocumentString = print(ManagerDeleteProjectDocument)
const ManagerAddProjectManagerDocumentString = print(ManagerAddProjectManagerDocument)
const ManagerRemoveProjectManagerDocumentString = print(ManagerRemoveProjectManagerDocument)
const ManagerAddProjectMemberDocumentString = print(ManagerAddProjectMemberDocument)
const ManagerRemoveProjectMemberDocumentString = print(ManagerRemoveProjectMemberDocument)
const ManagerAddProjectReferralDocumentString = print(ManagerAddProjectReferralDocument)
const ManagerRemoveProjectReferralDocumentString = print(ManagerRemoveProjectReferralDocument)
const UserFindManyRatingDocumentString = print(UserFindManyRatingDocument)
const UserCreateRatingDocumentString = print(UserCreateRatingDocument)
const UserUpdateRatingDocumentString = print(UserUpdateRatingDocument)
const UserDeleteRatingDocumentString = print(UserDeleteRatingDocument)
const AdminFindManyRatingDocumentString = print(AdminFindManyRatingDocument)
const AdminUpdateRatingDocumentString = print(AdminUpdateRatingDocument)
const AdminDeleteRatingDocumentString = print(AdminDeleteRatingDocument)
const ReviewerFindManyReviewByProjectDocumentString = print(ReviewerFindManyReviewByProjectDocument)
const ReviewerFindManyReviewByUsernameDocumentString = print(ReviewerFindManyReviewByUsernameDocument)
const ReviewerFindUserProjectReviewDocumentString = print(ReviewerFindUserProjectReviewDocument)
const ReviewerFindOneReviewDocumentString = print(ReviewerFindOneReviewDocument)
const ReviewerCreateReviewDocumentString = print(ReviewerCreateReviewDocument)
const ReviewerDeleteReviewDocumentString = print(ReviewerDeleteReviewDocument)
const AdminFindManyReviewDocumentString = print(AdminFindManyReviewDocument)
const AdminFindOneReviewDocumentString = print(AdminFindOneReviewDocument)
const AdminDeleteReviewDocumentString = print(AdminDeleteReviewDocument)
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
    userFindManyCommunity(
      variables: UserFindManyCommunityQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindManyCommunityQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindManyCommunityQuery>(UserFindManyCommunityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindManyCommunity',
        'query',
        variables,
      )
    },
    userFindOneCommunity(
      variables: UserFindOneCommunityQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindOneCommunityQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindOneCommunityQuery>(UserFindOneCommunityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindOneCommunity',
        'query',
        variables,
      )
    },
    managerGetCommunityMembers(
      variables: ManagerGetCommunityMembersQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ManagerGetCommunityMembersQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ManagerGetCommunityMembersQuery>(ManagerGetCommunityMembersDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'managerGetCommunityMembers',
        'query',
        variables,
      )
    },
    managerGetCommunityMember(
      variables: ManagerGetCommunityMemberQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ManagerGetCommunityMemberQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ManagerGetCommunityMemberQuery>(ManagerGetCommunityMemberDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'managerGetCommunityMember',
        'query',
        variables,
      )
    },
    managerFindManyCommunity(
      variables: ManagerFindManyCommunityQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ManagerFindManyCommunityQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ManagerFindManyCommunityQuery>(ManagerFindManyCommunityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'managerFindManyCommunity',
        'query',
        variables,
      )
    },
    managerFindOneCommunity(
      variables: ManagerFindOneCommunityQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ManagerFindOneCommunityQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ManagerFindOneCommunityQuery>(ManagerFindOneCommunityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'managerFindOneCommunity',
        'query',
        variables,
      )
    },
    managerCreateCommunity(
      variables: ManagerCreateCommunityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ManagerCreateCommunityMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ManagerCreateCommunityMutation>(ManagerCreateCommunityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'managerCreateCommunity',
        'mutation',
        variables,
      )
    },
    managerUpdateCommunity(
      variables: ManagerUpdateCommunityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ManagerUpdateCommunityMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ManagerUpdateCommunityMutation>(ManagerUpdateCommunityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'managerUpdateCommunity',
        'mutation',
        variables,
      )
    },
    managerDeleteCommunity(
      variables: ManagerDeleteCommunityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ManagerDeleteCommunityMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ManagerDeleteCommunityMutation>(ManagerDeleteCommunityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'managerDeleteCommunity',
        'mutation',
        variables,
      )
    },
    adminFindManyCommunity(
      variables: AdminFindManyCommunityQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindManyCommunityQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyCommunityQuery>(AdminFindManyCommunityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyCommunity',
        'query',
        variables,
      )
    },
    adminGetCommunityMembers(
      variables: AdminGetCommunityMembersQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminGetCommunityMembersQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminGetCommunityMembersQuery>(AdminGetCommunityMembersDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminGetCommunityMembers',
        'query',
        variables,
      )
    },
    adminFindOneCommunity(
      variables: AdminFindOneCommunityQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindOneCommunityQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindOneCommunityQuery>(AdminFindOneCommunityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindOneCommunity',
        'query',
        variables,
      )
    },
    adminUpdateCommunity(
      variables: AdminUpdateCommunityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminUpdateCommunityMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminUpdateCommunityMutation>(AdminUpdateCommunityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminUpdateCommunity',
        'mutation',
        variables,
      )
    },
    adminDeleteCommunity(
      variables: AdminDeleteCommunityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteCommunityMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteCommunityMutation>(AdminDeleteCommunityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteCommunity',
        'mutation',
        variables,
      )
    },
    adminAddCommunityMember(
      variables: AdminAddCommunityMemberMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminAddCommunityMemberMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminAddCommunityMemberMutation>(AdminAddCommunityMemberDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminAddCommunityMember',
        'mutation',
        variables,
      )
    },
    adminRemoveCommunityMember(
      variables: AdminRemoveCommunityMemberMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminRemoveCommunityMemberMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminRemoveCommunityMemberMutation>(AdminRemoveCommunityMemberDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminRemoveCommunityMember',
        'mutation',
        variables,
      )
    },
    adminToggleCommunityAdmin(
      variables: AdminToggleCommunityAdminMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminToggleCommunityAdminMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminToggleCommunityAdminMutation>(AdminToggleCommunityAdminDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminToggleCommunityAdmin',
        'mutation',
        variables,
      )
    },
    managerAddCommunityMember(
      variables: ManagerAddCommunityMemberMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ManagerAddCommunityMemberMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ManagerAddCommunityMemberMutation>(ManagerAddCommunityMemberDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'managerAddCommunityMember',
        'mutation',
        variables,
      )
    },
    managerRemoveCommunityMember(
      variables: ManagerRemoveCommunityMemberMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ManagerRemoveCommunityMemberMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ManagerRemoveCommunityMemberMutation>(
            ManagerRemoveCommunityMemberDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'managerRemoveCommunityMember',
        'mutation',
        variables,
      )
    },
    managerToggleCommunityAdmin(
      variables: ManagerToggleCommunityAdminMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ManagerToggleCommunityAdminMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ManagerToggleCommunityAdminMutation>(ManagerToggleCommunityAdminDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'managerToggleCommunityAdmin',
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
    adminGetCommunityChannels(
      variables: AdminGetCommunityChannelsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminGetCommunityChannelsQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminGetCommunityChannelsQuery>(AdminGetCommunityChannelsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminGetCommunityChannels',
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
    adminCreateCommunityChannel(
      variables: AdminCreateCommunityChannelMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminCreateCommunityChannelMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateCommunityChannelMutation>(AdminCreateCommunityChannelDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateCommunityChannel',
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
    adminDeleteCommunityChannel(
      variables: AdminDeleteCommunityChannelMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteCommunityChannelMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteCommunityChannelMutation>(AdminDeleteCommunityChannelDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteCommunityChannel',
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
    userGetCommunityChannels(
      variables: UserGetCommunityChannelsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserGetCommunityChannelsQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserGetCommunityChannelsQuery>(UserGetCommunityChannelsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userGetCommunityChannels',
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
    userSetPrimaryIdentity(
      variables: UserSetPrimaryIdentityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserSetPrimaryIdentityMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserSetPrimaryIdentityMutation>(UserSetPrimaryIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userSetPrimaryIdentity',
        'mutation',
        variables,
      )
    },
    reviewerFindManyProject(
      variables: ReviewerFindManyProjectQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ReviewerFindManyProjectQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ReviewerFindManyProjectQuery>(ReviewerFindManyProjectDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'reviewerFindManyProject',
        'query',
        variables,
      )
    },
    reviewerFindOneProject(
      variables: ReviewerFindOneProjectQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ReviewerFindOneProjectQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ReviewerFindOneProjectQuery>(ReviewerFindOneProjectDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'reviewerFindOneProject',
        'query',
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
    adminAddProjectManager(
      variables: AdminAddProjectManagerMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminAddProjectManagerMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminAddProjectManagerMutation>(AdminAddProjectManagerDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminAddProjectManager',
        'mutation',
        variables,
      )
    },
    adminRemoveProjectManager(
      variables: AdminRemoveProjectManagerMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminRemoveProjectManagerMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminRemoveProjectManagerMutation>(AdminRemoveProjectManagerDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminRemoveProjectManager',
        'mutation',
        variables,
      )
    },
    adminAddProjectMember(
      variables: AdminAddProjectMemberMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminAddProjectMemberMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminAddProjectMemberMutation>(AdminAddProjectMemberDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminAddProjectMember',
        'mutation',
        variables,
      )
    },
    adminRemoveProjectMember(
      variables: AdminRemoveProjectMemberMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminRemoveProjectMemberMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminRemoveProjectMemberMutation>(AdminRemoveProjectMemberDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminRemoveProjectMember',
        'mutation',
        variables,
      )
    },
    adminAddProjectReferral(
      variables: AdminAddProjectReferralMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminAddProjectReferralMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminAddProjectReferralMutation>(AdminAddProjectReferralDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminAddProjectReferral',
        'mutation',
        variables,
      )
    },
    adminRemoveProjectReferral(
      variables: AdminRemoveProjectReferralMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminRemoveProjectReferralMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminRemoveProjectReferralMutation>(AdminRemoveProjectReferralDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminRemoveProjectReferral',
        'mutation',
        variables,
      )
    },
    managerFindManyProject(
      variables: ManagerFindManyProjectQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ManagerFindManyProjectQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ManagerFindManyProjectQuery>(ManagerFindManyProjectDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'managerFindManyProject',
        'query',
        variables,
      )
    },
    managerFindOneProject(
      variables: ManagerFindOneProjectQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ManagerFindOneProjectQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ManagerFindOneProjectQuery>(ManagerFindOneProjectDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'managerFindOneProject',
        'query',
        variables,
      )
    },
    managerCreateProject(
      variables: ManagerCreateProjectMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ManagerCreateProjectMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ManagerCreateProjectMutation>(ManagerCreateProjectDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'managerCreateProject',
        'mutation',
        variables,
      )
    },
    managerUpdateProject(
      variables: ManagerUpdateProjectMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ManagerUpdateProjectMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ManagerUpdateProjectMutation>(ManagerUpdateProjectDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'managerUpdateProject',
        'mutation',
        variables,
      )
    },
    managerDeleteProject(
      variables: ManagerDeleteProjectMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ManagerDeleteProjectMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ManagerDeleteProjectMutation>(ManagerDeleteProjectDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'managerDeleteProject',
        'mutation',
        variables,
      )
    },
    managerAddProjectManager(
      variables: ManagerAddProjectManagerMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ManagerAddProjectManagerMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ManagerAddProjectManagerMutation>(ManagerAddProjectManagerDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'managerAddProjectManager',
        'mutation',
        variables,
      )
    },
    managerRemoveProjectManager(
      variables: ManagerRemoveProjectManagerMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ManagerRemoveProjectManagerMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ManagerRemoveProjectManagerMutation>(ManagerRemoveProjectManagerDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'managerRemoveProjectManager',
        'mutation',
        variables,
      )
    },
    managerAddProjectMember(
      variables: ManagerAddProjectMemberMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ManagerAddProjectMemberMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ManagerAddProjectMemberMutation>(ManagerAddProjectMemberDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'managerAddProjectMember',
        'mutation',
        variables,
      )
    },
    managerRemoveProjectMember(
      variables: ManagerRemoveProjectMemberMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ManagerRemoveProjectMemberMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ManagerRemoveProjectMemberMutation>(ManagerRemoveProjectMemberDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'managerRemoveProjectMember',
        'mutation',
        variables,
      )
    },
    managerAddProjectReferral(
      variables: ManagerAddProjectReferralMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ManagerAddProjectReferralMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ManagerAddProjectReferralMutation>(ManagerAddProjectReferralDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'managerAddProjectReferral',
        'mutation',
        variables,
      )
    },
    managerRemoveProjectReferral(
      variables: ManagerRemoveProjectReferralMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ManagerRemoveProjectReferralMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ManagerRemoveProjectReferralMutation>(
            ManagerRemoveProjectReferralDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'managerRemoveProjectReferral',
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
    reviewerFindManyReviewByProject(
      variables: ReviewerFindManyReviewByProjectQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ReviewerFindManyReviewByProjectQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ReviewerFindManyReviewByProjectQuery>(
            ReviewerFindManyReviewByProjectDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'reviewerFindManyReviewByProject',
        'query',
        variables,
      )
    },
    reviewerFindManyReviewByUsername(
      variables: ReviewerFindManyReviewByUsernameQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ReviewerFindManyReviewByUsernameQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ReviewerFindManyReviewByUsernameQuery>(
            ReviewerFindManyReviewByUsernameDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'reviewerFindManyReviewByUsername',
        'query',
        variables,
      )
    },
    reviewerFindUserProjectReview(
      variables: ReviewerFindUserProjectReviewQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ReviewerFindUserProjectReviewQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ReviewerFindUserProjectReviewQuery>(
            ReviewerFindUserProjectReviewDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'reviewerFindUserProjectReview',
        'query',
        variables,
      )
    },
    reviewerFindOneReview(
      variables: ReviewerFindOneReviewQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ReviewerFindOneReviewQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ReviewerFindOneReviewQuery>(ReviewerFindOneReviewDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'reviewerFindOneReview',
        'query',
        variables,
      )
    },
    reviewerCreateReview(
      variables: ReviewerCreateReviewMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ReviewerCreateReviewMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ReviewerCreateReviewMutation>(ReviewerCreateReviewDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'reviewerCreateReview',
        'mutation',
        variables,
      )
    },
    reviewerDeleteReview(
      variables: ReviewerDeleteReviewMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ReviewerDeleteReviewMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ReviewerDeleteReviewMutation>(ReviewerDeleteReviewDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'reviewerDeleteReview',
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

export const ProjectStatusSchema = z.nativeEnum(ProjectStatus)

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

export function AdminFindManyCommunityInputSchema(): z.ZodObject<Properties<AdminFindManyCommunityInput>> {
  return z.object({
    limit: z.number().nullish(),
    page: z.number().nullish(),
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
    communityId: z.string().nullish(),
    limit: z.number().nullish(),
    page: z.number().nullish(),
    search: z.string().nullish(),
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

export function AdminUpdateCommunityInputSchema(): z.ZodObject<Properties<AdminUpdateCommunityInput>> {
  return z.object({
    avatarUrl: z.string().nullish(),
    homeServerId: z.string().nullish(),
    name: z.string().nullish(),
  })
}

export function AdminUpdateDiscordServerInputSchema(): z.ZodObject<Properties<AdminUpdateDiscordServerInput>> {
  return z.object({
    communityCategoryId: z.string().nullish(),
    createChannels: z.boolean().nullish(),
    logChannelId: z.string().nullish(),
    projectCategoryId: z.string().nullish(),
  })
}

export function AdminUpdateProjectInputSchema(): z.ZodObject<Properties<AdminUpdateProjectInput>> {
  return z.object({
    amountManagerUsd: z.number().nullish(),
    amountReferralUsd: z.number().nullish(),
    amountTotalUsd: z.number().nullish(),
    avatarUrl: z.string().nullish(),
    communityId: z.string().nullish(),
    duration: z.number().nullish(),
    instructions: z.string().nullish(),
    linkDiscord: z.string().nullish(),
    linkGithub: z.string().nullish(),
    linkTelegram: z.string().nullish(),
    linkTwitter: z.string().nullish(),
    linkWebsite: z.string().nullish(),
    name: z.string().nullish(),
    startDate: definedNonNullAnySchema.nullish(),
    status: ProjectStatusSchema.nullish(),
    tags: z.array(z.string()).nullish(),
  })
}

export function AdminUpdateRatingInputSchema(): z.ZodObject<Properties<AdminUpdateRatingInput>> {
  return z.object({
    content: z.string().nullish(),
    rating: z.number(),
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

export function ManagerCreateCommunityInputSchema(): z.ZodObject<Properties<ManagerCreateCommunityInput>> {
  return z.object({
    name: z.string(),
  })
}

export function ManagerCreateProjectInputSchema(): z.ZodObject<Properties<ManagerCreateProjectInput>> {
  return z.object({
    communityId: z.string(),
    duration: z.number().nullish(),
    name: z.string(),
    startDate: definedNonNullAnySchema.nullish(),
  })
}

export function ManagerFindManyCommunityInputSchema(): z.ZodObject<Properties<ManagerFindManyCommunityInput>> {
  return z.object({
    limit: z.number().nullish(),
    page: z.number().nullish(),
    search: z.string().nullish(),
  })
}

export function ManagerFindManyProjectInputSchema(): z.ZodObject<Properties<ManagerFindManyProjectInput>> {
  return z.object({
    communityId: z.string().nullish(),
    limit: z.number().nullish(),
    page: z.number().nullish(),
    search: z.string().nullish(),
  })
}

export function ManagerUpdateCommunityInputSchema(): z.ZodObject<Properties<ManagerUpdateCommunityInput>> {
  return z.object({
    avatarUrl: z.string().nullish(),
    homeServerId: z.string().nullish(),
    name: z.string().nullish(),
  })
}

export function ManagerUpdateProjectInputSchema(): z.ZodObject<Properties<ManagerUpdateProjectInput>> {
  return z.object({
    amountManagerUsd: z.number().nullish(),
    amountReferralUsd: z.number().nullish(),
    amountTotalUsd: z.number().nullish(),
    avatarUrl: z.string().nullish(),
    duration: z.number().nullish(),
    instructions: z.string().nullish(),
    linkDiscord: z.string().nullish(),
    linkGithub: z.string().nullish(),
    linkTelegram: z.string().nullish(),
    linkTwitter: z.string().nullish(),
    linkWebsite: z.string().nullish(),
    name: z.string().nullish(),
    referralId: z.string().nullish(),
    startDate: definedNonNullAnySchema.nullish(),
    status: ProjectStatusSchema.nullish(),
    tags: z.array(z.string()).nullish(),
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

export function ReviewerFindManyProjectInputSchema(): z.ZodObject<Properties<ReviewerFindManyProjectInput>> {
  return z.object({
    communityId: z.string().nullish(),
    limit: z.number().nullish(),
    page: z.number().nullish(),
    search: z.string().nullish(),
    status: ProjectStatusSchema.nullish(),
  })
}

export function ReviewerFindManyReviewByProjectInputSchema(): z.ZodObject<
  Properties<ReviewerFindManyReviewByProjectInput>
> {
  return z.object({
    projectId: z.string(),
    search: z.string().nullish(),
  })
}

export function ReviewerFindManyReviewByUsernameInputSchema(): z.ZodObject<
  Properties<ReviewerFindManyReviewByUsernameInput>
> {
  return z.object({
    search: z.string().nullish(),
    username: z.string(),
  })
}

export function UserCreateCommentInputSchema(): z.ZodObject<Properties<UserCreateCommentInput>> {
  return z.object({
    content: z.string(),
    parentId: z.string().nullish(),
    reviewId: z.string(),
  })
}

export function UserCreateRatingInputSchema(): z.ZodObject<Properties<UserCreateRatingInput>> {
  return z.object({
    commentId: z.string(),
    content: z.string().nullish(),
    rating: z.number(),
  })
}

export function UserFindManyCommentInputSchema(): z.ZodObject<Properties<UserFindManyCommentInput>> {
  return z.object({
    reviewId: z.string(),
    search: z.string().nullish(),
  })
}

export function UserFindManyCommunityInputSchema(): z.ZodObject<Properties<UserFindManyCommunityInput>> {
  return z.object({
    limit: z.number().nullish(),
    page: z.number().nullish(),
    search: z.string().nullish(),
  })
}

export function UserFindManyIdentityInputSchema(): z.ZodObject<Properties<UserFindManyIdentityInput>> {
  return z.object({
    username: z.string(),
  })
}

export function UserFindManyRatingInputSchema(): z.ZodObject<Properties<UserFindManyRatingInput>> {
  return z.object({
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

export function UserUpdateRatingInputSchema(): z.ZodObject<Properties<UserUpdateRatingInput>> {
  return z.object({
    content: z.string().nullish(),
    rating: z.number().nullish(),
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
