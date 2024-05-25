import { ObjectType } from '@nestjs/graphql'
import { PagingResponse } from '@deanslist-platform/api-core-data-access'
import { Review } from './review.entity'

@ObjectType()
export class ReviewPaging extends PagingResponse<Review>(Review) {}
