'use client'

import React from 'react'

import { CopyButton } from '@/components/ui'
import { cn } from '@/lib/utils'
import { Info } from 'lucide-react'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { copyToClipboard } from 'usemods'

function Code({ lang = 'tsx', code }: { lang?: string; code: string }) {
    const [copied, setCopied] = React.useState<string>('')

    function copyImportsToClipboard(): void {
        const importRegex = /import[\s\S]+?from\s+['"][\s\S]+?['"];?\n*/g
        const _imports = code.match(importRegex) || []
        const imports = _imports
            .map((importStatement: string) => importStatement.trim())
            .join('\n')
        copyToClipboard(imports)
            .then(() => {
                setCopied('imports')
                setTimeout(() => setCopied(''), 2000)
            })
            .catch((err: Error) => console.error('Copy failed: ', err))
    }

    return (
        <div className='relative overflow-hidden rounded-lg'>
            <div className={cn('absolute bottom-auto right-4 top-3 z-20 flex gap-1.5')}>
                <CopyRawButton code={code} />
                <CopyButton
                    initialIcon={<Info />}
                    isCopied={copied === 'imports'}
                    onPress={copyImportsToClipboard}
                />
            </div>
            <div className='[&_pre]:my-0 [&_pre]:!border-0 [&_pre]:max-h-[32rem] [&_pre]:pb-[100px] [&_pre]:overflow-auto [&_pre]:scrollbar-track-transparent [&_pre]:scrollbar-thumb-zinc-900'>
                <CodeHighlighter lang={lang} code={code} />
            </div>
        </div>
    )
}

export function CopyRawButton({ code }: { className?: string; code: any }) {
    const [copied, setCopied] = React.useState<string>('')
    const copyRaw = () => {
        copyToClipboard(code)
            .then(() => {
                setCopied('raw')
                setTimeout(() => setCopied(''), 2000)
            })
            .catch((err: Error) => {
                console.error('Copy failed: ', err)
            })
    }
    return <CopyButton isCopied={copied === 'raw'} onPress={copyRaw} />
}

interface CodeProps {
    lang?: string
    code: string
    withImportCopy?: boolean
    className?: string
}

const CodeHighlighter: React.FC<CodeProps> = ({ lang = 'tsx', code }) => {
    const [formattedCode, setFormattedCode] = React.useState('')
    const [error, setError] = React.useState('')

    React.useEffect(() => {
        const processCode = async () => {
            try {
                const file = await unified()
                    .use(remarkParse)
                    .use(remarkRehype, { allowDangerousHtml: true })
                    .use(rehypePrettyCode, {
                        keepBackground: false,
                        theme: 'vesper',
                        defaultLang: {
                            block: lang,
                            inline: 'plaintext'
                        }
                    })
                    .use(rehypeStringify, { allowDangerousHtml: true })
                    .process(`\`\`\`${lang}\n${code}\n\`\`\``)
                setFormattedCode(String(file))
            } catch (err) {
                setError('Failed to process code. Please check the configuration.')
                console.error(err)
            }
        }

        processCode()
    }, [code, lang])

    if (error) {
        return <p>Error: {error}</p>
    }

    return <div dangerouslySetInnerHTML={{ __html: formattedCode }} />
}

export { Code }
