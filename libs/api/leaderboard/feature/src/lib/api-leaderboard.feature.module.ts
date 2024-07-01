import { Module } from '@nestjs/common'
import { ApiLeaderboardDataAccessModule } from '@deanslist-platform/api-leaderboard-data-access'
import { ApiLeaderboardController } from './api-leaderboard.controller'

@Module({
  controllers: [ApiLeaderboardController],
  imports: [ApiLeaderboardDataAccessModule],
})
export class ApiLeaderboardFeatureModule {}
