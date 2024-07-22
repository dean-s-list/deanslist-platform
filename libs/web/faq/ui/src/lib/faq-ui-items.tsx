import { FaqItem } from '@deanslist-platform/web-faq-data-access'
import { Accordion } from '@mantine/core'

export function FaqUiItems({ faqs }: { faqs: FaqItem[] }) {
  return (
    <Accordion
      styles={{ item: { borderRadius: 24, border: '1px solid white' } }}
      chevronPosition="right"
      defaultValue={faqs[0].question}
      variant="separated"
    >
      {faqs.map((faq) => (
        <Accordion.Item className="gradient-card" fz="sm" c="dark.1" value={faq.question} key={faq.question}>
          <Accordion.Control>{faq.question}</Accordion.Control>
          <Accordion.Panel>{faq.answer}</Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}
