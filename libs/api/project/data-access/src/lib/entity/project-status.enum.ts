import { registerEnumType } from '@nestjs/graphql'
import { ProjectStatus } from '@prisma/client'
export { ProjectStatus }

registerEnumType(ProjectStatus, { name: 'ProjectStatus' })
