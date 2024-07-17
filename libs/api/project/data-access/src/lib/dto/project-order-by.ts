import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ProjectOrderBy {
  @Field()
  label!: string
  @Field()
  value!: string
  @Field()
  field!: string
  @Field({ defaultValue: 'desc' })
  sort: 'asc' | 'desc' = 'desc'
}
