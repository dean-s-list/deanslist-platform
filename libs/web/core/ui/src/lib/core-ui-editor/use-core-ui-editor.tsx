import { Link } from '@mantine/tiptap'
import { Image } from '@tiptap/extension-image'
import { Placeholder } from '@tiptap/extension-placeholder'
import { Editor, EditorOptions, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { useEffect } from 'react'

export interface UserCoreUiEditorProps extends Omit<Partial<EditorOptions>, 'content'> {
  content?: string
  placeholder?: string
}

export function useCoreUiEditor({
  content = '',
  placeholder = 'Write your review here...',
  ...props
}: UserCoreUiEditorProps = {}) {
  const editor = useEditor({
    autofocus: 'start',
    content,
    extensions: [
      StarterKit,
      Link,
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: 'core-ui-content-image',
        },
      }),
      Placeholder.configure({ placeholder }),
    ],
    ...props,
  })

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  return {
    editor: editor as Editor,
  }
}
