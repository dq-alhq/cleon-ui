'use client'

import React from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { type Color, parseColor } from 'react-aria-components'

import { ColorPicker } from '@/components/ui'

export default function SelectColor() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    const [color, setColor] = React.useState(
        searchParams.get('c') || parseColor('#52525b')
    )

    const createQuery = React.useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)
            return params.toString()
        },
        [searchParams]
    )

    const handleSelect = (v: Color) => {
        setColor(v.toString('hex'))
        router.push(`${pathname}?${createQuery('c', v.toString('hex'))}`, {
            scroll: false
        })
    }

    return (
        <ColorPicker
            className='mr-2 w-auto'
            enableColorField={false}
            trigger='color-field'
            aria-label='Color Picker'
            value={color}
            onChange={(v: Color) => handleSelect(v)}
        />
    )
}
