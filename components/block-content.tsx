'use client'

import * as React from 'react'

import jsonPreviews from '@/components/blocks/generated/previews.json'
import { Code } from '@/components/docs/rehype/code'
import { Tabs, Toggle } from '@/components/ui'
import { cn } from '@/lib/utils'
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
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 24 24'
                                >
                                    <path
                                        fill='none'
                                        stroke='currentColor'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M6 5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2zm5-1h2m-1 13v.01'
                                    ></path>
                                </svg>
                            </Toggle>
                            <Toggle
                                variant='success'
                                size='icon'
                                isSelected={screenWidth === 'max-w-3xl'}
                                onChange={() => setScreenWidth('max-w-3xl')}
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 24 24'
                                >
                                    <g
                                        fill='none'
                                        stroke='currentColor'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                    >
                                        <path d='M5 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z'></path>
                                        <path d='M11 17a1 1 0 1 0 2 0a1 1 0 0 0-2 0'></path>
                                    </g>
                                </svg>
                            </Toggle>
                            <Toggle
                                variant='danger'
                                size='icon'
                                isSelected={screenWidth === 'max-w-none'}
                                onChange={() => setScreenWidth('max-w-none')}
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 24 24'
                                >
                                    <path
                                        fill='none'
                                        stroke='currentColor'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M3 5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zm4 15h10m-8-4v4m6-4v4'
                                    ></path>
                                </svg>
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
