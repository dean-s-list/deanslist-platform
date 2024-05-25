import { Resolver } from '@nestjs/graphql'
import { ApiRatingService } from '@deanslist-platform/api-rating-data-access'
import { Rating } from '@deanslist-platform/api-rating-data-access'

@Resolver(() => Rating)
export class ApiRatingResolver {
  constructor(private readonly service: ApiRatingService) {}
}
