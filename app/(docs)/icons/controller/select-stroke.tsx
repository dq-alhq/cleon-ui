'use client'

import React from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Select } from '@/components/ui'

export default function SelectStroke() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    const [size, setSize] = React.useState(searchParams.get('stroke') || '2')

    const createQuery = React.useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)
            return params.toString()
        },
        [searchParams]
    )

    const handleSelect = (v: string) => {
        setSize(v as '1' | '2')
        router.push(`${pathname}?${createQuery('stroke', v)}`, { scroll: false })
    }

    return (
        <Select
            aria-label='Stroke Width'
            className='w-28'
            selectedKey={size}
            onSelectionChange={(v) => handleSelect(v as '1' | '2')}
        >
            <Select.Item id='1'>Stroke 1</Select.Item>
            <Select.Item id='2'>Stroke 2</Select.Item>
        </Select>
    )
}
