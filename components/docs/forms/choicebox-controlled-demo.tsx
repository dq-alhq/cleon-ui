'use client'

import React from 'react'

import type { Selection } from 'react-aria-components'

import { Choicebox, Description } from '@/components/ui'

export default function ChoiceboxControlledDemo() {
    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
        new Set([packages[0].id])
    )
    return (
        <>
            <Choicebox
                aria-label='Select packages'
                selectionMode='multiple'
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
                items={packages}
            >
                {(item) => <Choicebox.Item {...item} />}
            </Choicebox>

            <Description className='mt-2 block [&>strong]:text-foreground text-muted-foreground'>
                You have selected: <strong>{Array.from(selectedKeys).join(', ')}</strong>
            </Description>
        </>
    )
}

const packages = [
    {
        id: 'sm',
        title: 'Small',
        description: 'Perfect for beginners. Basic resources for light projects.'
    },
    {
        id: 'md',
        title: 'Medium',
        description: 'Great for growing sites. More power and storage.'
    },
    {
        id: 'lg',
        title: 'Large',
        description: 'Ideal for busy sites. Lots of resources and support.'
    },
    {
        id: 'xl',
        title: 'Extra Large',
        description: 'Max power for demanding applications. Top-tier performance.'
    }
]
