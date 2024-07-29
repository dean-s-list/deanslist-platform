import { Field, InputType, Int } from '@nestjs/graphql'
import { FaqItemGroup } from '../entity/faq-item-group.enum'

@InputType()
export class FaqItemAdminUpdateInput {
  @Field(() => FaqItemGroup, { nullable: true })
  group?: FaqItemGroup
  @Field({ nullable: true })
  question?: string
  @Field({ nullable: true })
  answer?: string
  @Field(() => Int, { nullable: true })
  order?: number
}
