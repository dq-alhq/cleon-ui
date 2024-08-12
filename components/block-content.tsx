'use client'

import jsonPreviews from '@/components/blocks/generated/previews.json'
import { Code } from '@/components/docs/rehype/code'
import { cn } from '@/lib/utils'
import React from 'react'
import { Tabs } from 'ui'

interface HowProps extends React.HTMLAttributes<HTMLDivElement> {
    name: string
    className?: string
}

export function BlockContent({ children, name, className, ...props }: HowProps) {
    // @ts-ignore
    const codeString = jsonPreviews[name].raw ?? ''
    return (
        <div className={cn('not-prose group relative my-4', className)} {...props}>
            <Tabs aria-label='Packages'>
                <Tabs.List>
                    <Tabs.Label id='preview'>Preview</Tabs.Label>
                    <Tabs.Label id='code'>Code</Tabs.Label>
                    <span>Testing</span>
                </Tabs.List>
                <Tabs.Content className='w-full' id='preview'>
                    <div
                        className={cn(
                            'relative gap-4 rounded-lg border bg-background overflow-hidden',
                            'flex min-h-56 items-center justify-center lg:min-h-80'
                        )}
                    >
                        <iframe
                            className='w-full relative z-20'
                            height={600}
                            src={`/block/${name}`}
                        />
                    </div>
                </Tabs.Content>
                <Tabs.Content id='code'>
                    <Code code={codeString} />
                </Tabs.Content>
            </Tabs>
        </div>
    )
}
