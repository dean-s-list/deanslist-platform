import { addDays } from '@deanslist-platform/api-core-data-access'
import { OrderDirection, ProjectOrderBy, ProjectStatus, ReviewerFindManyProjectInput } from '@deanslist-platform/sdk'
import { getAliceCookie, sdk, uniqueId } from '../support'

describe('api-project-feature', () => {
  describe('api-project-reviewer-resolver', () => {
    let communityId: string
    let projectId: string
    let alice: string

    beforeAll(async () => {
      alice = await getAliceCookie()
      communityId = await sdk
        .managerCreateCommunity({ input: { name: uniqueId('community') } }, { cookie: alice })
        .then((res) => res.data.created.id)

      await sdk
        .managerCreateProject({ input: { communityId, name: uniqueId('project') } }, { cookie: alice })
        .then((res) => res.data.created.id)
        .then(async (projectId) => {
          await sdk.managerUpdateProject(
            {
              projectId,
              input: {
                status: ProjectStatus.Active,
                amountTotalUsd: 1,
                startDate: new Date(),
                durationDays: 7,
              },
            },
            { cookie: alice },
          )
        })
    })

    beforeEach(async () => {
      projectId = await sdk
        .managerCreateProject({ input: { communityId, name: uniqueId('project') } }, { cookie: alice })
        .then((res) => res.data.created.id)
      await sdk.managerUpdateProject(
        {
          projectId,
          input: {
            status: ProjectStatus.Active,
            amountTotalUsd: 1_000_000,
            startDate: addDays({ date: new Date(), days: 1 }),
            durationDays: 7,
          },
        },
        { cookie: alice },
      )
    })

    describe('authorized', () => {
      it('should find a list of projects (find all)', async () => {
        const input: ReviewerFindManyProjectInput = { limit: 10000 }

        const res = await sdk.reviewerFindManyProject({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data.map((i) => i.id)).toContain(projectId)
      })

      it('should find a list of projects (find new one)', async () => {
        const input: ReviewerFindManyProjectInput = {
          search: projectId,
        }

        const res = await sdk.reviewerFindManyProject({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(projectId)
      })

      it('should find a project by id', async () => {
        const res = await sdk.reviewerFindOneProject({ projectId }, { cookie: alice })

        expect(res.data.item.id).toBe(projectId)
      })

      describe('ordering', () => {
        it('should find a list of projects (with ProjectOrderBy.Amount)', async () => {
          // ARRANGE
          const input: ReviewerFindManyProjectInput = {
            orderBy: ProjectOrderBy.Amount,
            limit: 10000,
          }
          // ACT
          const itemsAsc = await sdk
            .reviewerFindManyProject({ input: { ...input, orderDirection: OrderDirection.Asc } }, { cookie: alice })
            .then((res) => res.data.paging.data)
          const itemsDesc = await sdk
            .reviewerFindManyProject({ input: { ...input, orderDirection: OrderDirection.Desc } }, { cookie: alice })
            .then((res) => res.data.paging.data)

          // ASSERT
          expect(itemsAsc[0].amountTotalUsd).toBe(1)
          expect(itemsAsc[itemsAsc.length - 1].amountTotalUsd).toBe(1_000_000)

          expect(itemsDesc[0].amountTotalUsd).toBe(1_000_000)
          expect(itemsDesc[itemsDesc.length - 1].amountTotalUsd).toBe(1)
        })

        it('should find a list of projects (with ProjectOrderBy.EndDate)', async () => {
          // ARRANGE
          const input: ReviewerFindManyProjectInput = {
            orderBy: ProjectOrderBy.EndDate,
            limit: 10000,
          }

          // ACT
          const itemsAsc = await sdk
            .reviewerFindManyProject({ input: { ...input, orderDirection: OrderDirection.Asc } }, { cookie: alice })
            .then((res) => res.data.paging.data)

          const itemsDesc = await sdk
            .reviewerFindManyProject({ input: { ...input, orderDirection: OrderDirection.Desc } }, { cookie: alice })
            .then((res) => res.data.paging.data)

          // ASSERT
          expect(new Date(itemsAsc[0].endDate).getTime()).toBeLessThan(
            new Date(itemsAsc[itemsAsc.length - 1].endDate).getTime(),
          )
          expect(new Date(itemsDesc[0].endDate).getTime()).toBeGreaterThan(
            new Date(itemsDesc[itemsDesc.length - 1].endDate).getTime(),
          )
        })

        it('should find a list of projects (with ProjectOrderBy.CreatedAt)', async () => {
          // ARRANGE
          const input: ReviewerFindManyProjectInput = {
            orderBy: ProjectOrderBy.CreatedAt,
            limit: 10000,
          }

          // ACT
          const itemsAsc = await sdk
            .reviewerFindManyProject({ input: { ...input, orderDirection: OrderDirection.Asc } }, { cookie: alice })
            .then((res) => res.data.paging.data)

          const itemsDesc = await sdk
            .reviewerFindManyProject({ input: { ...input, orderDirection: OrderDirection.Desc } }, { cookie: alice })
            .then((res) => res.data.paging.data)

          // ASSERT
          expect(new Date(itemsAsc[0].createdAt).getTime()).toBeLessThan(
            new Date(itemsAsc[itemsAsc.length - 1].createdAt).getTime(),
          )
          expect(new Date(itemsDesc[0].createdAt).getTime()).toBeGreaterThan(
            new Date(itemsDesc[itemsDesc.length - 1].createdAt).getTime(),
          )
        })
      })
    })
  })
})
