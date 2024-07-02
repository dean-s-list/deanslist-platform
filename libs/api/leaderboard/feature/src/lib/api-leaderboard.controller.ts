import { ApiLeaderboardService } from '@deanslist-platform/api-leaderboard-data-access'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { BN } from '@coral-xyz/anchor'
import { ApiAuthGraphQLAdminGuard } from '@deanslist-platform/api-auth-data-access'

@Controller('leaderboard')
export class ApiLeaderboardController {
  constructor(private readonly service: ApiLeaderboardService) {}

  private byVotingPower(a: { votingPower: BN }, b: { votingPower: BN }) {
    return b.votingPower.toNumber() - a.votingPower.toNumber()
  }

  @Get('token-holders')
  async getTokenHolders() {
    const tokenHoldersWallets = await this.service.getTokenHolders()
    const votePowerRecords = await this.service.getVotingPowerPerWallet(tokenHoldersWallets)
    const [delegatedPowers, delegatedWallets] = await this.service.getDelegatedVotingPower(tokenHoldersWallets)

    return tokenHoldersWallets
      ?.map((walletPK) => {
        const wallet = walletPK.toBase58()
        const votingPower = votePowerRecords && votePowerRecords[wallet] ? votePowerRecords[wallet] : new BN(0)
        const delegatedPower = delegatedPowers && delegatedPowers[wallet] ? delegatedPowers[wallet] : new BN(0)

        return {
          wallet,
          ownVotingPower: votingPower,
          delegatedPower,
          votingPower: votingPower.add(delegatedPower),
        }
      })
      .filter((l) => !l.votingPower.isZero() && !delegatedWallets.has(l.wallet))
      .sort(this.byVotingPower)
      .map((l, i) => ({ ...l, rank: i + 1 }))
      .slice(0, 50)
  }

  @Get('clear-cache')
  @UseGuards(ApiAuthGraphQLAdminGuard)
  clearCache() {
    this.service.clearCache()
    return { success: 'ok' }
  }
}
