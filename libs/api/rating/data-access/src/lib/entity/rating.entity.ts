import { User } from '@deanslist-platform/api-user-data-access'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Rating {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field({ nullable: true })
  content?: string | null
  @Field(() => Number)
  rating!: number
  @Field(() => User, { nullable: true })
  author?: User
  @Field()
  authorId!: string
  @Field()
  commentId!: string
}
