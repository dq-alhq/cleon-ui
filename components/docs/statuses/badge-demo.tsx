'use client'

import { Badge, badgeVariants } from '@/components/ui'

type Variant = keyof typeof badgeVariants

export default function BadgeDemo() {
    return (
        <div className='flex flex-col gap-2 md:flex-row md:flex-wrap'>
            {Object.keys(badgeVariants).map((variant) => (
                <div key={variant}>
                    <Badge variant={variant as Variant}>{variant}</Badge>
                </div>
            ))}
        </div>
    )
}
