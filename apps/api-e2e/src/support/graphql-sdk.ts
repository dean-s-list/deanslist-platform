import {
  AdminUpdateProjectInput,
  getGraphQLSdk,
  IdentityProvider,
  ManagerCreateCommunityInput,
  ManagerCreateProjectInput,
  ProjectStatus,
  ReviewerCreateCommentInput,
  Sdk,
} from '@deanslist-platform/sdk'
import { Keypair } from '@solana/web3.js'
import * as nacl from 'tweetnacl'
import { CookieJar } from './cookie-jar'
import { getApiUrl } from './get-api.url'
import { uniqueId } from './index'
import { alice, bob, TestUser } from './user-identities'

export const sdk: Sdk = getGraphQLSdk(getApiUrl('/graphql'))

async function getUserCookie(user: TestUser) {
  const found = CookieJar.getCookie(user.username)
  if (!found) {
    const res = await sdk.login({ input: { username: user.username, password: user.password } })
    return CookieJar.setCookie(user.username, res.headers.get('set-cookie'))
  }
  return found
}

export async function getAliceCookie() {
  return getUserCookie(alice)
}
export async function getBobCookie() {
  return getUserCookie(bob)
}

export async function getIdentityChallenge(user: TestUser) {
  const cookie = await getUserCookie(user)
  return sdk.userRequestIdentityChallenge(
    {
      input: {
        provider: IdentityProvider.Solana,
        providerId: user.solana.publicKey,
      },
    },
    { cookie },
  )
}

export function getUserKeypair(user: TestUser): Keypair {
  return Keypair.fromSecretKey(Uint8Array.from(user.solana.secret))
}

export function signMessage(user: TestUser, message: string) {
  return nacl.sign.detached(new TextEncoder().encode(message), Uint8Array.from(user.solana.secret))
}

export async function adminUpdateProject({
  cookie,
  projectId,
  ...input
}: AdminUpdateProjectInput & { cookie: string; projectId: string }) {
  return sdk.adminUpdateProject({ projectId, input }, { cookie }).then((res) => res.data.updated)
}

export async function adminUpdateProjectStatusActive({ cookie, projectId }: { cookie: string; projectId: string }) {
  return sdk
    .adminUpdateProject({ projectId, input: { status: ProjectStatus.Active } }, { cookie })
    .then((res) => res.data.updated)
}
export async function adminUpdateProjectStatusClosed({ cookie, projectId }: { cookie: string; projectId: string }) {
  return sdk
    .adminUpdateProject({ projectId, input: { status: ProjectStatus.Closed } }, { cookie })
    .then((res) => res.data.updated)
}

export async function managerCreateCommunity({
  cookie,
  input = { name: uniqueId('community') },
}: {
  cookie: string
  input?: ManagerCreateCommunityInput
}) {
  return sdk.managerCreateCommunity({ input }, { cookie }).then((res) => res.data.created)
}

export async function managerCreateProject({
  cookie,
  name = uniqueId('project'),
  ...input
}: Omit<ManagerCreateProjectInput, 'name'> & { cookie: string; name?: string }) {
  return sdk.managerCreateProject({ input: { ...input, name } }, { cookie }).then((res) => res.data.created)
}

export async function managerCreateActiveProject({
  cookie,
  ...input
}: Omit<ManagerCreateProjectInput, 'name'> & { cookie: string; name?: string }) {
  const project = await managerCreateProject({ cookie, ...input })
  await adminUpdateProjectStatusActive({ cookie, projectId: project.id })
  return project
}

export async function reviewerCreateComment({ cookie, ...input }: ReviewerCreateCommentInput & { cookie: string }) {
  return sdk.reviewerCreateComment({ input }, { cookie }).then((res) => res.data.created)
}

export async function managerCreateCommunityWithProject({ cookie }: { cookie: string }) {
  const community = await managerCreateCommunity({ cookie })
  const project = await managerCreateProject({ cookie, communityId: community.id })
  await adminUpdateProjectStatusActive({ cookie, projectId: project.id })
  return {
    community,
    project,
  }
}

export async function reviewerCreateReview({ cookie, projectId }: { cookie: string; projectId: string }) {
  return sdk.reviewerCreateReview({ projectId }, { cookie }).then((res) => res.data.created)
}
