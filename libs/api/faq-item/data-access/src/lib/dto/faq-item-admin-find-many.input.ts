import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class FaqItemAdminFindManyInput {
  @Field({ nullable: true })
  search?: string
}
