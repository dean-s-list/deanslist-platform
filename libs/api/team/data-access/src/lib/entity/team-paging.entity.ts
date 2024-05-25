import { ObjectType } from '@nestjs/graphql'
import { PagingResponse } from '@deanslist-platform/api-core-data-access'
import { Team } from './team.entity'

@ObjectType()
export class TeamPaging extends PagingResponse<Team>(Team) {}
