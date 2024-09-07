import Image from 'next/image'
import type { LinkProps } from 'react-aria-components'

import { PlainCode } from '@/components/docs/rehype/plain-code'
import { Link, Snippet, type SnippetProps } from '@/components/ui'
import { useMDXComponent } from '@/lib/hooks/use-mdx'

import { BlockContent } from './block-content'
import { DocCli } from './doc-cli'
import { DocHow } from './doc-how'
import { DocInstall } from './doc-install'
import { DocInstallDeps } from './doc-install-deps'
import { DocsNote } from './doc-note'

interface MdxProps {
    code: string
}

export function MDXContent({ code }: MdxProps) {
    const Component = useMDXComponent(code)
    return (
        <Component
            components={{
                Image,
                How: DocHow,
                a: (props: LinkProps) => (
                    <Link
                        target='_blank'
                        {...props}
                        className='not-prose font-medium text-accent hover:underline'
                    />
                ),
                Note: DocsNote,
                Install: DocInstall,
                InstallDeps: DocInstallDeps,
                DocCli: DocCli,
                Block: BlockContent,
                PlainCode: PlainCode,
                Snippet: (props: SnippetProps) => (
                    <Snippet {...props} className='bg-[#0e0e10] text-white' />
                )
            }}
        />
    )
}
