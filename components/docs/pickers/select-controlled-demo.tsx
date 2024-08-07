'use client'

import React from 'react'

import { Description, Select } from '@/components/ui'
import type { Key } from 'react-aria-components'

export const movies = [
    { id: 1, title: 'Inception' },
    { id: 2, title: 'The Dark Knight' },
    { id: 3, title: 'Interstellar' },
    { id: 4, title: 'The Matrix' },
    { id: 5, title: 'Pulp Fiction' }
]

export default function SelectControlledDemo() {
    const [movie, setMovie] = React.useState<Key>('')
    return (
        <>
            <Select
                selectedKey={movie}
                onSelectionChange={setMovie}
                label='Movies'
                placeholder='Select a movie'
                items={movies}
            >
                {(item) => (
                    <Select.Item id={item.id} textValue={item.title}>
                        {item.title}
                    </Select.Item>
                )}
            </Select>
            <Description className='mt-2 block [&>strong]:text-foreground text-muted-foreground'>
                You have selected: <strong>{movie}</strong>
            </Description>
        </>
    )
}
