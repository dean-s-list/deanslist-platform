import { ApiCoreService, BaseContext, getRequestDetails } from '@deanslist-platform/api-core-data-access'
import { Injectable, Logger } from '@nestjs/common'
import { Identity as PrismaIdentity, IdentityProvider } from '@prisma/client'
import { verifySignature } from '@pubkeyapp/solana-verify-wallet'
import { ApiSolanaIdentityService } from './api-solana-identity.service'
import { LinkIdentityInput } from './dto/link-identity-input'
import { RequestIdentityChallengeInput } from './dto/request-identity-challenge.input'
import { UserFindManyIdentityInput } from './dto/user-find-many-identity-input'
import { VerifyIdentityChallengeInput } from './dto/verify-identity-challenge-input'
import { sha256 } from './helpers/sha256'

@Injectable()
export class ApiUserIdentityService {
  private readonly logger = new Logger(ApiUserIdentityService.name)
  constructor(private readonly core: ApiCoreService, private readonly solana: ApiSolanaIdentityService) {}

  async deleteIdentity(userId: string, identityId: string): Promise<boolean> {
    const found = await this.core.data.identity.findFirst({
      where: { id: identityId, ownerId: userId },
      include: { owner: { include: { identities: true } } },
    })
    if (!found) {
      throw new Error(`Identity ${identityId} not found`)
    }
    if (found.provider === IdentityProvider.Discord) {
      throw new Error(`Cannot delete Discord identity`)
    }
    if (found.primary) {
      throw new Error(`Cannot delete primary identity`)
    }
    if (found.owner.identities.length === 1 && !found.owner.password) {
      throw new Error(`Cannot delete last identity`)
    }
    const deleted = await this.core.data.identity.delete({ where: { id: identityId } })
    if (!deleted) {
      throw new Error(`Identity ${identityId} not deleted`)
    }
    return true
  }

  async findManyIdentity(input: UserFindManyIdentityInput): Promise<PrismaIdentity[]> {
    const items = await this.core.data.identity.findMany({
      where: { owner: { username: input.username } },
      orderBy: [{ provider: 'asc' }, { providerId: 'asc' }],
    })

    return items ?? []
  }

  async requestIdentityChallenge(
    ctx: BaseContext,
    userId: string,
    { provider, providerId }: RequestIdentityChallengeInput,
  ) {
    // Make sure we can link the given provider
    this.solana.ensureLinkProvider(provider)
    // Make sure the providerId is valid
    this.solana.ensureValidProviderId(provider, providerId)
    // Make sure the identity is owned by the user
    await this.solana.ensureIdentityOwner(userId, provider, providerId)

    // Get the IP and user agent from the request
    const { ip, userAgent } = getRequestDetails(ctx)

    // Generate a random challenge
    const challenge = sha256(`${Math.random()}-${ip}-${userAgent}-${userId}-${provider}-${providerId}-${Math.random()}`)

    // Store the challenge
    return this.core.data.identityChallenge.create({
      data: {
        identity: { connect: { provider_providerId: { provider, providerId } } },
        ip,
        userAgent,
        challenge: `Approve this message to verify your wallet. #REF-${challenge}`,
      },
    })
  }

  async verifyIdentityChallenge(
    ctx: BaseContext,
    userId: string,
    { provider, providerId, challenge, signature, useLedger }: VerifyIdentityChallengeInput,
  ) {
    // Make sure we can link the given provider
    this.solana.ensureLinkProvider(provider)
    // Make sure the providerId is valid
    this.solana.ensureValidProviderId(provider, providerId)
    // Make sure the identity is owned by the user
    await this.solana.ensureIdentityOwner(userId, provider, providerId)

    // Make sure we find the challenge
    const found = await this.solana.ensureIdentityChallenge(provider, providerId, challenge)

    const { ip, userAgent } = getRequestDetails(ctx)

    if (found.ip !== ip || found.userAgent !== userAgent) {
      throw new Error(`Identity challenge not found.`)
    }

    const verified = verifySignature({
      challenge: found.challenge,
      publicKey: found.identity.providerId,
      signature,
      useLedger,
    })

    if (!verified) {
      throw new Error(`Identity challenge verification failed.`)
    }

    if (!found.identity.verified) {
      // Update the identity
      await this.core.data.identity.update({
        where: { id: found.identity.id },
        data: { verified: true },
      })
      this.logger.log(`Identity ${found.identity.id} verified`)
    }

    const hasPrimary = found.identity?.owner?.identities
      ?.filter((identity) => identity.provider === provider)
      .some((identity) => identity.primary)

    if (!hasPrimary) {
      await this.setPrimary(found.identity)
    }

    // Update the identity
    const updated = await this.core.data.identityChallenge.update({
      where: {
        id: found.id,
      },
      data: {
        verified,
        signature,
      },
    })
    return updated
  }

  async linkIdentity(userId: string, { provider, providerId }: LinkIdentityInput) {
    // Make sure we can link the given provider
    this.solana.ensureLinkProvider(provider)
    // Make sure the identity does not exist
    const found = await this.core.data.identity.findFirst({
      where: {
        provider,
        providerId,
      },
    })
    if (found) {
      throw new Error(`Identity ${provider} ${providerId} already linked`)
    }

    // Create the identity
    const created = await this.core.data.identity.create({
      data: {
        provider,
        providerId,
        ownerId: userId,
      },
    })
    return created
  }

  async setPrimaryIdentity(userId: string, identityId: string) {
    const found = await this.core.data.identity.findFirst({
      where: {
        id: identityId,
        ownerId: userId,
        provider: IdentityProvider.Solana,
      },
    })
    if (!found) {
      throw new Error(`Identity ${identityId} not found`)
    }
    if (found.provider !== IdentityProvider.Solana) {
      throw new Error(`Identity ${identityId} is not a Solana identity`)
    }
    if (found.primary) {
      throw new Error(`Identity ${identityId} already set as primary`)
    }
    await this.core.data.identity.updateMany({
      where: { ownerId: userId, provider: IdentityProvider.Solana },
      data: { primary: false },
    })
    return this.setPrimary(found)
  }

  async setPrimary({
    ownerId,
    provider,
    providerId,
  }: {
    ownerId: string
    provider: IdentityProvider
    providerId: string
  }) {
    const updated = await this.core.data.identity.update({
      where: { provider_providerId: { provider, providerId } },
      data: { primary: true },
    })
    this.logger.log(`Identity ${providerId} set as primary for ${ownerId}`)
    await this.core.data.user.update({ where: { id: ownerId }, data: { walletAddress: providerId } })
    return updated
  }
}
