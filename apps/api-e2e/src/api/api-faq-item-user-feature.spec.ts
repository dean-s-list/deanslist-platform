import { FaqItemUserFindManyInput } from '@deanslist-platform/sdk'
import { getAliceCookie, sdk, uniqueId } from '../support'

describe('api-faq-item-feature', () => {
  describe('api-faq-item-user-resolver', () => {
    const faqItemQuestion = uniqueId('faq-item-question')
    const faqItemAnswer = uniqueId('faq-item-answer')

    let faqItemId: string
    let aliceCookie: string

    beforeAll(async () => {
      aliceCookie = await getAliceCookie()
      faqItemId = await sdk
        .adminCreateFaqItem({ input: { question: faqItemQuestion } }, { cookie: aliceCookie })
        .then((res) => res.data.created.id)
      await sdk.adminUpdateFaqItem({ faqItemId, input: { answer: faqItemAnswer } }, { cookie: aliceCookie })
    })

    describe('authorized', () => {
      it('should find a list of faqItems (find all)', async () => {
        const input: FaqItemUserFindManyInput = {}

        const res = await sdk.userFindManyFaqItem({ input }, { cookie: aliceCookie })

        expect(res.data.items.length).toBeGreaterThan(1)
        expect(res.data.items.map((i) => i.id)).toContain(faqItemId)
      })
    })
  })
})
