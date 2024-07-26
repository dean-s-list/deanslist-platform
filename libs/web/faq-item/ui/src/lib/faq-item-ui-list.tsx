import { FaqItem } from '@deanslist-platform/sdk'
import { CoreUiContent } from '@deanslist-platform/web-core-ui'
import { Accordion } from '@mantine/core'

export function FaqItemUiList({ items }: { items: FaqItem[] }) {
  return (
    <Accordion
      styles={{ item: { borderRadius: 24, border: '1px solid white' } }}
      chevronPosition="right"
      defaultValue={items[0].question}
      variant="separated"
    >
      {items.map((item) => (
        <Accordion.Item className="gradient-card" fz="sm" c="dark.1" value={item.question} key={item.question}>
          <Accordion.Control>{item.question}</Accordion.Control>
          <Accordion.Panel>
            <CoreUiContent content={item.answer} />
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}
