import { Resolver } from '@nestjs/graphql'
import { ApiFaqItemService } from '@deanslist-platform/api-faq-item-data-access'
import { ApiAuthGraphQLUserGuard } from '@deanslist-platform/api-auth-data-access'
import { Mutation, Query, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { FaqItemUserFindManyInput, FaqItem } from '@deanslist-platform/api-faq-item-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiFaqItemUserResolver {
  constructor(private readonly service: ApiFaqItemService) {}

  @Query(() => [FaqItem])
  userFindManyFaqItem(@Args('input') input: FaqItemUserFindManyInput) {
    return this.service.user.findManyFaqItem(input)
  }
}
