import React from 'react'

import { IconLoader } from 'justd-icons'

import { previews } from '@/components/blocks/generated/previews'
export default async function BlockPage({ params }: { params: { name: string } }) {
    const { name } = params
    const Preview = previews[name] ? previews[name].component : null
    return (
        <React.Suspense
            fallback={
                <div className='flex w-full justify-center h-screen items-center text-sm text-muted-foreground'>
                    <IconLoader className='mr-2 size-4 animate-spin' />
                    Loading...
                </div>
            }
        >
            <Preview />
        </React.Suspense>
    )
}
