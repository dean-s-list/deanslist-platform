import {
  Project,
  UserCreateProjectInput,
  UserFindManyProjectInput,
  UserUpdateProjectInput,
} from '@deanslist-platform/sdk'
import { getAliceCookie, sdk, uniqueId } from '../support'

describe('api-project-feature', () => {
  describe('api-project-user-resolver', () => {
    const projectName = uniqueId('acme-project')
    let teamId: string
    let projectId: string
    let alice: string

    beforeAll(async () => {
      alice = await getAliceCookie()
      teamId = await sdk
        .userCreateTeam({ input: { name: uniqueId('team') } }, { cookie: alice })
        .then((res) => res.data.created.id)
      projectId = await sdk
        .userCreateProject({ input: { teamId, name: projectName } }, { cookie: alice })
        .then((res) => res.data.created.id)
    })

    describe('authorized', () => {
      it('should create a project', async () => {
        const input: UserCreateProjectInput = {
          teamId,
          name: uniqueId('project'),
        }

        const res = await sdk.userCreateProject({ input }, { cookie: alice })

        const item: Project = res.data.created
        expect(item.name).toBe(input.name)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a project', async () => {
        const createInput: UserCreateProjectInput = {
          teamId,
          name: uniqueId('project'),
        }
        const createdRes = await sdk.userCreateProject({ input: createInput }, { cookie: alice })
        const projectId = createdRes.data.created.id
        const input: UserUpdateProjectInput = {
          name: uniqueId('project'),
        }

        const res = await sdk.userUpdateProject({ projectId, input }, { cookie: alice })

        const item: Project = res.data.updated
        expect(item.name).toBe(input.name)
      })

      it('should find a list of projects (find all)', async () => {
        const createInput: UserCreateProjectInput = {
          teamId,
          name: uniqueId('project'),
        }
        const createdRes = await sdk.userCreateProject({ input: createInput }, { cookie: alice })
        const projectId = createdRes.data.created.id

        const input: UserFindManyProjectInput = {}

        const res = await sdk.userFindManyProject({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data[0].id).toBe(projectId)
      })

      it('should find a list of projects (find new one)', async () => {
        const createInput: UserCreateProjectInput = {
          teamId,
          name: uniqueId('project'),
        }
        const createdRes = await sdk.userCreateProject({ input: createInput }, { cookie: alice })
        const projectId = createdRes.data.created.id

        const input: UserFindManyProjectInput = {
          search: projectId,
        }

        const res = await sdk.userFindManyProject({ input }, { cookie: alice })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(projectId)
      })

      it('should find a project by id', async () => {
        const createInput: UserCreateProjectInput = {
          teamId,
          name: uniqueId('project'),
        }
        const createdRes = await sdk.userCreateProject({ input: createInput }, { cookie: alice })
        const projectId = createdRes.data.created.id

        const res = await sdk.userFindOneProject({ projectId }, { cookie: alice })

        expect(res.data.item.id).toBe(projectId)
      })

      it('should delete a project', async () => {
        const createInput: UserCreateProjectInput = {
          teamId,
          name: uniqueId('project'),
        }
        const createdRes = await sdk.userCreateProject({ input: createInput }, { cookie: alice })
        const projectId = createdRes.data.created.id

        const res = await sdk.userDeleteProject({ projectId }, { cookie: alice })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.userFindManyProject({ input: { search: projectId } }, { cookie: alice })
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })
  })
})
