import { ApiCoreDataAccessModule } from '@deanslist-platform/api-core-data-access'
import { Module } from '@nestjs/common'
import { ApiFaqItemDataAdminService } from './api-faq-item-data-admin.service'
import { ApiFaqItemDataUserService } from './api-faq-item-data-user.service'
import { ApiFaqItemDataService } from './api-faq-item-data.service'
import { ApiFaqItemProvisionService } from './api-faq-item-provision.service'
import { ApiFaqItemService } from './api-faq-item.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [
    ApiFaqItemDataAdminService,
    ApiFaqItemDataService,
    ApiFaqItemDataUserService,
    ApiFaqItemProvisionService,
    ApiFaqItemService,
  ],
  exports: [ApiFaqItemService],
})
export class ApiFaqItemDataAccessModule {}
