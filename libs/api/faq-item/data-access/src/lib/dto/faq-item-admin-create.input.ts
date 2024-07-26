import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class FaqItemAdminCreateInput {
  @Field()
  question!: string
}
