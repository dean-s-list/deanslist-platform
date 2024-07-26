import { Injectable } from '@nestjs/common'
import { ApiFaqItemDataService } from './api-faq-item-data.service'
import { FaqItemAdminCreateInput } from './dto/faq-item-admin-create.input'
import { FaqItemAdminFindManyInput } from './dto/faq-item-admin-find-many.input'
import { FaqItemAdminUpdateInput } from './dto/faq-item-admin-update.input'
import { FaqItem } from './entity/faq-item.entity'
import { getFaqItemWhereAdminInput } from './helpers/get-faq-item-where-admin.input'

@Injectable()
export class ApiFaqItemDataAdminService {
  constructor(private readonly data: ApiFaqItemDataService) {}

  async createFaqItem(input: FaqItemAdminCreateInput) {
    return this.data.create({ ...input, answer: '', order: 0 })
  }

  async deleteFaqItem(faqItemId: string) {
    return this.data.delete(faqItemId)
  }

  async findManyFaqItem(input: FaqItemAdminFindManyInput): Promise<FaqItem[]> {
    return this.data.findMany({
      orderBy: { createdAt: 'desc' },
      where: getFaqItemWhereAdminInput(input),
    })
  }

  async findOneFaqItem(faqItemId: string) {
    return this.data.findOne(faqItemId)
  }

  async updateFaqItem(faqItemId: string, input: FaqItemAdminUpdateInput) {
    return this.data.update(faqItemId, input)
  }
}
