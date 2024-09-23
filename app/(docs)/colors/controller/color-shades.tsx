import * as React from 'react'

import { ListBox } from 'react-aria-components'
import { gridStyles } from 'ui'

import type { ColorFormat } from '@react-types/color'

import { ColorItem } from './color-item'

export interface ColorProps {
    name: string
    children: {
        shade: string
        color: string
    }[]
}
export interface ColorRowProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    item: ColorProps
    children?: React.ReactNode
    selectedFormat?: ColorFormat
    tailwindVariable: boolean
}

export function ColorShades({ item, selectedFormat, tailwindVariable }: ColorRowProps) {
    return (
        <div className='p-2 bg-background border rounded-lg overflow-hidden'>
            <div className='flex mb-2 items-center justify-center'>
                <h3 className='tracking-tight text-muted-foreground font-mono text-sm font-medium sm:text-sm'>
                    {item.name}
                </h3>
            </div>

            <ListBox
                layout='grid'
                orientation='horizontal'
                className={gridStyles({
                    columns: { initial: 7, lg: 11 },
                    gapX: { initial: 1, sm: 1 },
                    gapY: { initial: 2, sm: 1 }
                })}
                aria-label={`${item.name} 50-950 colors`}
                items={item.children}
            >
                {item.children.map((color, i) => (
                    <ColorItem
                        tailwindVariable={tailwindVariable}
                        key={i}
                        {...{
                            selectedFormat: selectedFormat ?? 'hsl',
                            item: color,
                            name: item.name
                        }}
                    />
                ))}
            </ListBox>
        </div>
    )
}
