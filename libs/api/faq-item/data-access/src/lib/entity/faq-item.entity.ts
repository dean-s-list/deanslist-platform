import { Field, Int, ObjectType } from '@nestjs/graphql'
import { FaqItemGroup } from './faq-item-group.enum'

@ObjectType()
export class FaqItem {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field(() => FaqItemGroup)
  group!: FaqItemGroup
  @Field()
  question!: string
  @Field()
  answer!: string
  @Field(() => Int, { nullable: true })
  order?: number
}
