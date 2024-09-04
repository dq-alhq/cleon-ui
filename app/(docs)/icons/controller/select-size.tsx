'use client'

import React from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Select } from '@/components/ui'

export default function SelectSize() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    const [size, setSize] = React.useState(searchParams.get('s') || '5')

    const createQuery = React.useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)
            return params.toString()
        },
        [searchParams]
    )

    const handleSelect = (v: string) => {
        setSize(v as '4' | '5' | '6' | '7')
        router.push(`${pathname}?${createQuery('s', v)}`, { scroll: false })
    }

    return (
        <Select
            aria-label='Icon Size'
            className='w-full sm:w-36'
            selectedKey={size}
            onSelectionChange={(v) => handleSelect(v as '4' | '5' | '6' | '7')}
        >
            <Select.Item id='4'>Size 4 (20px)</Select.Item>
            <Select.Item id='5'>Size 5 (24px)</Select.Item>
            <Select.Item id='6'>Size 6 (28px)</Select.Item>
            <Select.Item id='7'>Size 7 (32px)</Select.Item>
        </Select>
    )
}
