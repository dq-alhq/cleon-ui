'use client'

import React from 'react'

import { Description, Rating } from '@/components/ui'

export default function RatingControlledDemo() {
    const [rating, setRating] = React.useState<number>(3.5)
    return (
        <div>
            <Rating
                value={rating}
                minValue={1}
                maxValue={5}
                onChange={(e) => setRating(e as number)}
                label='Rating'
                size='3xl'
                showValue={true}
            />
            <Description className='mt-2 block [&>strong]:text-foreground'>
                Current Rating: <strong>{rating ?? '-'}</strong>
            </Description>
        </div>
    )
}
