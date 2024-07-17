'use client'

import React from 'react'

import { OptionPreview } from '@/components/docs/outside/option-preview'
import { Note, Select } from '@/components/ui'

const notes = ['info', 'primary', 'secondary', 'warning', 'danger', 'success'].map(
    (n) => ({
        name: n
    })
)
export default function NoteDemo() {
    const [selected, setSelected] = React.useState<any>('secondary')
    return (
        <>
            <OptionPreview>
                <Select
                    aria-labelledby='Variant'
                    className='[&_button]:h-9'
                    selectedKey={selected}
                    onSelectionChange={setSelected}
                    placeholder='Choose an variant'
                    items={notes}
                >
                    {(item) => (
                        <Select.Item id={item.name} textValue={item.name}>
                            {item.name}
                        </Select.Item>
                    )}
                </Select>
            </OptionPreview>
            <Note variant={selected as any}>
                This is just basic note, you can use it like alert or reminder. You can
                add more text to it. You can use it as you wish.
            </Note>
        </>
    )
}
