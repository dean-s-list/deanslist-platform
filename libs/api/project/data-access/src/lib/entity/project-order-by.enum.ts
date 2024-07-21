import { registerEnumType } from '@nestjs/graphql'

export enum ProjectOrderBy {
  Amount = 'amountTotalUsd',
  CreatedAt = 'createdAt',
  EndDate = 'endDate',
}

registerEnumType(ProjectOrderBy, { name: 'ProjectOrderBy' })
