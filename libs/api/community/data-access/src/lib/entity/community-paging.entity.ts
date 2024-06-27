import { ObjectType } from '@nestjs/graphql'
import { PagingResponse } from '@deanslist-platform/api-core-data-access'
import { Community } from './community.entity'

@ObjectType()
export class CommunityPaging extends PagingResponse<Community>(Community) {}
