import { FaqItem, FaqItemAdminFindManyInput, FaqItemAdminUpdateInput, FaqItemGroup } from '@deanslist-platform/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-faq-item-feature', () => {
  describe('api-faq-item-admin-resolver', () => {
    let faqItemQuestion: string
    const faqItemAnswer = uniqueId('faq-item-answer')
    let faqItemId: string
    let faqItem: FaqItem
    let cookieAlice: string
    let cookieBob: string

    beforeAll(async () => {
      faqItemQuestion = uniqueId('faq-item-question')
      cookieAlice = await getAliceCookie()
      cookieBob = await getBobCookie()
      faqItem = await sdk
        .adminCreateFaqItem(
          { input: { group: FaqItemGroup.Manager, question: faqItemQuestion } },
          { cookie: cookieAlice },
        )
        .then((res) => res.data.created)
      faqItemId = faqItem.id
    })

    describe('authorized', () => {
      it('should create a faq-item', async () => {
        expect(faqItem.question).toBe(faqItemQuestion)
        expect(faqItem.id).toBeDefined()
        expect(faqItem.createdAt).toBeDefined()
        expect(faqItem.updatedAt).toBeDefined()
      })

      it('should update a faq-item', async () => {
        const input: FaqItemAdminUpdateInput = {
          question: faqItemQuestion,
          answer: faqItemAnswer,
        }

        const res = await sdk.adminUpdateFaqItem({ faqItemId, input }, { cookie: cookieAlice })

        const item: FaqItem = res.data.updated
        expect(item.question).toBe(input.question)
      })

      it('should find a list of faqItems (find all)', async () => {
        const input: FaqItemAdminFindManyInput = {}

        const res = await sdk.adminFindManyFaqItem({ input }, { cookie: cookieAlice })

        expect(res.data.items.length).toBeGreaterThan(1)
        expect(res.data.items.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.items.map((i) => i.id)).toContain(faqItemId)
      })

      it('should find a list of faqItems (find new one)', async () => {
        const input: FaqItemAdminFindManyInput = {
          search: faqItemId,
        }

        const res = await sdk.adminFindManyFaqItem({ input }, { cookie: cookieAlice })

        expect(res.data.items.length).toBe(1)
        expect(res.data.items.length).toBe(1)
        expect(res.data.items.map((i) => i.id)).toContain(faqItemId)
      })

      it('should find a faq-item by id', async () => {
        const res = await sdk.adminFindOneFaqItem({ faqItemId }, { cookie: cookieAlice })

        expect(res.data.item.id).toBe(faqItemId)
      })

      it('should delete a faq-item', async () => {
        const res = await sdk.adminDeleteFaqItem({ faqItemId }, { cookie: cookieAlice })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindManyFaqItem({ input: { search: faqItemId } }, { cookie: cookieAlice })
        expect(findRes.data.items.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      it('should not update a faq-item', async () => {
        expect.assertions(1)
        try {
          await sdk.adminUpdateFaqItem({ faqItemId, input: {} }, { cookie: cookieBob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a faq-item by id', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindOneFaqItem({ faqItemId }, { cookie: cookieBob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not delete a faq-item', async () => {
        expect.assertions(1)
        try {
          await sdk.adminDeleteFaqItem({ faqItemId }, { cookie: cookieBob })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })
    })
  })
})
