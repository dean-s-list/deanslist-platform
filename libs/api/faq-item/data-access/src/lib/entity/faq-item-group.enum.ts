import { registerEnumType } from '@nestjs/graphql'
import { FaqItemGroup } from '@prisma/client'

export { FaqItemGroup }

registerEnumType(FaqItemGroup, { name: 'FaqItemGroup' })
