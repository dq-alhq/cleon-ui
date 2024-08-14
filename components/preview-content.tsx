import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import React from 'react'

export default function PreviewContent({
    name,
    className
}: {
    name: string
    className?: string
}) {
    return (
        <React.Suspense fallback={<Loader2 className='size-20 bg-muted' />}>
            <iframe
                className={cn('w-full border rounded-lg relative z-20', className)}
                height={600}
                allowFullScreen
                src={`/block/${name}`}
            />
        </React.Suspense>
    )
}
