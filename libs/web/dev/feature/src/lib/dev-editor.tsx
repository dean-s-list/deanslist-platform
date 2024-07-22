import { CoreUiCard, CoreUiContent, CoreUiDebug, CoreUiEditor, useCoreUiEditor } from '@deanslist-platform/web-core-ui'
import { Button, SimpleGrid } from '@mantine/core'
import { UiStack } from '@pubkey-ui/core'
import { useState } from 'react'

const content =
  '<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>'

export function DevEditor() {
  return (
    <CoreUiCard title="Editor">
      <DevEditorDemo />
    </CoreUiCard>
  )
}

function DevEditorDemo() {
  const [json, setJson] = useState<unknown | undefined>(undefined)
  const [html, setHtml] = useState<string | undefined>(undefined)
  const { editor } = useCoreUiEditor({ content })

  return (
    <UiStack>
      <SimpleGrid cols={{ base: 1, md: 2 }}>
        <CoreUiEditor editor={editor} />
        <UiStack>
          <Button.Group>
            <Button
              onClick={() => {
                setHtml('')
                setJson(editor?.getJSON())
              }}
            >
              JSON
            </Button>
            <Button
              onClick={() => {
                setJson('')
                setHtml(editor?.getHTML())
              }}
            >
              HTML
            </Button>
          </Button.Group>
          {json ? <CoreUiDebug h={500} data={json} open hideButton /> : null}
          {html ? <CoreUiContent content={html} /> : null}
        </UiStack>
      </SimpleGrid>
    </UiStack>
  )
}
