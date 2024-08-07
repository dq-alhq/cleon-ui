'use client'

import * as React from 'react'

import { Code } from '@/components/docs/rehype/code'
import { ContentReveal } from '@/components/ui'

interface PlainCodeProps extends React.HTMLAttributes<HTMLDivElement> {
    code: string
    lang?: string
}

export function PlainCode({ lang = 'javascript', code, ...props }: PlainCodeProps) {
    return (
        <section className='not-prose my-6 relative'>
            <ContentReveal {...props}>
                <Code lang={lang} code={code} />
            </ContentReveal>
        </section>
    )
}
