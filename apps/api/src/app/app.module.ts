import { Module } from '@nestjs/common'
import { ApiCoreFeatureModule } from '@deanslist-platform/api-core-feature'

@Module({
  imports: [ApiCoreFeatureModule],
})
export class AppModule {}
