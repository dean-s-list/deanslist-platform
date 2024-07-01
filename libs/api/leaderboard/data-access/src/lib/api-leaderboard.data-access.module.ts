import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@deanslist-platform/api-core-data-access'
import { ApiLeaderboardService } from './api-leaderboard.service'
import { ApiLeaderboardRealmsService } from './api-leaderboard-realms.service'
import { ApiLeaderboardVotingPowerService } from './api-leaderboard-voting-power.service'
import { ApiLeaderboardVsrService } from './api-leaderboard-vsr.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [
    ApiLeaderboardService,
    ApiLeaderboardRealmsService,
    ApiLeaderboardVotingPowerService,
    ApiLeaderboardVsrService,
  ],
  exports: [
    ApiLeaderboardService,
    ApiLeaderboardRealmsService,
    ApiLeaderboardVotingPowerService,
    ApiLeaderboardVsrService,
  ],
})
export class ApiLeaderboardDataAccessModule {}
