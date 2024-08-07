'use client'

import React from 'react'

import { ComboBox, Description } from '@/components/ui'

const sports = [
    { id: 1, name: 'Football' },
    { id: 2, name: 'Basketball' },
    { id: 3, name: 'Baseball' },
    { id: 4, name: 'Soccer' },
    { id: 5, name: 'Tennis' },
    { id: 6, name: 'Cricket' },
    { id: 7, name: 'Hockey' },
    { id: 8, name: 'Rugby' },
    { id: 9, name: 'Golf' }
]

export default function ComboBoxControlledDemo() {
    const [sport, setSport] = React.useState('')
    return (
        <>
            <ComboBox
                onInputChange={setSport}
                inputValue={sport}
                placeholder='Select a sports'
                label='Sports'
                items={sports}
            >
                {(item) => (
                    <ComboBox.Item key={item.id} id={item.id} textValue={item.name}>
                        {item.name}
                    </ComboBox.Item>
                )}
            </ComboBox>
            <Description className='mt-2 block [&>strong]:text-foreground text-muted-foreground'>
                You have selected: <strong>{sport}</strong>
            </Description>
        </>
    )
}
