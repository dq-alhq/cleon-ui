'use client'

import React from 'react'

import { Rating } from '@/components/ui'

export default function RatingDemo() {
    const [value, setValue] = React.useState(1)

    React.useEffect(() => {
        const interval = setInterval(() => {
            setValue((prev) => (prev < 4 ? prev + 1 : 5))
        }, 50)

        return () => clearInterval(interval)
    }, [])
    return <Rating value={value} shape='star' size='2xl' />
}
