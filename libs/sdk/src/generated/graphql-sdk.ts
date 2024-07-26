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
  durationDays?: InputMaybe<Scalars['Int']['input']>
  instructions?: InputMaybe<Scalars['String']['input']>
  linkDiscord?: InputMaybe<Scalars['String']['input']>
  linkGithub?: InputMaybe<Scalars['String']['input']>
  linkTelegram?: InputMaybe<Scalars['String']['input']>
  linkTwitter?: InputMaybe<Scalars['String']['input']>
  linkWebsite?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  reviewsOpen?: InputMaybe<Scalars['Boolean']['input']>
  startDate?: InputMaybe<Scalars['DateTime']['input']>
  status?: InputMaybe<ProjectStatus>
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
  solanaMainnetUrl: Scalars['String']['output']
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
  ratingAverage?: Maybe<Scalars['Float']['output']>
  ratings?: Maybe<Array<Rating>>
  review?: Maybe<Review>
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
  managerCount?: Maybe<Scalars['Int']['output']>
  managers?: Maybe<Array<CommunityManager>>
  name: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  viewUrl: Scalars['String']['output']
}

export type CommunityManager = {
  __typename?: 'CommunityManager'
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

export type FaqItem = {
  __typename?: 'FaqItem'
  answer: Scalars['String']['output']
  createdAt?: Maybe<Scalars['DateTime']['output']>
  id: Scalars['String']['output']
  order?: Maybe<Scalars['Int']['output']>
  question: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type FaqItemAdminCreateInput = {
  question: Scalars['String']['input']
}

export type FaqItemAdminFindManyInput = {
  search?: InputMaybe<Scalars['String']['input']>
}

export type FaqItemAdminUpdateInput = {
  answer?: InputMaybe<Scalars['String']['input']>
  order?: InputMaybe<Scalars['Int']['input']>
  question?: InputMaybe<Scalars['String']['input']>
}

export type FaqItemUserFindManyInput = {
  search?: InputMaybe<Scalars['String']['input']>
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

export type ManagerCreateRatingInput = {
  commentId: Scalars['String']['input']
  content?: InputMaybe<Scalars['String']['input']>
  rating: Scalars['Float']['input']
}

export type ManagerFindManyCommentInput = {
  projectId: Scalars['String']['input']
  search?: InputMaybe<Scalars['String']['input']>
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

export type ManagerFindManyReviewByProjectInput = {
  projectId: Scalars['String']['input']
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
  durationDays?: InputMaybe<Scalars['Int']['input']>
  instructions?: InputMaybe<Scalars['String']['input']>
  linkDiscord?: InputMaybe<Scalars['String']['input']>
  linkGithub?: InputMaybe<Scalars['String']['input']>
  linkTelegram?: InputMaybe<Scalars['String']['input']>
  linkTwitter?: InputMaybe<Scalars['String']['input']>
  linkWebsite?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  referralId?: InputMaybe<Scalars['String']['input']>
  reviewsOpen?: InputMaybe<Scalars['Boolean']['input']>
  startDate?: InputMaybe<Scalars['DateTime']['input']>
}

export type ManagerUpdateRatingInput = {
  content?: InputMaybe<Scalars['String']['input']>
  rating?: InputMaybe<Scalars['Float']['input']>
}

export type Mutation = {
  __typename?: 'Mutation'
  adminAddCommunityManager?: Maybe<Scalars['Boolean']['output']>
  adminAddProjectManager?: Maybe<Scalars['Boolean']['output']>
  adminAddProjectReferral?: Maybe<Scalars['Boolean']['output']>
  adminAddProjectReviewer?: Maybe<Scalars['Boolean']['output']>
  adminCreateCommunityChannel: Scalars['Boolean']['output']
  adminCreateFaqItem?: Maybe<FaqItem>
  adminCreateIdentity?: Maybe<Identity>
  adminCreateProjectChannel: Scalars['Boolean']['output']
  adminCreateUser?: Maybe<User>
  adminDeleteComment?: Maybe<Scalars['Boolean']['output']>
  adminDeleteCommunity?: Maybe<Scalars['Boolean']['output']>
  adminDeleteCommunityChannel: Scalars['Boolean']['output']
  adminDeleteFaqItem?: Maybe<Scalars['Boolean']['output']>
  adminDeleteIdentity?: Maybe<Scalars['Boolean']['output']>
  adminDeleteProject?: Maybe<Scalars['Boolean']['output']>
  adminDeleteProjectChannel: Scalars['Boolean']['output']
  adminDeleteRating?: Maybe<Scalars['Boolean']['output']>
  adminDeleteReview?: Maybe<Scalars['Boolean']['output']>
  adminDeleteUser?: Maybe<Scalars['Boolean']['output']>
  adminLeaveDiscordServer: Scalars['Boolean']['output']
  adminPingDiscordChannel: Scalars['Boolean']['output']
  adminRemoveCommunityManager?: Maybe<Scalars['Boolean']['output']>
  adminRemoveProjectManager?: Maybe<Scalars['Boolean']['output']>
  adminRemoveProjectReferral?: Maybe<Scalars['Boolean']['output']>
  adminRemoveProjectReviewer?: Maybe<Scalars['Boolean']['output']>
  adminToggleCommunityAdmin?: Maybe<Scalars['Boolean']['output']>
  adminUpdateComment?: Maybe<Comment>
  adminUpdateCommunity?: Maybe<Community>
  adminUpdateDiscordServer: Scalars['Boolean']['output']
  adminUpdateFaqItem?: Maybe<FaqItem>
  adminUpdateProject?: Maybe<Project>
  adminUpdateRating?: Maybe<Rating>
  adminUpdateUser?: Maybe<User>
  anonVerifyIdentityChallenge?: Maybe<IdentityChallenge>
  login?: Maybe<User>
  logout?: Maybe<Scalars['Boolean']['output']>
  managerAddCommunityManager?: Maybe<Scalars['Boolean']['output']>
  managerAddProjectManager?: Maybe<Scalars['Boolean']['output']>
  managerAddProjectReferral?: Maybe<Scalars['Boolean']['output']>
  managerAddProjectReviewer?: Maybe<Scalars['Boolean']['output']>
  managerCreateCommunity?: Maybe<Community>
  managerCreateProject?: Maybe<Project>
  managerCreateRating?: Maybe<Rating>
  managerDeleteCommunity?: Maybe<Scalars['Boolean']['output']>
  managerDeleteProject?: Maybe<Scalars['Boolean']['output']>
  managerDeleteRating?: Maybe<Scalars['Boolean']['output']>
  managerRemoveCommunityManager?: Maybe<Scalars['Boolean']['output']>
  managerRemoveProjectManager?: Maybe<Scalars['Boolean']['output']>
  managerRemoveProjectReferral?: Maybe<Scalars['Boolean']['output']>
  managerRemoveProjectReviewer?: Maybe<Scalars['Boolean']['output']>
  managerToggleCommunityAdmin?: Maybe<Scalars['Boolean']['output']>
  managerUpdateCommunity?: Maybe<Community>
  managerUpdateProject?: Maybe<Project>
  managerUpdateProjectStatus?: Maybe<Project>
  managerUpdateRating?: Maybe<Rating>
  register?: Maybe<User>
  reviewerCreateComment?: Maybe<Comment>
  reviewerCreateReview?: Maybe<Review>
  reviewerDeleteComment?: Maybe<Scalars['Boolean']['output']>
  reviewerDeleteReview?: Maybe<Scalars['Boolean']['output']>
  reviewerUpdateComment?: Maybe<Comment>
  userDeleteIdentity?: Maybe<Scalars['Boolean']['output']>
  userLinkIdentity?: Maybe<Identity>
  userSetPrimaryIdentity?: Maybe<Identity>
  userUpdateUser?: Maybe<User>
  userVerifyIdentityChallenge?: Maybe<IdentityChallenge>
}

export type MutationAdminAddCommunityManagerArgs = {
  communityId: Scalars['String']['input']
  userId: Scalars['String']['input']
}

export type MutationAdminAddProjectManagerArgs = {
  managerUserId: Scalars['String']['input']
  projectId: Scalars['String']['input']
}

export type MutationAdminAddProjectReferralArgs = {
  projectId: Scalars['String']['input']
  referralUserId: Scalars['String']['input']
}

export type MutationAdminAddProjectReviewerArgs = {
  projectId: Scalars['String']['input']
  reviewerUserId: Scalars['String']['input']
}

export type MutationAdminCreateCommunityChannelArgs = {
  channelId: Scalars['String']['input']
  communityId: Scalars['String']['input']
  serverId: Scalars['String']['input']
}

export type MutationAdminCreateFaqItemArgs = {
  input: FaqItemAdminCreateInput
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

export type MutationAdminDeleteFaqItemArgs = {
  faqItemId: Scalars['String']['input']
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

export type MutationAdminRemoveCommunityManagerArgs = {
  communityId: Scalars['String']['input']
  userId: Scalars['String']['input']
}

export type MutationAdminRemoveProjectManagerArgs = {
  managerUserId: Scalars['String']['input']
  projectId: Scalars['String']['input']
}

export type MutationAdminRemoveProjectReferralArgs = {
  projectId: Scalars['String']['input']
  referralUserId: Scalars['String']['input']
}

export type MutationAdminRemoveProjectReviewerArgs = {
  projectId: Scalars['String']['input']
  reviewerUserId: Scalars['String']['input']
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

export type MutationAdminUpdateFaqItemArgs = {
  faqItemId: Scalars['String']['input']
  input: FaqItemAdminUpdateInput
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

export type MutationManagerAddCommunityManagerArgs = {
  communityId: Scalars['String']['input']
  userId: Scalars['String']['input']
}

export type MutationManagerAddProjectManagerArgs = {
  managerUserId: Scalars['String']['input']
  projectId: Scalars['String']['input']
}

export type MutationManagerAddProjectReferralArgs = {
  projectId: Scalars['String']['input']
  referralUserId: Scalars['String']['input']
}

export type MutationManagerAddProjectReviewerArgs = {
  projectId: Scalars['String']['input']
  reviewerUserId: Scalars['String']['input']
}

export type MutationManagerCreateCommunityArgs = {
  input: ManagerCreateCommunityInput
}

export type MutationManagerCreateProjectArgs = {
  input: ManagerCreateProjectInput
}

export type MutationManagerCreateRatingArgs = {
  input: ManagerCreateRatingInput
}

export type MutationManagerDeleteCommunityArgs = {
  communityId: Scalars['String']['input']
}

export type MutationManagerDeleteProjectArgs = {
  projectId: Scalars['String']['input']
}

export type MutationManagerDeleteRatingArgs = {
  ratingId: Scalars['String']['input']
}

export type MutationManagerRemoveCommunityManagerArgs = {
  communityId: Scalars['String']['input']
  userId: Scalars['String']['input']
}

export type MutationManagerRemoveProjectManagerArgs = {
  managerUserId: Scalars['String']['input']
  projectId: Scalars['String']['input']
}

export type MutationManagerRemoveProjectReferralArgs = {
  projectId: Scalars['String']['input']
  referralUserId: Scalars['String']['input']
}

export type MutationManagerRemoveProjectReviewerArgs = {
  projectId: Scalars['String']['input']
  reviewerUserId: Scalars['String']['input']
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

export type MutationManagerUpdateProjectStatusArgs = {
  projectId: Scalars['String']['input']
  status: ProjectStatus
}

export type MutationManagerUpdateRatingArgs = {
  input: ManagerUpdateRatingInput
  ratingId: Scalars['String']['input']
}

export type MutationRegisterArgs = {
  input: RegisterInput
}

export type MutationReviewerCreateCommentArgs = {
  input: ReviewerCreateCommentInput
}

export type MutationReviewerCreateReviewArgs = {
  projectId: Scalars['String']['input']
}

export type MutationReviewerDeleteCommentArgs = {
  commentId: Scalars['String']['input']
}

export type MutationReviewerDeleteReviewArgs = {
  reviewId: Scalars['String']['input']
}

export type MutationReviewerUpdateCommentArgs = {
  commentId: Scalars['String']['input']
  input: ReviewerUpdateCommentInput
}

export type MutationUserDeleteIdentityArgs = {
  identityId: Scalars['String']['input']
}

export type MutationUserLinkIdentityArgs = {
  input: LinkIdentityInput
}

export type MutationUserSetPrimaryIdentityArgs = {
  identityId: Scalars['String']['input']
}

export type MutationUserUpdateUserArgs = {
  input: UserUpdateUserInput
}

export type MutationUserVerifyIdentityChallengeArgs = {
  input: VerifyIdentityChallengeInput
}

export enum OrderDirection {
  Asc = 'Asc',
  Desc = 'Desc',
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
  durationDays?: Maybe<Scalars['Int']['output']>
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
  message?: Maybe<ProjectMessage>
  name: Scalars['String']['output']
  referral?: Maybe<User>
  remainingDays?: Maybe<Scalars['Int']['output']>
  reviewCount?: Maybe<Scalars['Int']['output']>
  reviewers?: Maybe<Array<User>>
  reviewsOpen?: Maybe<Scalars['Boolean']['output']>
  slug: Scalars['String']['output']
  startDate?: Maybe<Scalars['DateTime']['output']>
  status?: Maybe<ProjectStatus>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  viewUrl: Scalars['String']['output']
}

export type ProjectMessage = {
  __typename?: 'ProjectMessage'
  message?: Maybe<Scalars['String']['output']>
  nextStatus?: Maybe<ProjectStatus>
}

export enum ProjectOrderBy {
  Amount = 'Amount',
  CreatedAt = 'CreatedAt',
  EndDate = 'EndDate',
}

export type ProjectPaging = {
  __typename?: 'ProjectPaging'
  data: Array<Project>
  meta: PagingMeta
}

export enum ProjectStatus {
  Active = 'Active',
  Closed = 'Closed',
  Draft = 'Draft',
}

export type Query = {
  __typename?: 'Query'
  adminFindManyComment?: Maybe<Array<Comment>>
  adminFindManyCommunity: CommunityPaging
  adminFindManyFaqItem: Array<FaqItem>
  adminFindManyIdentity?: Maybe<Array<Identity>>
  adminFindManyProject: ProjectPaging
  adminFindManyRating: Array<Rating>
  adminFindManyReview: ReviewPaging
  adminFindManyUser: UserPaging
  adminFindOneCommunity?: Maybe<Community>
  adminFindOneFaqItem?: Maybe<FaqItem>
  adminFindOneProject?: Maybe<Project>
  adminFindOneReview?: Maybe<Review>
  adminFindOneUser?: Maybe<User>
  adminGetCommunityChannels: Array<DiscordChannel>
  adminGetCommunityManagers?: Maybe<Array<CommunityManager>>
  adminGetDiscordBot: DiscordBot
  adminGetDiscordChannels: Array<DiscordChannel>
  adminGetDiscordRoles: Array<DiscordRole>
  adminGetDiscordServers: Array<DiscordServer>
  adminGetProjectChannels: Array<DiscordChannel>
  anonRequestIdentityChallenge?: Maybe<IdentityChallenge>
  appConfig: AppConfig
  managerFindManyComment?: Maybe<Array<Comment>>
  managerFindManyCommunity: CommunityPaging
  managerFindManyProject: ProjectPaging
  managerFindManyReviewByProject?: Maybe<Array<Review>>
  managerFindOneCommunity?: Maybe<Community>
  managerFindOneProject?: Maybe<Project>
  managerGetCommunityManager?: Maybe<CommunityManager>
  managerGetCommunityManagers?: Maybe<Array<CommunityManager>>
  me?: Maybe<User>
  reviewerFindManyComment?: Maybe<Array<Comment>>
  reviewerFindManyProject: ProjectPaging
  reviewerFindManyReviewByProject?: Maybe<Array<Review>>
  reviewerFindManyReviewByUsername?: Maybe<Array<Review>>
  reviewerFindOneProject?: Maybe<Project>
  reviewerFindOneReview?: Maybe<Review>
  reviewerFindUserProjectReview?: Maybe<Review>
  uptime: Scalars['Float']['output']
  userFindManyCommunity: CommunityPaging
  userFindManyFaqItem: Array<FaqItem>
  userFindManyIdentity?: Maybe<Array<Identity>>
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

export type QueryAdminFindManyFaqItemArgs = {
  input: FaqItemAdminFindManyInput
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

export type QueryAdminFindOneFaqItemArgs = {
  faqItemId: Scalars['String']['input']
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

export type QueryAdminGetCommunityManagersArgs = {
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

export type QueryManagerFindManyCommentArgs = {
  input: ManagerFindManyCommentInput
}

export type QueryManagerFindManyCommunityArgs = {
  input: ManagerFindManyCommunityInput
}

export type QueryManagerFindManyProjectArgs = {
  input: ManagerFindManyProjectInput
}

export type QueryManagerFindManyReviewByProjectArgs = {
  input: ManagerFindManyReviewByProjectInput
}

export type QueryManagerFindOneCommunityArgs = {
  communityId: Scalars['String']['input']
}

export type QueryManagerFindOneProjectArgs = {
  projectId: Scalars['String']['input']
}

export type QueryManagerGetCommunityManagerArgs = {
  communityId: Scalars['String']['input']
}

export type QueryManagerGetCommunityManagersArgs = {
  communityId: Scalars['String']['input']
}

export type QueryReviewerFindManyCommentArgs = {
  input: ReviewerFindManyCommentInput
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

export type QueryUserFindManyCommunityArgs = {
  input: UserFindManyCommunityInput
}

export type QueryUserFindManyFaqItemArgs = {
  input: FaqItemUserFindManyInput
}

export type QueryUserFindManyIdentityArgs = {
  input: UserFindManyIdentityInput
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
  author?: Maybe<User>
  authorId: Scalars['String']['output']
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
  ratingAverage?: Maybe<Scalars['Float']['output']>
  ratingProgress?: Maybe<Scalars['Float']['output']>
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

export type ReviewerCreateCommentInput = {
  content: Scalars['String']['input']
  parentId?: InputMaybe<Scalars['String']['input']>
  reviewId: Scalars['String']['input']
  versionBrowser?: InputMaybe<Scalars['String']['input']>
  versionOs?: InputMaybe<Scalars['String']['input']>
}

export type ReviewerFindManyCommentInput = {
  reviewId: Scalars['String']['input']
  search?: InputMaybe<Scalars['String']['input']>
}

export type ReviewerFindManyProjectInput = {
  communityId?: InputMaybe<Scalars['String']['input']>
  limit?: InputMaybe<Scalars['Int']['input']>
  mineOnly?: InputMaybe<Scalars['Boolean']['input']>
  orderBy?: InputMaybe<ProjectOrderBy>
  orderDirection?: InputMaybe<OrderDirection>
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

export type ReviewerUpdateCommentInput = {
  content?: InputMaybe<Scalars['String']['input']>
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

export type UserFindManyCommunityInput = {
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type UserFindManyIdentityInput = {
  username: Scalars['String']['input']
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
  ratingAverage?: number | null
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

export type ReviewerFindManyCommentQueryVariables = Exact<{
  input: ReviewerFindManyCommentInput
}>

export type ReviewerFindManyCommentQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Comment'
    authorId: string
    category: CommentCategory
    content: string
    createdAt?: Date | null
    id: string
    parentId?: string | null
    ratingAverage?: number | null
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
      ratingAverage?: number | null
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

export type ReviewerCreateCommentMutationVariables = Exact<{
  input: ReviewerCreateCommentInput
}>

export type ReviewerCreateCommentMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Comment'
    authorId: string
    category: CommentCategory
    content: string
    createdAt?: Date | null
    id: string
    parentId?: string | null
    ratingAverage?: number | null
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

export type ReviewerUpdateCommentMutationVariables = Exact<{
  commentId: Scalars['String']['input']
  input: ReviewerUpdateCommentInput
}>

export type ReviewerUpdateCommentMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'Comment'
    authorId: string
    category: CommentCategory
    content: string
    createdAt?: Date | null
    id: string
    parentId?: string | null
    ratingAverage?: number | null
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

export type ReviewerDeleteCommentMutationVariables = Exact<{
  commentId: Scalars['String']['input']
}>

export type ReviewerDeleteCommentMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

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
    ratingAverage?: number | null
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
      ratingAverage?: number | null
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
    ratingAverage?: number | null
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

export type ManagerFindManyCommentQueryVariables = Exact<{
  input: ManagerFindManyCommentInput
}>

export type ManagerFindManyCommentQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Comment'
    authorId: string
    category: CommentCategory
    content: string
    createdAt?: Date | null
    id: string
    parentId?: string | null
    ratingAverage?: number | null
    reviewId: string
    updatedAt?: Date | null
    versionBrowser?: string | null
    versionOs?: string | null
    ratings?: Array<{
      __typename?: 'Rating'
      createdAt?: Date | null
      id: string
      content?: string | null
      commentId: string
      authorId: string
      rating: number
      updatedAt?: Date | null
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
    review?: {
      __typename?: 'Review'
      createdAt?: Date | null
      id: string
      projectId: string
      reviewerId: string
      updatedAt?: Date | null
      name: string
      ratingAverage?: number | null
      ratingProgress?: number | null
      viewUrl: string
      project?: {
        __typename?: 'Project'
        amountManagerUsd?: number | null
        amountReferralUsd?: number | null
        amountTotalUsd?: number | null
        avatarUrl?: string | null
        communityId: string
        createdAt?: Date | null
        durationDays?: number | null
        endDate?: Date | null
        id: string
        instructions?: string | null
        linkDiscord?: string | null
        linkGithub?: string | null
        linkTelegram?: string | null
        linkTwitter?: string | null
        linkWebsite?: string | null
        manageUrl: string
        name: string
        remainingDays?: number | null
        reviewCount?: number | null
        reviewsOpen?: boolean | null
        slug: string
        startDate?: Date | null
        status?: ProjectStatus | null
        updatedAt?: Date | null
        viewUrl: string
        community?: {
          __typename?: 'Community'
          activeProjectsCount?: number | null
          avatarUrl?: string | null
          createdAt?: Date | null
          homeServerId?: string | null
          id: string
          managerCount?: number | null
          manageUrl: string
          name: string
          updatedAt?: Date | null
          viewUrl: string
          managers?: Array<{
            __typename?: 'CommunityManager'
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
    children?: Array<{
      __typename?: 'Comment'
      authorId: string
      category: CommentCategory
      content: string
      createdAt?: Date | null
      id: string
      parentId?: string | null
      ratingAverage?: number | null
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

export type CommunityDetailsFragment = {
  __typename?: 'Community'
  activeProjectsCount?: number | null
  avatarUrl?: string | null
  createdAt?: Date | null
  homeServerId?: string | null
  id: string
  managerCount?: number | null
  manageUrl: string
  name: string
  updatedAt?: Date | null
  viewUrl: string
  managers?: Array<{
    __typename?: 'CommunityManager'
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

export type CommunityManagerDetailsFragment = {
  __typename?: 'CommunityManager'
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
      managerCount?: number | null
      manageUrl: string
      name: string
      updatedAt?: Date | null
      viewUrl: string
      managers?: Array<{
        __typename?: 'CommunityManager'
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
    managerCount?: number | null
    manageUrl: string
    name: string
    updatedAt?: Date | null
    viewUrl: string
    managers?: Array<{
      __typename?: 'CommunityManager'
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

export type ManagerGetCommunityManagersQueryVariables = Exact<{
  communityId: Scalars['String']['input']
}>

export type ManagerGetCommunityManagersQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'CommunityManager'
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

export type ManagerGetCommunityManagerQueryVariables = Exact<{
  communityId: Scalars['String']['input']
}>

export type ManagerGetCommunityManagerQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'CommunityManager'
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
      managerCount?: number | null
      manageUrl: string
      name: string
      updatedAt?: Date | null
      viewUrl: string
      managers?: Array<{
        __typename?: 'CommunityManager'
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
    managerCount?: number | null
    manageUrl: string
    name: string
    updatedAt?: Date | null
    viewUrl: string
    managers?: Array<{
      __typename?: 'CommunityManager'
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
    managerCount?: number | null
    manageUrl: string
    name: string
    updatedAt?: Date | null
    viewUrl: string
    managers?: Array<{
      __typename?: 'CommunityManager'
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
    managerCount?: number | null
    manageUrl: string
    name: string
    updatedAt?: Date | null
    viewUrl: string
    managers?: Array<{
      __typename?: 'CommunityManager'
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
      managerCount?: number | null
      manageUrl: string
      name: string
      updatedAt?: Date | null
      viewUrl: string
      managers?: Array<{
        __typename?: 'CommunityManager'
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

export type AdminGetCommunityManagersQueryVariables = Exact<{
  communityId: Scalars['String']['input']
}>

export type AdminGetCommunityManagersQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'CommunityManager'
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
    managerCount?: number | null
    manageUrl: string
    name: string
    updatedAt?: Date | null
    viewUrl: string
    managers?: Array<{
      __typename?: 'CommunityManager'
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
    managerCount?: number | null
    manageUrl: string
    name: string
    updatedAt?: Date | null
    viewUrl: string
    managers?: Array<{
      __typename?: 'CommunityManager'
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

export type AdminAddCommunityManagerMutationVariables = Exact<{
  communityId: Scalars['String']['input']
  userId: Scalars['String']['input']
}>

export type AdminAddCommunityManagerMutation = { __typename?: 'Mutation'; added?: boolean | null }

export type AdminRemoveCommunityManagerMutationVariables = Exact<{
  communityId: Scalars['String']['input']
  userId: Scalars['String']['input']
}>

export type AdminRemoveCommunityManagerMutation = { __typename?: 'Mutation'; removed?: boolean | null }

export type AdminToggleCommunityAdminMutationVariables = Exact<{
  communityId: Scalars['String']['input']
  userId: Scalars['String']['input']
}>

export type AdminToggleCommunityAdminMutation = { __typename?: 'Mutation'; toggled?: boolean | null }

export type ManagerAddCommunityManagerMutationVariables = Exact<{
  communityId: Scalars['String']['input']
  userId: Scalars['String']['input']
}>

export type ManagerAddCommunityManagerMutation = { __typename?: 'Mutation'; added?: boolean | null }

export type ManagerRemoveCommunityManagerMutationVariables = Exact<{
  communityId: Scalars['String']['input']
  userId: Scalars['String']['input']
}>

export type ManagerRemoveCommunityManagerMutation = { __typename?: 'Mutation'; removed?: boolean | null }

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
  solanaMainnetUrl: string
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
    solanaMainnetUrl: string
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

export type FaqItemDetailsFragment = {
  __typename?: 'FaqItem'
  createdAt?: Date | null
  id: string
  question: string
  answer: string
  order?: number | null
  updatedAt?: Date | null
}

export type AdminFindManyFaqItemQueryVariables = Exact<{
  input: FaqItemAdminFindManyInput
}>

export type AdminFindManyFaqItemQuery = {
  __typename?: 'Query'
  items: Array<{
    __typename?: 'FaqItem'
    createdAt?: Date | null
    id: string
    question: string
    answer: string
    order?: number | null
    updatedAt?: Date | null
  }>
}

export type AdminFindOneFaqItemQueryVariables = Exact<{
  faqItemId: Scalars['String']['input']
}>

export type AdminFindOneFaqItemQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'FaqItem'
    createdAt?: Date | null
    id: string
    question: string
    answer: string
    order?: number | null
    updatedAt?: Date | null
  } | null
}

export type AdminCreateFaqItemMutationVariables = Exact<{
  input: FaqItemAdminCreateInput
}>

export type AdminCreateFaqItemMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'FaqItem'
    createdAt?: Date | null
    id: string
    question: string
    answer: string
    order?: number | null
    updatedAt?: Date | null
  } | null
}

export type AdminUpdateFaqItemMutationVariables = Exact<{
  faqItemId: Scalars['String']['input']
  input: FaqItemAdminUpdateInput
}>

export type AdminUpdateFaqItemMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'FaqItem'
    createdAt?: Date | null
    id: string
    question: string
    answer: string
    order?: number | null
    updatedAt?: Date | null
  } | null
}

export type AdminDeleteFaqItemMutationVariables = Exact<{
  faqItemId: Scalars['String']['input']
}>

export type AdminDeleteFaqItemMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type UserFindManyFaqItemQueryVariables = Exact<{
  input: FaqItemUserFindManyInput
}>

export type UserFindManyFaqItemQuery = {
  __typename?: 'Query'
  items: Array<{
    __typename?: 'FaqItem'
    createdAt?: Date | null
    id: string
    question: string
    answer: string
    order?: number | null
    updatedAt?: Date | null
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
  durationDays?: number | null
  endDate?: Date | null
  id: string
  instructions?: string | null
  linkDiscord?: string | null
  linkGithub?: string | null
  linkTelegram?: string | null
  linkTwitter?: string | null
  linkWebsite?: string | null
  manageUrl: string
  name: string
  remainingDays?: number | null
  reviewCount?: number | null
  reviewsOpen?: boolean | null
  slug: string
  startDate?: Date | null
  status?: ProjectStatus | null
  updatedAt?: Date | null
  viewUrl: string
  community?: {
    __typename?: 'Community'
    activeProjectsCount?: number | null
    avatarUrl?: string | null
    createdAt?: Date | null
    homeServerId?: string | null
    id: string
    managerCount?: number | null
    manageUrl: string
    name: string
    updatedAt?: Date | null
    viewUrl: string
    managers?: Array<{
      __typename?: 'CommunityManager'
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
      durationDays?: number | null
      endDate?: Date | null
      id: string
      instructions?: string | null
      linkDiscord?: string | null
      linkGithub?: string | null
      linkTelegram?: string | null
      linkTwitter?: string | null
      linkWebsite?: string | null
      manageUrl: string
      name: string
      remainingDays?: number | null
      reviewCount?: number | null
      reviewsOpen?: boolean | null
      slug: string
      startDate?: Date | null
      status?: ProjectStatus | null
      updatedAt?: Date | null
      viewUrl: string
      community?: {
        __typename?: 'Community'
        activeProjectsCount?: number | null
        avatarUrl?: string | null
        createdAt?: Date | null
        homeServerId?: string | null
        id: string
        managerCount?: number | null
        manageUrl: string
        name: string
        updatedAt?: Date | null
        viewUrl: string
        managers?: Array<{
          __typename?: 'CommunityManager'
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
    durationDays?: number | null
    endDate?: Date | null
    id: string
    instructions?: string | null
    linkDiscord?: string | null
    linkGithub?: string | null
    linkTelegram?: string | null
    linkTwitter?: string | null
    linkWebsite?: string | null
    manageUrl: string
    name: string
    remainingDays?: number | null
    reviewCount?: number | null
    reviewsOpen?: boolean | null
    slug: string
    startDate?: Date | null
    status?: ProjectStatus | null
    updatedAt?: Date | null
    viewUrl: string
    community?: {
      __typename?: 'Community'
      activeProjectsCount?: number | null
      avatarUrl?: string | null
      createdAt?: Date | null
      homeServerId?: string | null
      id: string
      managerCount?: number | null
      manageUrl: string
      name: string
      updatedAt?: Date | null
      viewUrl: string
      managers?: Array<{
        __typename?: 'CommunityManager'
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
      durationDays?: number | null
      endDate?: Date | null
      id: string
      instructions?: string | null
      linkDiscord?: string | null
      linkGithub?: string | null
      linkTelegram?: string | null
      linkTwitter?: string | null
      linkWebsite?: string | null
      manageUrl: string
      name: string
      remainingDays?: number | null
      reviewCount?: number | null
      reviewsOpen?: boolean | null
      slug: string
      startDate?: Date | null
      status?: ProjectStatus | null
      updatedAt?: Date | null
      viewUrl: string
      community?: {
        __typename?: 'Community'
        activeProjectsCount?: number | null
        avatarUrl?: string | null
        createdAt?: Date | null
        homeServerId?: string | null
        id: string
        managerCount?: number | null
        manageUrl: string
        name: string
        updatedAt?: Date | null
        viewUrl: string
        managers?: Array<{
          __typename?: 'CommunityManager'
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
    durationDays?: number | null
    endDate?: Date | null
    id: string
    instructions?: string | null
    linkDiscord?: string | null
    linkGithub?: string | null
    linkTelegram?: string | null
    linkTwitter?: string | null
    linkWebsite?: string | null
    manageUrl: string
    name: string
    remainingDays?: number | null
    reviewCount?: number | null
    reviewsOpen?: boolean | null
    slug: string
    startDate?: Date | null
    status?: ProjectStatus | null
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
    reviewers?: Array<{
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
      managerCount?: number | null
      manageUrl: string
      name: string
      updatedAt?: Date | null
      viewUrl: string
      managers?: Array<{
        __typename?: 'CommunityManager'
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
    durationDays?: number | null
    endDate?: Date | null
    id: string
    instructions?: string | null
    linkDiscord?: string | null
    linkGithub?: string | null
    linkTelegram?: string | null
    linkTwitter?: string | null
    linkWebsite?: string | null
    manageUrl: string
    name: string
    remainingDays?: number | null
    reviewCount?: number | null
    reviewsOpen?: boolean | null
    slug: string
    startDate?: Date | null
    status?: ProjectStatus | null
    updatedAt?: Date | null
    viewUrl: string
    community?: {
      __typename?: 'Community'
      activeProjectsCount?: number | null
      avatarUrl?: string | null
      createdAt?: Date | null
      homeServerId?: string | null
      id: string
      managerCount?: number | null
      manageUrl: string
      name: string
      updatedAt?: Date | null
      viewUrl: string
      managers?: Array<{
        __typename?: 'CommunityManager'
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

export type AdminAddProjectReviewerMutationVariables = Exact<{
  projectId: Scalars['String']['input']
  reviewerUserId: Scalars['String']['input']
}>

export type AdminAddProjectReviewerMutation = { __typename?: 'Mutation'; added?: boolean | null }

export type AdminRemoveProjectReviewerMutationVariables = Exact<{
  projectId: Scalars['String']['input']
  reviewerUserId: Scalars['String']['input']
}>

export type AdminRemoveProjectReviewerMutation = { __typename?: 'Mutation'; removed?: boolean | null }

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
      durationDays?: number | null
      endDate?: Date | null
      id: string
      instructions?: string | null
      linkDiscord?: string | null
      linkGithub?: string | null
      linkTelegram?: string | null
      linkTwitter?: string | null
      linkWebsite?: string | null
      manageUrl: string
      name: string
      remainingDays?: number | null
      reviewCount?: number | null
      reviewsOpen?: boolean | null
      slug: string
      startDate?: Date | null
      status?: ProjectStatus | null
      updatedAt?: Date | null
      viewUrl: string
      community?: {
        __typename?: 'Community'
        activeProjectsCount?: number | null
        avatarUrl?: string | null
        createdAt?: Date | null
        homeServerId?: string | null
        id: string
        managerCount?: number | null
        manageUrl: string
        name: string
        updatedAt?: Date | null
        viewUrl: string
        managers?: Array<{
          __typename?: 'CommunityManager'
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
    durationDays?: number | null
    endDate?: Date | null
    id: string
    instructions?: string | null
    linkDiscord?: string | null
    linkGithub?: string | null
    linkTelegram?: string | null
    linkTwitter?: string | null
    linkWebsite?: string | null
    manageUrl: string
    name: string
    remainingDays?: number | null
    reviewCount?: number | null
    reviewsOpen?: boolean | null
    slug: string
    startDate?: Date | null
    status?: ProjectStatus | null
    updatedAt?: Date | null
    viewUrl: string
    message?: { __typename?: 'ProjectMessage'; message?: string | null; nextStatus?: ProjectStatus | null } | null
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
    reviewers?: Array<{
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
      managerCount?: number | null
      manageUrl: string
      name: string
      updatedAt?: Date | null
      viewUrl: string
      managers?: Array<{
        __typename?: 'CommunityManager'
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
    durationDays?: number | null
    endDate?: Date | null
    id: string
    instructions?: string | null
    linkDiscord?: string | null
    linkGithub?: string | null
    linkTelegram?: string | null
    linkTwitter?: string | null
    linkWebsite?: string | null
    manageUrl: string
    name: string
    remainingDays?: number | null
    reviewCount?: number | null
    reviewsOpen?: boolean | null
    slug: string
    startDate?: Date | null
    status?: ProjectStatus | null
    updatedAt?: Date | null
    viewUrl: string
    community?: {
      __typename?: 'Community'
      activeProjectsCount?: number | null
      avatarUrl?: string | null
      createdAt?: Date | null
      homeServerId?: string | null
      id: string
      managerCount?: number | null
      manageUrl: string
      name: string
      updatedAt?: Date | null
      viewUrl: string
      managers?: Array<{
        __typename?: 'CommunityManager'
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
    durationDays?: number | null
    endDate?: Date | null
    id: string
    instructions?: string | null
    linkDiscord?: string | null
    linkGithub?: string | null
    linkTelegram?: string | null
    linkTwitter?: string | null
    linkWebsite?: string | null
    manageUrl: string
    name: string
    remainingDays?: number | null
    reviewCount?: number | null
    reviewsOpen?: boolean | null
    slug: string
    startDate?: Date | null
    status?: ProjectStatus | null
    updatedAt?: Date | null
    viewUrl: string
    community?: {
      __typename?: 'Community'
      activeProjectsCount?: number | null
      avatarUrl?: string | null
      createdAt?: Date | null
      homeServerId?: string | null
      id: string
      managerCount?: number | null
      manageUrl: string
      name: string
      updatedAt?: Date | null
      viewUrl: string
      managers?: Array<{
        __typename?: 'CommunityManager'
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

export type ManagerUpdateProjectStatusMutationVariables = Exact<{
  projectId: Scalars['String']['input']
  status: ProjectStatus
}>

export type ManagerUpdateProjectStatusMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'Project'
    amountManagerUsd?: number | null
    amountReferralUsd?: number | null
    amountTotalUsd?: number | null
    avatarUrl?: string | null
    communityId: string
    createdAt?: Date | null
    durationDays?: number | null
    endDate?: Date | null
    id: string
    instructions?: string | null
    linkDiscord?: string | null
    linkGithub?: string | null
    linkTelegram?: string | null
    linkTwitter?: string | null
    linkWebsite?: string | null
    manageUrl: string
    name: string
    remainingDays?: number | null
    reviewCount?: number | null
    reviewsOpen?: boolean | null
    slug: string
    startDate?: Date | null
    status?: ProjectStatus | null
    updatedAt?: Date | null
    viewUrl: string
    community?: {
      __typename?: 'Community'
      activeProjectsCount?: number | null
      avatarUrl?: string | null
      createdAt?: Date | null
      homeServerId?: string | null
      id: string
      managerCount?: number | null
      manageUrl: string
      name: string
      updatedAt?: Date | null
      viewUrl: string
      managers?: Array<{
        __typename?: 'CommunityManager'
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

export type ManagerAddProjectReviewerMutationVariables = Exact<{
  projectId: Scalars['String']['input']
  reviewerUserId: Scalars['String']['input']
}>

export type ManagerAddProjectReviewerMutation = { __typename?: 'Mutation'; added?: boolean | null }

export type ManagerRemoveProjectReviewerMutationVariables = Exact<{
  projectId: Scalars['String']['input']
  reviewerUserId: Scalars['String']['input']
}>

export type ManagerRemoveProjectReviewerMutation = { __typename?: 'Mutation'; removed?: boolean | null }

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
  authorId: string
  rating: number
  updatedAt?: Date | null
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

export type ManagerCreateRatingMutationVariables = Exact<{
  input: ManagerCreateRatingInput
}>

export type ManagerCreateRatingMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Rating'
    createdAt?: Date | null
    id: string
    content?: string | null
    commentId: string
    authorId: string
    rating: number
    updatedAt?: Date | null
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

export type ManagerUpdateRatingMutationVariables = Exact<{
  ratingId: Scalars['String']['input']
  input: ManagerUpdateRatingInput
}>

export type ManagerUpdateRatingMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'Rating'
    createdAt?: Date | null
    id: string
    content?: string | null
    commentId: string
    authorId: string
    rating: number
    updatedAt?: Date | null
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

export type ManagerDeleteRatingMutationVariables = Exact<{
  ratingId: Scalars['String']['input']
}>

export type ManagerDeleteRatingMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

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
    authorId: string
    rating: number
    updatedAt?: Date | null
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
    authorId: string
    rating: number
    updatedAt?: Date | null
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
  ratingAverage?: number | null
  ratingProgress?: number | null
  viewUrl: string
  project?: {
    __typename?: 'Project'
    amountManagerUsd?: number | null
    amountReferralUsd?: number | null
    amountTotalUsd?: number | null
    avatarUrl?: string | null
    communityId: string
    createdAt?: Date | null
    durationDays?: number | null
    endDate?: Date | null
    id: string
    instructions?: string | null
    linkDiscord?: string | null
    linkGithub?: string | null
    linkTelegram?: string | null
    linkTwitter?: string | null
    linkWebsite?: string | null
    manageUrl: string
    name: string
    remainingDays?: number | null
    reviewCount?: number | null
    reviewsOpen?: boolean | null
    slug: string
    startDate?: Date | null
    status?: ProjectStatus | null
    updatedAt?: Date | null
    viewUrl: string
    community?: {
      __typename?: 'Community'
      activeProjectsCount?: number | null
      avatarUrl?: string | null
      createdAt?: Date | null
      homeServerId?: string | null
      id: string
      managerCount?: number | null
      manageUrl: string
      name: string
      updatedAt?: Date | null
      viewUrl: string
      managers?: Array<{
        __typename?: 'CommunityManager'
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

export type ManagerFindManyReviewByProjectQueryVariables = Exact<{
  input: ManagerFindManyReviewByProjectInput
}>

export type ManagerFindManyReviewByProjectQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Review'
    createdAt?: Date | null
    id: string
    projectId: string
    reviewerId: string
    updatedAt?: Date | null
    name: string
    ratingAverage?: number | null
    ratingProgress?: number | null
    viewUrl: string
    project?: {
      __typename?: 'Project'
      amountManagerUsd?: number | null
      amountReferralUsd?: number | null
      amountTotalUsd?: number | null
      avatarUrl?: string | null
      communityId: string
      createdAt?: Date | null
      durationDays?: number | null
      endDate?: Date | null
      id: string
      instructions?: string | null
      linkDiscord?: string | null
      linkGithub?: string | null
      linkTelegram?: string | null
      linkTwitter?: string | null
      linkWebsite?: string | null
      manageUrl: string
      name: string
      remainingDays?: number | null
      reviewCount?: number | null
      reviewsOpen?: boolean | null
      slug: string
      startDate?: Date | null
      status?: ProjectStatus | null
      updatedAt?: Date | null
      viewUrl: string
      community?: {
        __typename?: 'Community'
        activeProjectsCount?: number | null
        avatarUrl?: string | null
        createdAt?: Date | null
        homeServerId?: string | null
        id: string
        managerCount?: number | null
        manageUrl: string
        name: string
        updatedAt?: Date | null
        viewUrl: string
        managers?: Array<{
          __typename?: 'CommunityManager'
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
    ratingAverage?: number | null
    ratingProgress?: number | null
    viewUrl: string
    project?: {
      __typename?: 'Project'
      amountManagerUsd?: number | null
      amountReferralUsd?: number | null
      amountTotalUsd?: number | null
      avatarUrl?: string | null
      communityId: string
      createdAt?: Date | null
      durationDays?: number | null
      endDate?: Date | null
      id: string
      instructions?: string | null
      linkDiscord?: string | null
      linkGithub?: string | null
      linkTelegram?: string | null
      linkTwitter?: string | null
      linkWebsite?: string | null
      manageUrl: string
      name: string
      remainingDays?: number | null
      reviewCount?: number | null
      reviewsOpen?: boolean | null
      slug: string
      startDate?: Date | null
      status?: ProjectStatus | null
      updatedAt?: Date | null
      viewUrl: string
      community?: {
        __typename?: 'Community'
        activeProjectsCount?: number | null
        avatarUrl?: string | null
        createdAt?: Date | null
        homeServerId?: string | null
        id: string
        managerCount?: number | null
        manageUrl: string
        name: string
        updatedAt?: Date | null
        viewUrl: string
        managers?: Array<{
          __typename?: 'CommunityManager'
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
    ratingAverage?: number | null
    ratingProgress?: number | null
    viewUrl: string
    project?: {
      __typename?: 'Project'
      amountManagerUsd?: number | null
      amountReferralUsd?: number | null
      amountTotalUsd?: number | null
      avatarUrl?: string | null
      communityId: string
      createdAt?: Date | null
      durationDays?: number | null
      endDate?: Date | null
      id: string
      instructions?: string | null
      linkDiscord?: string | null
      linkGithub?: string | null
      linkTelegram?: string | null
      linkTwitter?: string | null
      linkWebsite?: string | null
      manageUrl: string
      name: string
      remainingDays?: number | null
      reviewCount?: number | null
      reviewsOpen?: boolean | null
      slug: string
      startDate?: Date | null
      status?: ProjectStatus | null
      updatedAt?: Date | null
      viewUrl: string
      community?: {
        __typename?: 'Community'
        activeProjectsCount?: number | null
        avatarUrl?: string | null
        createdAt?: Date | null
        homeServerId?: string | null
        id: string
        managerCount?: number | null
        manageUrl: string
        name: string
        updatedAt?: Date | null
        viewUrl: string
        managers?: Array<{
          __typename?: 'CommunityManager'
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
    ratingAverage?: number | null
    ratingProgress?: number | null
    viewUrl: string
    project?: {
      __typename?: 'Project'
      amountManagerUsd?: number | null
      amountReferralUsd?: number | null
      amountTotalUsd?: number | null
      avatarUrl?: string | null
      communityId: string
      createdAt?: Date | null
      durationDays?: number | null
      endDate?: Date | null
      id: string
      instructions?: string | null
      linkDiscord?: string | null
      linkGithub?: string | null
      linkTelegram?: string | null
      linkTwitter?: string | null
      linkWebsite?: string | null
      manageUrl: string
      name: string
      remainingDays?: number | null
      reviewCount?: number | null
      reviewsOpen?: boolean | null
      slug: string
      startDate?: Date | null
      status?: ProjectStatus | null
      updatedAt?: Date | null
      viewUrl: string
      community?: {
        __typename?: 'Community'
        activeProjectsCount?: number | null
        avatarUrl?: string | null
        createdAt?: Date | null
        homeServerId?: string | null
        id: string
        managerCount?: number | null
        manageUrl: string
        name: string
        updatedAt?: Date | null
        viewUrl: string
        managers?: Array<{
          __typename?: 'CommunityManager'
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
    ratingAverage?: number | null
    ratingProgress?: number | null
    viewUrl: string
    project?: {
      __typename?: 'Project'
      amountManagerUsd?: number | null
      amountReferralUsd?: number | null
      amountTotalUsd?: number | null
      avatarUrl?: string | null
      communityId: string
      createdAt?: Date | null
      durationDays?: number | null
      endDate?: Date | null
      id: string
      instructions?: string | null
      linkDiscord?: string | null
      linkGithub?: string | null
      linkTelegram?: string | null
      linkTwitter?: string | null
      linkWebsite?: string | null
      manageUrl: string
      name: string
      remainingDays?: number | null
      reviewCount?: number | null
      reviewsOpen?: boolean | null
      slug: string
      startDate?: Date | null
      status?: ProjectStatus | null
      updatedAt?: Date | null
      viewUrl: string
      community?: {
        __typename?: 'Community'
        activeProjectsCount?: number | null
        avatarUrl?: string | null
        createdAt?: Date | null
        homeServerId?: string | null
        id: string
        managerCount?: number | null
        manageUrl: string
        name: string
        updatedAt?: Date | null
        viewUrl: string
        managers?: Array<{
          __typename?: 'CommunityManager'
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
    ratingAverage?: number | null
    ratingProgress?: number | null
    viewUrl: string
    project?: {
      __typename?: 'Project'
      amountManagerUsd?: number | null
      amountReferralUsd?: number | null
      amountTotalUsd?: number | null
      avatarUrl?: string | null
      communityId: string
      createdAt?: Date | null
      durationDays?: number | null
      endDate?: Date | null
      id: string
      instructions?: string | null
      linkDiscord?: string | null
      linkGithub?: string | null
      linkTelegram?: string | null
      linkTwitter?: string | null
      linkWebsite?: string | null
      manageUrl: string
      name: string
      remainingDays?: number | null
      reviewCount?: number | null
      reviewsOpen?: boolean | null
      slug: string
      startDate?: Date | null
      status?: ProjectStatus | null
      updatedAt?: Date | null
      viewUrl: string
      community?: {
        __typename?: 'Community'
        activeProjectsCount?: number | null
        avatarUrl?: string | null
        createdAt?: Date | null
        homeServerId?: string | null
        id: string
        managerCount?: number | null
        manageUrl: string
        name: string
        updatedAt?: Date | null
        viewUrl: string
        managers?: Array<{
          __typename?: 'CommunityManager'
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
      ratingAverage?: number | null
      ratingProgress?: number | null
      viewUrl: string
      project?: {
        __typename?: 'Project'
        amountManagerUsd?: number | null
        amountReferralUsd?: number | null
        amountTotalUsd?: number | null
        avatarUrl?: string | null
        communityId: string
        createdAt?: Date | null
        durationDays?: number | null
        endDate?: Date | null
        id: string
        instructions?: string | null
        linkDiscord?: string | null
        linkGithub?: string | null
        linkTelegram?: string | null
        linkTwitter?: string | null
        linkWebsite?: string | null
        manageUrl: string
        name: string
        remainingDays?: number | null
        reviewCount?: number | null
        reviewsOpen?: boolean | null
        slug: string
        startDate?: Date | null
        status?: ProjectStatus | null
        updatedAt?: Date | null
        viewUrl: string
        community?: {
          __typename?: 'Community'
          activeProjectsCount?: number | null
          avatarUrl?: string | null
          createdAt?: Date | null
          homeServerId?: string | null
          id: string
          managerCount?: number | null
          manageUrl: string
          name: string
          updatedAt?: Date | null
          viewUrl: string
          managers?: Array<{
            __typename?: 'CommunityManager'
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
    ratingAverage?: number | null
    ratingProgress?: number | null
    viewUrl: string
    project?: {
      __typename?: 'Project'
      amountManagerUsd?: number | null
      amountReferralUsd?: number | null
      amountTotalUsd?: number | null
      avatarUrl?: string | null
      communityId: string
      createdAt?: Date | null
      durationDays?: number | null
      endDate?: Date | null
      id: string
      instructions?: string | null
      linkDiscord?: string | null
      linkGithub?: string | null
      linkTelegram?: string | null
      linkTwitter?: string | null
      linkWebsite?: string | null
      manageUrl: string
      name: string
      remainingDays?: number | null
      reviewCount?: number | null
      reviewsOpen?: boolean | null
      slug: string
      startDate?: Date | null
      status?: ProjectStatus | null
      updatedAt?: Date | null
      viewUrl: string
      community?: {
        __typename?: 'Community'
        activeProjectsCount?: number | null
        avatarUrl?: string | null
        createdAt?: Date | null
        homeServerId?: string | null
        id: string
        managerCount?: number | null
        manageUrl: string
        name: string
        updatedAt?: Date | null
        viewUrl: string
        managers?: Array<{
          __typename?: 'CommunityManager'
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
    ratingAverage
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
    solanaMainnetUrl
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
export const FaqItemDetailsFragmentDoc = gql`
  fragment FaqItemDetails on FaqItem {
    createdAt
    id
    question
    answer
    order
    updatedAt
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
    authorId
    author {
      ...UserDetails
    }
    rating
    updatedAt
  }
  ${UserDetailsFragmentDoc}
`
export const CommunityManagerDetailsFragmentDoc = gql`
  fragment CommunityManagerDetails on CommunityManager {
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
    managerCount
    managers {
      ...CommunityManagerDetails
    }
    manageUrl
    name
    updatedAt
    viewUrl
  }
  ${CommunityManagerDetailsFragmentDoc}
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
    durationDays
    endDate
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
    remainingDays
    reviewCount
    reviewsOpen
    slug
    startDate
    status
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
    ratingAverage
    ratingProgress
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
export const ReviewerFindManyCommentDocument = gql`
  query reviewerFindManyComment($input: ReviewerFindManyCommentInput!) {
    items: reviewerFindManyComment(input: $input) {
      ...CommentDetails
      children {
        ...CommentDetails
      }
    }
  }
  ${CommentDetailsFragmentDoc}
`
export const ReviewerCreateCommentDocument = gql`
  mutation reviewerCreateComment($input: ReviewerCreateCommentInput!) {
    created: reviewerCreateComment(input: $input) {
      ...CommentDetails
    }
  }
  ${CommentDetailsFragmentDoc}
`
export const ReviewerUpdateCommentDocument = gql`
  mutation reviewerUpdateComment($commentId: String!, $input: ReviewerUpdateCommentInput!) {
    updated: reviewerUpdateComment(commentId: $commentId, input: $input) {
      ...CommentDetails
    }
  }
  ${CommentDetailsFragmentDoc}
`
export const ReviewerDeleteCommentDocument = gql`
  mutation reviewerDeleteComment($commentId: String!) {
    deleted: reviewerDeleteComment(commentId: $commentId)
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
export const ManagerFindManyCommentDocument = gql`
  query managerFindManyComment($input: ManagerFindManyCommentInput!) {
    items: managerFindManyComment(input: $input) {
      ...CommentDetails
      ratings {
        ...RatingDetails
      }
      review {
        ...ReviewDetails
      }
      children {
        ...CommentDetails
      }
    }
  }
  ${CommentDetailsFragmentDoc}
  ${RatingDetailsFragmentDoc}
  ${ReviewDetailsFragmentDoc}
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
export const ManagerGetCommunityManagersDocument = gql`
  query managerGetCommunityManagers($communityId: String!) {
    items: managerGetCommunityManagers(communityId: $communityId) {
      ...CommunityManagerDetails
    }
  }
  ${CommunityManagerDetailsFragmentDoc}
`
export const ManagerGetCommunityManagerDocument = gql`
  query managerGetCommunityManager($communityId: String!) {
    item: managerGetCommunityManager(communityId: $communityId) {
      ...CommunityManagerDetails
    }
  }
  ${CommunityManagerDetailsFragmentDoc}
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
export const AdminGetCommunityManagersDocument = gql`
  query adminGetCommunityManagers($communityId: String!) {
    items: adminGetCommunityManagers(communityId: $communityId) {
      ...CommunityManagerDetails
    }
  }
  ${CommunityManagerDetailsFragmentDoc}
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
export const AdminAddCommunityManagerDocument = gql`
  mutation adminAddCommunityManager($communityId: String!, $userId: String!) {
    added: adminAddCommunityManager(communityId: $communityId, userId: $userId)
  }
`
export const AdminRemoveCommunityManagerDocument = gql`
  mutation adminRemoveCommunityManager($communityId: String!, $userId: String!) {
    removed: adminRemoveCommunityManager(communityId: $communityId, userId: $userId)
  }
`
export const AdminToggleCommunityAdminDocument = gql`
  mutation adminToggleCommunityAdmin($communityId: String!, $userId: String!) {
    toggled: adminToggleCommunityAdmin(communityId: $communityId, userId: $userId)
  }
`
export const ManagerAddCommunityManagerDocument = gql`
  mutation managerAddCommunityManager($communityId: String!, $userId: String!) {
    added: managerAddCommunityManager(communityId: $communityId, userId: $userId)
  }
`
export const ManagerRemoveCommunityManagerDocument = gql`
  mutation managerRemoveCommunityManager($communityId: String!, $userId: String!) {
    removed: managerRemoveCommunityManager(communityId: $communityId, userId: $userId)
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
export const AdminFindManyFaqItemDocument = gql`
  query adminFindManyFaqItem($input: FaqItemAdminFindManyInput!) {
    items: adminFindManyFaqItem(input: $input) {
      ...FaqItemDetails
    }
  }
  ${FaqItemDetailsFragmentDoc}
`
export const AdminFindOneFaqItemDocument = gql`
  query adminFindOneFaqItem($faqItemId: String!) {
    item: adminFindOneFaqItem(faqItemId: $faqItemId) {
      ...FaqItemDetails
    }
  }
  ${FaqItemDetailsFragmentDoc}
`
export const AdminCreateFaqItemDocument = gql`
  mutation adminCreateFaqItem($input: FaqItemAdminCreateInput!) {
    created: adminCreateFaqItem(input: $input) {
      ...FaqItemDetails
    }
  }
  ${FaqItemDetailsFragmentDoc}
`
export const AdminUpdateFaqItemDocument = gql`
  mutation adminUpdateFaqItem($faqItemId: String!, $input: FaqItemAdminUpdateInput!) {
    updated: adminUpdateFaqItem(faqItemId: $faqItemId, input: $input) {
      ...FaqItemDetails
    }
  }
  ${FaqItemDetailsFragmentDoc}
`
export const AdminDeleteFaqItemDocument = gql`
  mutation adminDeleteFaqItem($faqItemId: String!) {
    deleted: adminDeleteFaqItem(faqItemId: $faqItemId)
  }
`
export const UserFindManyFaqItemDocument = gql`
  query userFindManyFaqItem($input: FaqItemUserFindManyInput!) {
    items: userFindManyFaqItem(input: $input) {
      ...FaqItemDetails
    }
  }
  ${FaqItemDetailsFragmentDoc}
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
      reviewers {
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
export const AdminAddProjectReviewerDocument = gql`
  mutation adminAddProjectReviewer($projectId: String!, $reviewerUserId: String!) {
    added: adminAddProjectReviewer(projectId: $projectId, reviewerUserId: $reviewerUserId)
  }
`
export const AdminRemoveProjectReviewerDocument = gql`
  mutation adminRemoveProjectReviewer($projectId: String!, $reviewerUserId: String!) {
    removed: adminRemoveProjectReviewer(projectId: $projectId, reviewerUserId: $reviewerUserId)
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
      message {
        message
        nextStatus
      }
      referral {
        ...UserDetails
      }
      reviewers {
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
export const ManagerUpdateProjectStatusDocument = gql`
  mutation managerUpdateProjectStatus($projectId: String!, $status: ProjectStatus!) {
    updated: managerUpdateProjectStatus(projectId: $projectId, status: $status) {
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
export const ManagerAddProjectReviewerDocument = gql`
  mutation managerAddProjectReviewer($projectId: String!, $reviewerUserId: String!) {
    added: managerAddProjectReviewer(projectId: $projectId, reviewerUserId: $reviewerUserId)
  }
`
export const ManagerRemoveProjectReviewerDocument = gql`
  mutation managerRemoveProjectReviewer($projectId: String!, $reviewerUserId: String!) {
    removed: managerRemoveProjectReviewer(projectId: $projectId, reviewerUserId: $reviewerUserId)
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
export const ManagerCreateRatingDocument = gql`
  mutation managerCreateRating($input: ManagerCreateRatingInput!) {
    created: managerCreateRating(input: $input) {
      ...RatingDetails
    }
  }
  ${RatingDetailsFragmentDoc}
`
export const ManagerUpdateRatingDocument = gql`
  mutation managerUpdateRating($ratingId: String!, $input: ManagerUpdateRatingInput!) {
    updated: managerUpdateRating(ratingId: $ratingId, input: $input) {
      ...RatingDetails
    }
  }
  ${RatingDetailsFragmentDoc}
`
export const ManagerDeleteRatingDocument = gql`
  mutation managerDeleteRating($ratingId: String!) {
    deleted: managerDeleteRating(ratingId: $ratingId)
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
export const ManagerFindManyReviewByProjectDocument = gql`
  query managerFindManyReviewByProject($input: ManagerFindManyReviewByProjectInput!) {
    items: managerFindManyReviewByProject(input: $input) {
      ...ReviewDetails
    }
  }
  ${ReviewDetailsFragmentDoc}
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
const ReviewerFindManyCommentDocumentString = print(ReviewerFindManyCommentDocument)
const ReviewerCreateCommentDocumentString = print(ReviewerCreateCommentDocument)
const ReviewerUpdateCommentDocumentString = print(ReviewerUpdateCommentDocument)
const ReviewerDeleteCommentDocumentString = print(ReviewerDeleteCommentDocument)
const AdminFindManyCommentDocumentString = print(AdminFindManyCommentDocument)
const AdminUpdateCommentDocumentString = print(AdminUpdateCommentDocument)
const AdminDeleteCommentDocumentString = print(AdminDeleteCommentDocument)
const ManagerFindManyCommentDocumentString = print(ManagerFindManyCommentDocument)
const UserFindManyCommunityDocumentString = print(UserFindManyCommunityDocument)
const UserFindOneCommunityDocumentString = print(UserFindOneCommunityDocument)
const ManagerGetCommunityManagersDocumentString = print(ManagerGetCommunityManagersDocument)
const ManagerGetCommunityManagerDocumentString = print(ManagerGetCommunityManagerDocument)
const ManagerFindManyCommunityDocumentString = print(ManagerFindManyCommunityDocument)
const ManagerFindOneCommunityDocumentString = print(ManagerFindOneCommunityDocument)
const ManagerCreateCommunityDocumentString = print(ManagerCreateCommunityDocument)
const ManagerUpdateCommunityDocumentString = print(ManagerUpdateCommunityDocument)
const ManagerDeleteCommunityDocumentString = print(ManagerDeleteCommunityDocument)
const AdminFindManyCommunityDocumentString = print(AdminFindManyCommunityDocument)
const AdminGetCommunityManagersDocumentString = print(AdminGetCommunityManagersDocument)
const AdminFindOneCommunityDocumentString = print(AdminFindOneCommunityDocument)
const AdminUpdateCommunityDocumentString = print(AdminUpdateCommunityDocument)
const AdminDeleteCommunityDocumentString = print(AdminDeleteCommunityDocument)
const AdminAddCommunityManagerDocumentString = print(AdminAddCommunityManagerDocument)
const AdminRemoveCommunityManagerDocumentString = print(AdminRemoveCommunityManagerDocument)
const AdminToggleCommunityAdminDocumentString = print(AdminToggleCommunityAdminDocument)
const ManagerAddCommunityManagerDocumentString = print(ManagerAddCommunityManagerDocument)
const ManagerRemoveCommunityManagerDocumentString = print(ManagerRemoveCommunityManagerDocument)
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
const AdminFindManyFaqItemDocumentString = print(AdminFindManyFaqItemDocument)
const AdminFindOneFaqItemDocumentString = print(AdminFindOneFaqItemDocument)
const AdminCreateFaqItemDocumentString = print(AdminCreateFaqItemDocument)
const AdminUpdateFaqItemDocumentString = print(AdminUpdateFaqItemDocument)
const AdminDeleteFaqItemDocumentString = print(AdminDeleteFaqItemDocument)
const UserFindManyFaqItemDocumentString = print(UserFindManyFaqItemDocument)
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
const AdminAddProjectReviewerDocumentString = print(AdminAddProjectReviewerDocument)
const AdminRemoveProjectReviewerDocumentString = print(AdminRemoveProjectReviewerDocument)
const AdminAddProjectReferralDocumentString = print(AdminAddProjectReferralDocument)
const AdminRemoveProjectReferralDocumentString = print(AdminRemoveProjectReferralDocument)
const ManagerFindManyProjectDocumentString = print(ManagerFindManyProjectDocument)
const ManagerFindOneProjectDocumentString = print(ManagerFindOneProjectDocument)
const ManagerCreateProjectDocumentString = print(ManagerCreateProjectDocument)
const ManagerUpdateProjectDocumentString = print(ManagerUpdateProjectDocument)
const ManagerUpdateProjectStatusDocumentString = print(ManagerUpdateProjectStatusDocument)
const ManagerDeleteProjectDocumentString = print(ManagerDeleteProjectDocument)
const ManagerAddProjectManagerDocumentString = print(ManagerAddProjectManagerDocument)
const ManagerRemoveProjectManagerDocumentString = print(ManagerRemoveProjectManagerDocument)
const ManagerAddProjectReviewerDocumentString = print(ManagerAddProjectReviewerDocument)
const ManagerRemoveProjectReviewerDocumentString = print(ManagerRemoveProjectReviewerDocument)
const ManagerAddProjectReferralDocumentString = print(ManagerAddProjectReferralDocument)
const ManagerRemoveProjectReferralDocumentString = print(ManagerRemoveProjectReferralDocument)
const ManagerCreateRatingDocumentString = print(ManagerCreateRatingDocument)
const ManagerUpdateRatingDocumentString = print(ManagerUpdateRatingDocument)
const ManagerDeleteRatingDocumentString = print(ManagerDeleteRatingDocument)
const AdminFindManyRatingDocumentString = print(AdminFindManyRatingDocument)
const AdminUpdateRatingDocumentString = print(AdminUpdateRatingDocument)
const AdminDeleteRatingDocumentString = print(AdminDeleteRatingDocument)
const ManagerFindManyReviewByProjectDocumentString = print(ManagerFindManyReviewByProjectDocument)
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
    reviewerFindManyComment(
      variables: ReviewerFindManyCommentQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ReviewerFindManyCommentQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ReviewerFindManyCommentQuery>(ReviewerFindManyCommentDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'reviewerFindManyComment',
        'query',
        variables,
      )
    },
    reviewerCreateComment(
      variables: ReviewerCreateCommentMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ReviewerCreateCommentMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ReviewerCreateCommentMutation>(ReviewerCreateCommentDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'reviewerCreateComment',
        'mutation',
        variables,
      )
    },
    reviewerUpdateComment(
      variables: ReviewerUpdateCommentMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ReviewerUpdateCommentMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ReviewerUpdateCommentMutation>(ReviewerUpdateCommentDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'reviewerUpdateComment',
        'mutation',
        variables,
      )
    },
    reviewerDeleteComment(
      variables: ReviewerDeleteCommentMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ReviewerDeleteCommentMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ReviewerDeleteCommentMutation>(ReviewerDeleteCommentDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'reviewerDeleteComment',
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
    managerFindManyComment(
      variables: ManagerFindManyCommentQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ManagerFindManyCommentQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ManagerFindManyCommentQuery>(ManagerFindManyCommentDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'managerFindManyComment',
        'query',
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
    managerGetCommunityManagers(
      variables: ManagerGetCommunityManagersQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ManagerGetCommunityManagersQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ManagerGetCommunityManagersQuery>(ManagerGetCommunityManagersDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'managerGetCommunityManagers',
        'query',
        variables,
      )
    },
    managerGetCommunityManager(
      variables: ManagerGetCommunityManagerQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ManagerGetCommunityManagerQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ManagerGetCommunityManagerQuery>(ManagerGetCommunityManagerDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'managerGetCommunityManager',
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
    adminGetCommunityManagers(
      variables: AdminGetCommunityManagersQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminGetCommunityManagersQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminGetCommunityManagersQuery>(AdminGetCommunityManagersDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminGetCommunityManagers',
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
    adminAddCommunityManager(
      variables: AdminAddCommunityManagerMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminAddCommunityManagerMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminAddCommunityManagerMutation>(AdminAddCommunityManagerDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminAddCommunityManager',
        'mutation',
        variables,
      )
    },
    adminRemoveCommunityManager(
      variables: AdminRemoveCommunityManagerMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminRemoveCommunityManagerMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminRemoveCommunityManagerMutation>(AdminRemoveCommunityManagerDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminRemoveCommunityManager',
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
    managerAddCommunityManager(
      variables: ManagerAddCommunityManagerMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ManagerAddCommunityManagerMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ManagerAddCommunityManagerMutation>(ManagerAddCommunityManagerDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'managerAddCommunityManager',
        'mutation',
        variables,
      )
    },
    managerRemoveCommunityManager(
      variables: ManagerRemoveCommunityManagerMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ManagerRemoveCommunityManagerMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ManagerRemoveCommunityManagerMutation>(
            ManagerRemoveCommunityManagerDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'managerRemoveCommunityManager',
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
    adminFindManyFaqItem(
      variables: AdminFindManyFaqItemQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindManyFaqItemQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyFaqItemQuery>(AdminFindManyFaqItemDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyFaqItem',
        'query',
        variables,
      )
    },
    adminFindOneFaqItem(
      variables: AdminFindOneFaqItemQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindOneFaqItemQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindOneFaqItemQuery>(AdminFindOneFaqItemDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindOneFaqItem',
        'query',
        variables,
      )
    },
    adminCreateFaqItem(
      variables: AdminCreateFaqItemMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminCreateFaqItemMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateFaqItemMutation>(AdminCreateFaqItemDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateFaqItem',
        'mutation',
        variables,
      )
    },
    adminUpdateFaqItem(
      variables: AdminUpdateFaqItemMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminUpdateFaqItemMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminUpdateFaqItemMutation>(AdminUpdateFaqItemDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminUpdateFaqItem',
        'mutation',
        variables,
      )
    },
    adminDeleteFaqItem(
      variables: AdminDeleteFaqItemMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteFaqItemMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteFaqItemMutation>(AdminDeleteFaqItemDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteFaqItem',
        'mutation',
        variables,
      )
    },
    userFindManyFaqItem(
      variables: UserFindManyFaqItemQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindManyFaqItemQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindManyFaqItemQuery>(UserFindManyFaqItemDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindManyFaqItem',
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
    adminAddProjectReviewer(
      variables: AdminAddProjectReviewerMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminAddProjectReviewerMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminAddProjectReviewerMutation>(AdminAddProjectReviewerDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminAddProjectReviewer',
        'mutation',
        variables,
      )
    },
    adminRemoveProjectReviewer(
      variables: AdminRemoveProjectReviewerMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminRemoveProjectReviewerMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminRemoveProjectReviewerMutation>(AdminRemoveProjectReviewerDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminRemoveProjectReviewer',
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
    managerUpdateProjectStatus(
      variables: ManagerUpdateProjectStatusMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ManagerUpdateProjectStatusMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ManagerUpdateProjectStatusMutation>(ManagerUpdateProjectStatusDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'managerUpdateProjectStatus',
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
    managerAddProjectReviewer(
      variables: ManagerAddProjectReviewerMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ManagerAddProjectReviewerMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ManagerAddProjectReviewerMutation>(ManagerAddProjectReviewerDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'managerAddProjectReviewer',
        'mutation',
        variables,
      )
    },
    managerRemoveProjectReviewer(
      variables: ManagerRemoveProjectReviewerMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ManagerRemoveProjectReviewerMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ManagerRemoveProjectReviewerMutation>(
            ManagerRemoveProjectReviewerDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'managerRemoveProjectReviewer',
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
    managerCreateRating(
      variables: ManagerCreateRatingMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ManagerCreateRatingMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ManagerCreateRatingMutation>(ManagerCreateRatingDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'managerCreateRating',
        'mutation',
        variables,
      )
    },
    managerUpdateRating(
      variables: ManagerUpdateRatingMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ManagerUpdateRatingMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ManagerUpdateRatingMutation>(ManagerUpdateRatingDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'managerUpdateRating',
        'mutation',
        variables,
      )
    },
    managerDeleteRating(
      variables: ManagerDeleteRatingMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ManagerDeleteRatingMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ManagerDeleteRatingMutation>(ManagerDeleteRatingDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'managerDeleteRating',
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
    managerFindManyReviewByProject(
      variables: ManagerFindManyReviewByProjectQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: ManagerFindManyReviewByProjectQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<ManagerFindManyReviewByProjectQuery>(
            ManagerFindManyReviewByProjectDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'managerFindManyReviewByProject',
        'query',
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

export const OrderDirectionSchema = z.nativeEnum(OrderDirection)

export const ProjectOrderBySchema = z.nativeEnum(ProjectOrderBy)

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
    durationDays: z.number().nullish(),
    instructions: z.string().nullish(),
    linkDiscord: z.string().nullish(),
    linkGithub: z.string().nullish(),
    linkTelegram: z.string().nullish(),
    linkTwitter: z.string().nullish(),
    linkWebsite: z.string().nullish(),
    name: z.string().nullish(),
    reviewsOpen: z.boolean().nullish(),
    startDate: definedNonNullAnySchema.nullish(),
    status: ProjectStatusSchema.nullish(),
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

export function FaqItemAdminCreateInputSchema(): z.ZodObject<Properties<FaqItemAdminCreateInput>> {
  return z.object({
    question: z.string(),
  })
}

export function FaqItemAdminFindManyInputSchema(): z.ZodObject<Properties<FaqItemAdminFindManyInput>> {
  return z.object({
    search: z.string().nullish(),
  })
}

export function FaqItemAdminUpdateInputSchema(): z.ZodObject<Properties<FaqItemAdminUpdateInput>> {
  return z.object({
    answer: z.string().nullish(),
    order: z.number().nullish(),
    question: z.string().nullish(),
  })
}

export function FaqItemUserFindManyInputSchema(): z.ZodObject<Properties<FaqItemUserFindManyInput>> {
  return z.object({
    search: z.string().nullish(),
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

export function ManagerCreateRatingInputSchema(): z.ZodObject<Properties<ManagerCreateRatingInput>> {
  return z.object({
    commentId: z.string(),
    content: z.string().nullish(),
    rating: z.number(),
  })
}

export function ManagerFindManyCommentInputSchema(): z.ZodObject<Properties<ManagerFindManyCommentInput>> {
  return z.object({
    projectId: z.string(),
    search: z.string().nullish(),
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

export function ManagerFindManyReviewByProjectInputSchema(): z.ZodObject<
  Properties<ManagerFindManyReviewByProjectInput>
> {
  return z.object({
    projectId: z.string(),
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
    durationDays: z.number().nullish(),
    instructions: z.string().nullish(),
    linkDiscord: z.string().nullish(),
    linkGithub: z.string().nullish(),
    linkTelegram: z.string().nullish(),
    linkTwitter: z.string().nullish(),
    linkWebsite: z.string().nullish(),
    name: z.string().nullish(),
    referralId: z.string().nullish(),
    reviewsOpen: z.boolean().nullish(),
    startDate: definedNonNullAnySchema.nullish(),
  })
}

export function ManagerUpdateRatingInputSchema(): z.ZodObject<Properties<ManagerUpdateRatingInput>> {
  return z.object({
    content: z.string().nullish(),
    rating: z.number().nullish(),
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

export function ReviewerCreateCommentInputSchema(): z.ZodObject<Properties<ReviewerCreateCommentInput>> {
  return z.object({
    content: z.string(),
    parentId: z.string().nullish(),
    reviewId: z.string(),
    versionBrowser: z.string().nullish(),
    versionOs: z.string().nullish(),
  })
}

export function ReviewerFindManyCommentInputSchema(): z.ZodObject<Properties<ReviewerFindManyCommentInput>> {
  return z.object({
    reviewId: z.string(),
    search: z.string().nullish(),
  })
}

export function ReviewerFindManyProjectInputSchema(): z.ZodObject<Properties<ReviewerFindManyProjectInput>> {
  return z.object({
    communityId: z.string().nullish(),
    limit: z.number().nullish(),
    mineOnly: z.boolean().nullish(),
    orderBy: ProjectOrderBySchema.nullish(),
    orderDirection: OrderDirectionSchema.nullish(),
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

export function ReviewerUpdateCommentInputSchema(): z.ZodObject<Properties<ReviewerUpdateCommentInput>> {
  return z.object({
    content: z.string().nullish(),
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

export function UserFindManyUserInputSchema(): z.ZodObject<Properties<UserFindManyUserInput>> {
  return z.object({
    limit: z.number().nullish(),
    page: z.number().nullish(),
    search: z.string().nullish(),
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
