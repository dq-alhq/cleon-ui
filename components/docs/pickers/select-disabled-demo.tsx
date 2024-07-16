'use client'

import { Select } from '@/components/ui'

const software = [
    { id: 1, name: 'Adobe Photoshop' }
    //...
]

export default function SelectDisabledDemo() {
    return (
        <Select
            label='Design software'
            isDisabled
            placeholder='Select a software'
            items={software}
        >
            {(item) => (
                <Select.Item id={item.id} textValue={item.name}>
                    {item.name}
                </Select.Item>
            )}
        </Select>
    )
}
