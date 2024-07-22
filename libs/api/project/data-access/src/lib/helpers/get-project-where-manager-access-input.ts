import { Prisma } from '@prisma/client'

export function getProjectWhereManagerAccessInput(userId: string): Prisma.ProjectWhereInput {
  return {
    AND: {
      OR: [
        // You are a manager of the project
        { managers: { some: { id: userId } } },
        // Or you are a manager of the community
        { community: { managers: { some: { userId } } } },
      ],
    },
  }
}
