import { Injectable } from '@nestjs/common'
import { ApiFaqItemDataService } from './api-faq-item-data.service'
import { ApiFaqItemDataAdminService } from './api-faq-item-data-admin.service'
import { ApiFaqItemDataUserService } from './api-faq-item-data-user.service'

@Injectable()
export class ApiFaqItemService {
  constructor(
    readonly data: ApiFaqItemDataService,
    readonly admin: ApiFaqItemDataAdminService,
    readonly user: ApiFaqItemDataUserService,
  ) {}
}
