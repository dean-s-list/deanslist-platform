import { Field, InputType } from '@nestjs/graphql'
import { FaqItemGroup } from '../entity/faq-item-group.enum'

@InputType()
export class FaqItemAdminCreateInput {
  @Field(() => FaqItemGroup)
  group!: FaqItemGroup
  @Field()
  question!: string
}
