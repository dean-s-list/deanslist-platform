import { ApiAuthGraphQLAdminGuard } from '@deanslist-platform/api-auth-data-access'
import {
  ApiFaqItemService,
  FaqItem,
  FaqItemAdminCreateInput,
  FaqItemAdminFindManyInput,
  FaqItemAdminUpdateInput,
} from '@deanslist-platform/api-faq-item-data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiFaqItemAdminResolver {
  constructor(private readonly service: ApiFaqItemService) {}

  @Mutation(() => FaqItem, { nullable: true })
  adminCreateFaqItem(@Args('input') input: FaqItemAdminCreateInput) {
    return this.service.admin.createFaqItem(input)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteFaqItem(@Args('faqItemId') faqItemId: string) {
    return this.service.admin.deleteFaqItem(faqItemId)
  }

  @Query(() => [FaqItem])
  adminFindManyFaqItem(@Args('input') input: FaqItemAdminFindManyInput) {
    return this.service.admin.findManyFaqItem(input)
  }

  @Query(() => FaqItem, { nullable: true })
  adminFindOneFaqItem(@Args('faqItemId') faqItemId: string) {
    return this.service.admin.findOneFaqItem(faqItemId)
  }

  @Mutation(() => FaqItem, { nullable: true })
  adminUpdateFaqItem(@Args('faqItemId') faqItemId: string, @Args('input') input: FaqItemAdminUpdateInput) {
    return this.service.admin.updateFaqItem(faqItemId, input)
  }
}
