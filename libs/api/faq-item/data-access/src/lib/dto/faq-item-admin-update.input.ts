import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class FaqItemAdminUpdateInput {
  @Field({ nullable: true })
  question?: string
  @Field({ nullable: true })
  answer?: string
  @Field(() => Int, { nullable: true })
  order?: number
}
