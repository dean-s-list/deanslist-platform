import { ApiCoreService } from '@deanslist-platform/api-core-data-access'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { FaqItem } from './entity/faq-item.entity'

@Injectable()
export class ApiFaqItemDataService {
  constructor(readonly core: ApiCoreService) {}

  async create(input: Prisma.FaqItemUncheckedCreateInput) {
    return this.core.data.faqItem.create({ data: input })
  }

  async delete(faqItemId: string) {
    await this.findOne(faqItemId)
    const deleted = await this.core.data.faqItem.delete({ where: { id: faqItemId } })
    return !!deleted
  }

  async findMany({ ...input }: Prisma.FaqItemFindManyArgs): Promise<FaqItem[]> {
    return this.core.data.faqItem.findMany(input)
  }

  async findOne(faqItemId: string) {
    const found = await this.core.data.faqItem.findUnique({ where: { id: faqItemId } })
    if (!found) {
      throw new Error('FaqItem not found')
    }
    return found
  }

  async update(faqItemId: string, input: Prisma.FaqItemUpdateInput) {
    return this.core.data.faqItem.update({ where: { id: faqItemId }, data: input })
  }
}
