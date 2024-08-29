'use client'

import React from 'react'

import { Rating } from '@/components/ui'

const shapes = ['star', 'heart', 'diamond', 'triangle', 'circle', 'square'] as const

export default function RatingShapesDemo() {
    const [value, setValue] = React.useState(1)

    React.useEffect(() => {
        const interval = setInterval(() => {
            setValue((prev) => (prev < 5 ? prev + 1 : 5))
        }, 50)

        return () => clearInterval(interval)
    }, [])
    return (
        <div className='flex flex-col gap-2 items-center justify-center'>
            {shapes.map((shape, i) => (
                <div key={i}>
                    <Rating value={value} shape={shape} size='xl' />
                </div>
            ))}
        </div>
    )
}
