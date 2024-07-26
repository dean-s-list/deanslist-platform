import { Module } from '@nestjs/common'
import { ApiFaqItemDataAccessModule } from '@deanslist-platform/api-faq-item-data-access'
import { ApiFaqItemResolver } from './api-faq-item.resolver'
import { ApiFaqItemAdminResolver } from './api-faq-item-admin.resolver'
import { ApiFaqItemUserResolver } from './api-faq-item-user.resolver'

@Module({
  imports: [ApiFaqItemDataAccessModule],
  providers: [ApiFaqItemResolver, ApiFaqItemAdminResolver, ApiFaqItemUserResolver],
})
export class ApiFaqItemFeatureModule {}
