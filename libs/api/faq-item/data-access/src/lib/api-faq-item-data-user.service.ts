import { Injectable } from '@nestjs/common'
import { ApiFaqItemDataService } from './api-faq-item-data.service'
import { FaqItemUserFindManyInput } from './dto/faq-item-user-find-many.input'
import { FaqItem } from './entity/faq-item.entity'
import { getFaqItemWhereUserInput } from './helpers/get-faq-item-where-user.input'

@Injectable()
export class ApiFaqItemDataUserService {
  constructor(private readonly data: ApiFaqItemDataService) {}

  async findManyFaqItem(input: FaqItemUserFindManyInput): Promise<FaqItem[]> {
    return this.data.findMany({
      orderBy: { createdAt: 'desc' },
      where: getFaqItemWhereUserInput(input),
    })
  }
}
