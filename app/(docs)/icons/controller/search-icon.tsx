'use client'

import React from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { SearchField } from '@/components/ui'

export default function SearchIcon() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    const [search, setSearch] = React.useState(searchParams.get('q') || '')

    const createQuery = React.useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)
            return params.toString()
        },
        [searchParams]
    )

    const handleSearch = (v: string) => {
        setSearch(v)
        router.push(`${pathname}?${createQuery('q', v)}`, { scroll: false })
    }

    return (
        <SearchField
            className='w-full lg:max-w-xl'
            aria-label='Search for Icon'
            value={search}
            onChange={(v) => handleSearch(v)}
        />
    )
}
