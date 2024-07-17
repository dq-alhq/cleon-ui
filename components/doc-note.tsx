import { Note, type NoteProps } from '@/components/ui'
import type { TextProps } from 'react-aria-components'

interface DocsNoteProps extends NoteProps {
    children: TextProps['children']
}

export function DocsNote({ variant = 'primary', children }: DocsNoteProps) {
    return (
        <div className='not-prose'>
            <Note variant={variant}>{children}</Note>
        </div>
    )
}
