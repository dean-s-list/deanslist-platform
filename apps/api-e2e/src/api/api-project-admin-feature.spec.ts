import { AdminFindManyProjectInput, AdminUpdateProjectInput, Project } from '@deanslist-platform/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-project-feature', () => {
  describe('api-project-admin-resolver', () => {
    let communityId: string
    let projectId: string
    let alice: string

    beforeAll(async () => {
      alice = await getAliceCookie()
      communityId = await sdk
        .userCreateCommunity({ input: { name: uniqueId('community') } }, { cookie: alice })
        .then((res) => res.data.created.id)
      projectId = await sdk
        .userCreateProject({ input: { communityId, name: uniqueId('project') } }, { cookie: alice })
        .then((res) => res.data.created.id)
    })

    describe('authorized', () => {
      it('should update a project', async () => {
        const input: AdminUpdateProjectInput = {
          name: uniqueId('project'),
        }

        const res = await sdk.adminUpdateProject({ projectId, input }, { cookie: alice })

        const item: Project = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of projects (find all)', async () => {
        const input: AdminFindManyProjectInput = { limit: 10000 }

        const res = await sdk.adminFindManyProject({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data.map((i) => i.id).includes(projectId)).toBeTruthy()
      })

      it('should find a list of projects (find new one)', async () => {
        const input: AdminFindManyProjectInput = {
          search: projectId,
        }

        const res = await sdk.adminFindManyProject({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(projectId)
      })

      it('should find a project by id', async () => {
        const res = await sdk.adminFindOneProject({ projectId }, { cookie: alice })

        expect(res.data.item.id).toBe(projectId)
      })

      it('should delete a project', async () => {
        const res = await sdk.adminDeleteProject({ projectId }, { cookie: alice })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindManyProject({ input: { search: projectId } }, { cookie: alice })
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      let bob: string
      beforeAll(async () => {
        bob = await getBobCookie()
      })

      it('should not update a project', async () => {
        expect.assertions(1)
        try {
          await sdk.adminUpdateProject({ projectId, input: {} }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a list of projects (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindManyProject({ input: {} }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a project by id', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindOneProject({ projectId }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not delete a project', async () => {
        expect.assertions(1)
        try {
          await sdk.adminDeleteProject({ projectId }, { cookie: bob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })
    })
  })
})
