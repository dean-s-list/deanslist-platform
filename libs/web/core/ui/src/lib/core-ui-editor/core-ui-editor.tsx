import { modals } from '@mantine/modals'
import { RichTextEditor } from '@mantine/tiptap'
import { IconPhoto } from '@tabler/icons-react'
import { Editor } from '@tiptap/react'
import { cardGradient, modalStyles } from '../core-ui-constants'
import { CoreUiEditorAddImageForm } from './core-ui-editor-add-image-form'

export interface CoreUiEditorProps {
  editor: Editor
}

export function CoreUiEditor({ editor }: CoreUiEditorProps) {
  if (!editor) {
    return null
  }

  function addImage() {
    modals.open({
      title: 'Add image from URL',
      centered: true,
      radius: 'xl',
      styles: { ...modalStyles },
      children: (
        <CoreUiEditorAddImageForm
          close={(src) => {
            if (src.length) {
              editor.chain().focus().setImage({ src }).run()
            }
            modals.closeAll()
          }}
        />
      ),
    })
  }

  return (
    <RichTextEditor
      editor={editor}
      styles={{
        root: {
          ...cardGradient,
          borderRadius: 24,
        },
        toolbar: {
          background: 'transparent',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          borderBottom: 0,
          paddingTop: 20,
          paddingBottom: 0,
        },
        content: {
          background: 'transparent',
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
        },
        control: {
          color: 'white',
        },
        controlsGroup: {
          background: 'transparent',
        },
      }}
    >
      <RichTextEditor.Toolbar sticky stickyOffset={60}>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Code />
        </RichTextEditor.ControlsGroup>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Control onClick={addImage}>
            <IconPhoto size="1rem" stroke={1.5} />
          </RichTextEditor.Control>
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
          <RichTextEditor.Blockquote />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Undo />
          <RichTextEditor.Redo />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  )
}
