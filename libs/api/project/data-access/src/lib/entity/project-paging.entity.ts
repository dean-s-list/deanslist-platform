import { ObjectType } from '@nestjs/graphql'
import { PagingResponse } from '@deanslist-platform/api-core-data-access'
import { Project } from './project.entity'

@ObjectType()
export class ProjectPaging extends PagingResponse<Project>(Project) {}
