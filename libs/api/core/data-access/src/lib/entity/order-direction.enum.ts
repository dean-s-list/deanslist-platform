import { registerEnumType } from '@nestjs/graphql'

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc',
}
registerEnumType(OrderDirection, { name: 'OrderDirection' })
