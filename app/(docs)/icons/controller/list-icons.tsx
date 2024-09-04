import React from 'react'

import type * as cleonicons from 'cleon-icons'

import { Loader } from '@/components/ui'
import icons from '@/lib/icons.json'
import { kebabToPascal } from '@/lib/utils'

import CategoriesList from './categories-list'
import { IconComponent } from './icon-component'

export default function ListIcons({
    size = '5',
    stroke = '2',
    color = 'black',
    category = 'all',
    query
}: {
    color: string
    size: string
    stroke: string
    category: string
    query: string
}) {
    const categories = new Set(icons?.map((icon) => icon.category))
    const filteredIcons = icons
        .filter(
            (icon) =>
                icon.name.includes(query) || icon.tags.some((tag) => tag.includes(query))
        )
        .filter((icon) => icon.category === category || category === 'all')
    return (
        <>
            <React.Suspense
                fallback={
                    <div className='flex justify-center items-center min-h-96'>
                        <Loader />
                    </div>
                }
            >
                <CategoriesList categories={Array.from(categories)} />
                <div className='sm:-mx-2 flex justify-around flex-wrap gap-4'>
                    {filteredIcons.map((item: any, i: number) => (
                        <IconComponent
                            id={item.name}
                            size={size as '4' | '5' | '6' | '7'}
                            stroke={stroke as '1' | '2'}
                            key={i}
                            color={color}
                            name={kebabToPascal(item.name) as keyof typeof cleonicons}
                        />
                    ))}
                </div>
            </React.Suspense>
        </>
    )
}
