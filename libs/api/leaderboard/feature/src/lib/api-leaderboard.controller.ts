import { ApiLeaderboardService } from '@deanslist-platform/api-leaderboard-data-access'
import { Controller, Get } from '@nestjs/common'
import { BN } from '@coral-xyz/anchor'

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

    const top50Leader = tokenHoldersWallets
      ?.map((wallet) => {
        const w = wallet.toBase58()
        const votingPower = votePowerRecords && votePowerRecords[w] ? votePowerRecords[w] : new BN(0)

        return {
          wallet,
          votingPower,
        }
      })
      .filter((l) => !l.votingPower.isZero())
      .sort(this.byVotingPower)
      .slice(0, 50)

    const delegatedPowers = await this.service.getDelegatedVotingPower(top50Leader.map((leader) => leader.wallet))

    return top50Leader
      .map((leader) => {
        const w = leader.wallet.toBase58()
        const delegatedPower = delegatedPowers && delegatedPowers[w] ? delegatedPowers[w] : new BN(0)

        return {
          wallet: leader.wallet.toBase58(),
          ownVotingPower: leader.votingPower,
          delegatedPower,
          votingPower: leader.votingPower.add(delegatedPower),
        }
      })
      .sort(this.byVotingPower)
      .map((l, i) => ({ ...l, rank: i + 1 }))
  }
}
