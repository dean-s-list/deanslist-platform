import {
  ManagerCreateProjectInput,
  ManagerFindManyProjectInput,
  ManagerUpdateProjectInput,
  Project,
} from '@deanslist-platform/sdk'
import { getAliceCookie, sdk, uniqueId } from '../support'

describe('api-project-feature', () => {
  describe('api-project-user-resolver', () => {
    const projectName = uniqueId('acme-project')
    let communityId: string
    let projectId: string
    let alice: string

    beforeAll(async () => {
      alice = await getAliceCookie()
      communityId = await sdk
        .managerCreateCommunity({ input: { name: uniqueId('community') } }, { cookie: alice })
        .then((res) => res.data.created.id)
      projectId = await sdk
        .managerCreateProject({ input: { communityId, name: projectName } }, { cookie: alice })
        .then((res) => res.data.created.id)
    })

    describe('authorized', () => {
      it('should create a project', async () => {
        const input: ManagerCreateProjectInput = {
          communityId,
          name: uniqueId('project'),
        }

        const res = await sdk.managerCreateProject({ input }, { cookie: alice })

        const item: Project = res.data.created
        expect(item.name).toBe(input.name)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a project', async () => {
        const createInput: ManagerCreateProjectInput = {
          communityId,
          name: uniqueId('project'),
        }
        const createdRes = await sdk.managerCreateProject({ input: createInput }, { cookie: alice })
        const projectId = createdRes.data.created.id
        const input: ManagerUpdateProjectInput = {
          name: uniqueId('project'),
        }

        const res = await sdk.managerUpdateProject({ projectId, input }, { cookie: alice })

        const item: Project = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of projects (find all)', async () => {
        const createInput: ManagerCreateProjectInput = {
          communityId,
          name: uniqueId('project'),
        }
        const createdRes = await sdk.managerCreateProject({ input: createInput }, { cookie: alice })
        const projectId = createdRes.data.created.id

        const input: ManagerFindManyProjectInput = { limit: 10000 }

        const res = await sdk.managerFindManyProject({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data.map((i) => i.id)).toContain(projectId)
      })

      it('should find a list of projects (find new one)', async () => {
        const createInput: ManagerCreateProjectInput = {
          communityId,
          name: uniqueId('project'),
        }
        const createdRes = await sdk.managerCreateProject({ input: createInput }, { cookie: alice })
        const projectId = createdRes.data.created.id

        const input: ManagerFindManyProjectInput = {
          search: projectId,
        }

        const res = await sdk.managerFindManyProject({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(projectId)
      })

      it('should find a project by id', async () => {
        const createInput: ManagerCreateProjectInput = {
          communityId,
          name: uniqueId('project'),
        }
        const createdRes = await sdk.managerCreateProject({ input: createInput }, { cookie: alice })
        const projectId = createdRes.data.created.id

        const res = await sdk.managerFindOneProject({ projectId }, { cookie: alice })

        expect(res.data.item.id).toBe(projectId)
      })

      it('should delete a project', async () => {
        const createInput: ManagerCreateProjectInput = {
          communityId,
          name: uniqueId('project'),
        }
        const createdRes = await sdk.managerCreateProject({ input: createInput }, { cookie: alice })
        const projectId = createdRes.data.created.id

        const res = await sdk.managerDeleteProject({ projectId }, { cookie: alice })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.managerFindManyProject({ input: { search: projectId } }, { cookie: alice })
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })
  })
})
