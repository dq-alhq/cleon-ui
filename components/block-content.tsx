'use client'

import jsonPreviews from '@/components/blocks/generated/previews.json'
import { Code } from '@/components/docs/rehype/code'
import { cn } from '@/lib/utils'
import { MonitorIcon, SmartphoneIcon, TabletIcon } from 'lucide-react'
import React from 'react'
import { Tabs, Toggle } from 'ui'
import PreviewContent from './preview-content'

type screenWidthType = 'max-w-none' | 'max-w-3xl' | 'max-w-sm'

interface HowProps extends React.HTMLAttributes<HTMLDivElement> {
    name: string
    className?: string
}

export function BlockContent({ children, name, className, ...props }: HowProps) {
    // @ts-ignore
    const [codeString, setCodeString] = React.useState<string>('')
    const [page, setPage] = React.useState('')
    React.useEffect(() => {
        const preview = jsonPreviews[name as keyof typeof jsonPreviews]
        if (preview) {
            setCodeString(preview.raw)
            setPage(name)
        }
    }, [name])

    const [screenWidth, setScreenWidth] = React.useState<screenWidthType>('max-w-none')

    return (
        <div className={cn('not-prose group relative my-6', className)} {...props}>
            <Tabs aria-label='Blocks'>
                <Tabs.List>
                    <Tabs.Label id='preview'>Preview</Tabs.Label>
                    <Tabs.Label id='code'>Code</Tabs.Label>
                </Tabs.List>
                <Tabs.Content className='w-full' id='preview'>
                    <div
                        className={cn(
                            'relative bg-background',
                            'flex min-h-56 items-center lg:min-h-80'
                        )}
                    >
                        <div className='absolute hidden sm:-top-16 right-0 sm:flex gap-1 items-center'>
                            <Toggle
                                variant='primary'
                                size='icon'
                                isSelected={screenWidth === 'max-w-sm'}
                                onChange={() => setScreenWidth('max-w-sm')}
                            >
                                <SmartphoneIcon />
                            </Toggle>
                            <Toggle
                                variant='success'
                                size='icon'
                                isSelected={screenWidth === 'max-w-3xl'}
                                onChange={() => setScreenWidth('max-w-3xl')}
                            >
                                <TabletIcon />
                            </Toggle>
                            <Toggle
                                variant='danger'
                                size='icon'
                                isSelected={screenWidth === 'max-w-none'}
                                onChange={() => setScreenWidth('max-w-none')}
                            >
                                <MonitorIcon />
                            </Toggle>
                        </div>
                        <PreviewContent name={page} className={screenWidth} />
                    </div>
                </Tabs.Content>
                <Tabs.Content id='code'>
                    <Code code={codeString} />
                </Tabs.Content>
            </Tabs>
        </div>
    )
}
