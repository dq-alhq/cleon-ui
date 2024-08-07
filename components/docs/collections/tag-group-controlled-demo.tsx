import React from 'react'

import { Description, Tag, TagGroup, TagList } from '@/components/ui'
import type { Selection } from 'react-aria-components'

const fruitList = [
    { id: '1', name: 'Apple', available: false },
    { id: '2', name: 'Banana', available: true },
    { id: '3', name: 'Cherry', available: true },
    { id: '4', name: 'Date', available: false }
]

export default function TagGroupControlledDemo() {
    const [selected, setSelected] = React.useState<Selection>(new Set([]))
    return (
        <div>
            <TagGroup
                selectionMode='multiple'
                selectedKeys={selected}
                onSelectionChange={setSelected}
            >
                <TagList items={fruitList}>{(item) => <Tag>{item.name}</Tag>}</TagList>
            </TagGroup>

            <Description className='mt-2 block [&>strong]:text-foreground text-muted-foreground'>
                You have selected: <strong>{Array.from(selected).join(', ')}</strong>
            </Description>
        </div>
    )
}
