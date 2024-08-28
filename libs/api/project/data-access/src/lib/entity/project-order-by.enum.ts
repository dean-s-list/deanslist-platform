import { registerEnumType } from '@nestjs/graphql'

export enum ProjectOrderBy {
  Amount = 'amountTotalUsd',
  CreatedAt = 'createdAt',
  EndDate = 'endDate',
  UpdatedAt = 'updatedAt',
}

registerEnumType(ProjectOrderBy, { name: 'ProjectOrderBy' })
