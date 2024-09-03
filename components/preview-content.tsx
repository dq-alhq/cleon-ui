import * as React from 'react'

import { IconLoader2 } from 'cleon-icons'

import { cn } from '@/lib/utils'

export default function PreviewContent({
    name,
    className
}: {
    name: string
    className?: string
}) {
    return (
        <React.Suspense fallback={<IconLoader2 className='size-20 bg-muted' />}>
            <iframe
                className={cn('w-full border rounded-lg relative z-20', className)}
                height={600}
                allowFullScreen
                src={`/block/${name}`}
            />
        </React.Suspense>
    )
}
