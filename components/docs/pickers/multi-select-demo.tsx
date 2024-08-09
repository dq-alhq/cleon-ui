'use client'

import { MultiSelect, Tag, type SelectedKey } from '@/components/ui'
import { useListData } from 'react-stately'

export default function MultiSelectDemo() {
    const selectedList = useListData<SelectedKey>({
        initialItems: [fruits[0]]
    })
    return (
        <MultiSelect
            className='max-w-xs'
            label='Fruits'
            selectedList={selectedList}
            items={fruits}
            tag={(item) => <Tag textValue={item.textValue}>{item.textValue}</Tag>}
        >
            {(item) => {
                return (
                    <MultiSelect.Item textValue={item.textValue}>
                        {item.textValue}
                    </MultiSelect.Item>
                )
            }}
        </MultiSelect>
    )
}

const fruits: SelectedKey[] = [
    { id: 1, textValue: 'Apple' },
    { id: 2, textValue: 'Banana' },
    { id: 3, textValue: 'Cherry' },
    { id: 4, textValue: 'Date' },
    { id: 5, textValue: 'Elderberry' },
    { id: 6, textValue: 'Fig' },
    { id: 7, textValue: 'Grape' },
    { id: 8, textValue: 'Honeydew' },
    { id: 9, textValue: 'Kiwi' },
    { id: 10, textValue: 'Lemon' },
    { id: 11, textValue: 'Mango' },
    { id: 12, textValue: 'Nectarine' },
    { id: 13, textValue: 'Orange' },
    { id: 14, textValue: 'Papaya' },
    { id: 15, textValue: 'Quince' },
    { id: 16, textValue: 'Raspberry' },
    { id: 17, textValue: 'Strawberry' },
    { id: 18, textValue: 'Tangerine' },
    { id: 19, textValue: 'Ugli Fruit' },
    { id: 20, textValue: 'Watermelon' }
]
