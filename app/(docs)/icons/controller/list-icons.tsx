import React from 'react'

import { Loader } from '@/components/ui'
import Icons from '@/lib/icons.json'

import CategoriesList from './categories-list'
import { IconComponent } from './icon-component'

interface Icon {
    name: string
    category: string
    tags: string[]
}

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
    const icons = Icons as Icon[]
    const categories = new Set(icons?.map((icon) => icon.category))
    const filteredIcons = icons
        .filter(
            (icon) =>
                icon.name.toLowerCase().includes(query) ||
                icon.category.toLowerCase().includes(query) ||
                icon.tags.some((tag: string) => tag.includes(query))
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
                            name={item.name}
                        />
                    ))}
                </div>
            </React.Suspense>
        </>
    )
}
