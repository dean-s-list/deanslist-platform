import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserUpdateUserInput {
  @Field({ nullable: true })
  developer?: boolean
}
