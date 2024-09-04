'use client'

import React from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Tabs } from '@/components/ui'
import { kebabToTitle, useMediaQuery } from '@/lib/utils'

export default function CategoriesList({ categories }: { categories: string[] }) {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    const [category, setCategory] = React.useState(searchParams.get('category') || '')

    const createQuery = React.useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)
            return params.toString()
        },
        [searchParams]
    )

    const handleSelect = (v: string) => {
        setCategory(v)
        router.push(`${pathname}?${createQuery('category', v)}`, { scroll: false })
    }

    const isMobile = useMediaQuery('(max-width: 640px)')

    return (
        <Tabs
            selectedKey={category}
            onSelectionChange={(v) => handleSelect(v as string)}
            className='w-full sm:max-w-52 sm:min-w-52'
            orientation={isMobile ? 'horizontal' : 'vertical'}
        >
            <Tabs.List key='categories' aria-labelledby='categories'>
                <Tabs.Label id='all'>All</Tabs.Label>
                {categories.map((category, i) => (
                    <Tabs.Label id={category} key={category}>
                        {kebabToTitle(category)}
                    </Tabs.Label>
                ))}
            </Tabs.List>
        </Tabs>
    )
}
