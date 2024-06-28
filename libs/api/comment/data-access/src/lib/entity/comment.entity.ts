import { Rating } from '@deanslist-platform/api-rating-data-access'
import { Review } from '@deanslist-platform/api-review-data-access'
import { User } from '@deanslist-platform/api-user-data-access'
import { Field, ObjectType } from '@nestjs/graphql'
import { CommentCategory } from './comment-category.enum'

@ObjectType()
export class Comment {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field(() => CommentCategory)
  category!: CommentCategory
  @Field()
  content!: string
  @Field({ nullable: true })
  versionBrowser?: string | null
  @Field({ nullable: true })
  versionOs?: string | null
  @Field()
  reviewId!: string
  @Field(() => Review, { nullable: true })
  review?: Review
  @Field()
  authorId!: string
  @Field(() => User, { nullable: true })
  author?: User
  @Field({ nullable: true })
  parentId?: string | null
  @Field(() => [Comment], { nullable: true })
  children?: Comment[]
  @Field(() => [Rating], { nullable: true })
  ratings?: Rating[]
}
