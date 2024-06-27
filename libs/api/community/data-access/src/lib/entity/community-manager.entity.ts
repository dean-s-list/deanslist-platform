import { User } from '@deanslist-platform/api-user-data-access'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class CommunityManager {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field({ nullable: true })
  admin?: boolean
  @Field(() => User, { nullable: true })
  user?: User
  @Field()
  userId!: string
}
