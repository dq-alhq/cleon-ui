'use client'

import { Description, MultiSelect, Tag, type SelectedKey } from '@/components/ui'
import { useListData } from 'react-stately'

const tags = [
    { id: 1, textValue: 'Travel' },
    { id: 2, textValue: 'Food' },
    { id: 3, textValue: 'Fashion' },
    { id: 4, textValue: 'Music' },
    { id: 5, textValue: 'Photography' }
]

export default function MultiSelectControlledDemo() {
    const selectedList = useListData<SelectedKey>({
        initialItems: []
    })

    return (
        <>
            <MultiSelect
                className='max-w-xs'
                onItemAdd={(key) => console.log('onItemAdd', key)}
                onItemRemove={(key) => console.log('onItemRemove', key)}
                label='Select tags'
                selectedList={selectedList}
                items={tags}
                tag={(item) => <Tag textValue={item.textValue}>{item.textValue}</Tag>}
            >
                {(item) => {
                    return (
                        <MultiSelect.Item id={item.id} textValue={item.textValue}>
                            {item.textValue}
                        </MultiSelect.Item>
                    )
                }}
            </MultiSelect>
            {selectedList.items.length > 0 && (
                <Description className='mt-2 max-w-xs block [&>strong]:text-fg text-muted-fg'>
                    You have selected:{' '}
                    <strong>
                        {selectedList.items.map((item) => item.textValue).join(', ')}
                    </strong>
                </Description>
            )}
        </>
    )
}
