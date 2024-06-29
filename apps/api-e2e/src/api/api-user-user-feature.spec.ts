import { User, UserFindManyUserInput, UserUpdateUserInput } from '@deanslist-platform/sdk'
import { getAliceCookie, sdk } from '../support'

describe('api-user-feature', () => {
  describe('api-user-user-resolver', () => {
    describe('authorized', () => {
      let aliceCookie: string
      let user: User | null

      beforeAll(async () => {
        aliceCookie = await getAliceCookie()
        user = await sdk.me(undefined, { cookie: aliceCookie }).then((res) => res.data.me)
      })

      it('should update a user', async () => {
        const input: UserUpdateUserInput = {
          developer: !user.developer,
        }

        const res = await sdk.userUpdateUser({ input }, { cookie: aliceCookie })

        const updated: User = res.data.updated
        expect(updated.developer).toEqual(input.developer)
      })

      it('should find a list of users (find all)', async () => {
        const input: UserFindManyUserInput = {
          limit: 1000,
        }

        const res = await sdk.userFindManyUser({ input }, { cookie: aliceCookie })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(4)
        expect(res.data.paging.data.length).toBeGreaterThan(4)
        // First item should be the one we created above
        expect(res.data.paging.data.find((item) => item.id === user.id)).toBeTruthy()
      })

      it('should find a list of users (find new one)', async () => {
        const input: UserFindManyUserInput = {
          search: user.id,
        }

        const res = await sdk.userFindManyUser({ input }, { cookie: aliceCookie })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(user.id)
      })

      it('should find a user by id', async () => {
        const res = await sdk.userFindOneUser({ username: user.username }, { cookie: aliceCookie })

        expect(res.data.item.id).toBe(user.id)
      })
    })
  })
})
