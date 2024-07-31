import { registerEnumType } from '@nestjs/graphql'
import { ProjectRole } from '@prisma/client'

export { ProjectRole }

registerEnumType(ProjectRole, { name: 'ProjectRole' })
