import { registerEnumType } from '@nestjs/graphql'
import { CommentCategory } from '@prisma/client'
export { CommentCategory }

registerEnumType(CommentCategory, { name: 'CommentCategory' })