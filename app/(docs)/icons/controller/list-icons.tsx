import React from 'react'

import { Loader } from '@/components/ui'
import Icons from '@/lib/icons.json'

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
    const categories = new Set(Icons?.map((icon) => icon.category))
    const filteredIcons = Icons.filter(
        (icon) =>
            icon.name.toLowerCase().includes(query.toLowerCase()) ||
            icon.category.toLowerCase().includes(query.toLowerCase()) ||
            icon.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
    ).filter((icon) => icon.category === category || category === 'all')
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
