import { previews } from '@/components/blocks/generated/previews'
import { Loader2Icon } from 'lucide-react'
import React from 'react'
export default async function BlockPage({ params }: { params: { name: string } }) {
    const { name } = params
    const Preview = previews[name] ? previews[name].component : null
    return (
        <React.Suspense
            fallback={
                <div className='flex w-full justify-center h-screen items-center text-sm text-muted-foreground'>
                    <Loader2Icon className='mr-2 size-4 animate-spin' />
                    Loading...
                </div>
            }
        >
            <Preview />
        </React.Suspense>
    )
}
