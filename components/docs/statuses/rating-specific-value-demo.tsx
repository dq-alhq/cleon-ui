'use client'

import React from 'react'

import { Rating } from '@/components/ui'

export default function RatingSpecificValueDemo() {
    const [value, setValue] = React.useState(1)

    React.useEffect(() => {
        const interval = setInterval(() => {
            setValue((prev) => (prev < 15 ? prev + 1 : 15))
        }, 50)

        return () => clearInterval(interval)
    }, [])
    return <Rating maxValue={15} value={value} shape='star' size='md' />
}
