import React from 'react'

import { tv } from 'tailwind-variants'

const skeletonStyles = tv({
    base: 'animate-pulse shrink-0',
    variants: {
        color: {
            muted: 'bg-muted/50',
            lighter: 'bg-secondary'
        },
        shape: {
            circle: 'rounded-full',
            square: 'rounded-lg'
        }
    },
    defaultVariants: {
        color: 'muted',
        shape: 'square'
    }
})

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    color?: 'muted' | 'lighter'
    shape?: 'circle' | 'square'
}
const Skeleton = ({ shape, color, className, ...props }: SkeletonProps) => {
    return <div className={skeletonStyles({ shape, color, className })} {...props} />
}

export { Skeleton }
