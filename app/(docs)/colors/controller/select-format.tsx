'use client'

import React from 'react'

import { IconColorSwatch } from 'cleon-icons'
import { type ColorFormat } from 'react-aria-components'

import { buttonVariants, Menu } from '@/components/ui'


const ColorSelectors = [
    { type: 'hex', sample: '#3B82F6' },
    { type: 'rgb', sample: '59 130 246' },
    { type: 'hsl', sample: '217.22 91.22% 59.8%' }
]

type SelectFormatProps = {
    selectedFormat: ColorFormat
    setSelectedFormat: React.Dispatch<React.SetStateAction<ColorFormat>>
}

export default function SelectFormat({
    selectedFormat,
    setSelectedFormat
}: SelectFormatProps) {
    return (
        <Menu>
            <Menu.Trigger className={buttonVariants({ variant: 'outline' })}>
                <IconColorSwatch /> Format : {selectedFormat}
            </Menu.Trigger>
            <Menu.Content items={ColorSelectors}>
                {(item) => (
                    <Menu.Item
                        onAction={() => setSelectedFormat(item.type as ColorFormat)}
                        id={item.type}
                        textValue={item.type}
                    >
                        <Menu.ItemDetails label={item.type} description={item.sample} />
                    </Menu.Item>
                )}
            </Menu.Content>
        </Menu>
    )
}
