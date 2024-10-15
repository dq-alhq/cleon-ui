'use client'

import * as React from 'react'

import { IconLoader2 } from 'cleon-icons'

import { previews } from '@/components/docs/generated/previews'
import jsonPreviews from '@/components/docs/generated/previews.json'
import { Code } from '@/components/docs/rehype/code'
import { Tabs } from '@/components/ui'
import { cn } from '@/lib/utils'

interface HowProps extends React.HTMLAttributes<HTMLDivElement> {
    toUse: string
    minW72?: boolean
    align?: 'center' | 'start' | 'end'
    description?: string
    isCenter?: boolean
    className?: string
    withNoPadding?: boolean
}

export function DocHow({
    toUse,
    children,
    className,
    minW72 = false,
    isCenter = true,
    align = 'center',
    description,
    withNoPadding = false,
    ...props
}: HowProps) {
    const Preview = previews[toUse] ? previews[toUse].component : null

    // @ts-ignore
    const codeString = jsonPreviews[toUse].raw ?? ''
    return (
        <div className={cn('group relative my-4', className)} {...props}>
            <Tabs aria-label='Packages'>
                <Tabs.List className='overflow-x-scroll'>
                    <Tabs.Label id='preview'>Preview</Tabs.Label>
                    <Tabs.Label id='code'>Code</Tabs.Label>
                </Tabs.List>
                <Tabs.Content className='w-full' id='preview'>
                    <div
                        className={cn(
                            !withNoPadding &&
                                'relative gap-4 rounded-lg border bg-background p-6',
                            isCenter &&
                                'preview flex min-h-56 items-center justify-center py-6 sm:py-24 lg:min-h-80'
                        )}
                    >
                        <React.Suspense
                            fallback={
                                <div className='flex items-center text-sm text-muted-foreground'>
                                    <IconLoader2 className='mr-2 size-4 animate-spin' />
                                    Loading...
                                </div>
                            }
                        >
                            <div className={cn(minW72 && 'min-w-72', className)}>
                                <Preview />
                            </div>
                        </React.Suspense>
                    </div>
                </Tabs.Content>
                <Tabs.Content className='not-prose' id='code'>
                    <Code code={codeString} />
                </Tabs.Content>
            </Tabs>
        </div>
    )
}
