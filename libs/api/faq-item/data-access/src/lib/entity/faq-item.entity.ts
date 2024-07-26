import { PagingResponse } from '@deanslist-platform/api-core-data-access'
import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class FaqItem {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date

  @Field()
  question!: string
  @Field()
  answer!: string
  @Field(() => Int, { nullable: true })
  order?: number
}
