import { OrderDirection, ProjectOrderBy } from '../generated/graphql-sdk'

export type ProjectOrderByOption = {
  label: string
  value: string
  direction: OrderDirection
}

export const projectOrderByOptions: ProjectOrderByOption[] = Object.keys(ProjectOrderBy)
  .map((key) =>
    Object.keys(OrderDirection).map((direction) => ({
      label: key.replace('At', ' at').replace('Date', ' date'),
      value: `${key}-${direction}`,
      direction: direction as OrderDirection,
    })),
  )
  .flat()
