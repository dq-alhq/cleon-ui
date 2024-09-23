'use client'

import React from 'react'

import { IconClipboard } from 'cleon-icons'
import { toast } from 'sonner'
import { copyToClipboard } from 'usemods'

import { CodeHighlighter } from '@/components/docs/rehype/code'
import { buttonVariants, CopyButton, Modal } from '@/components/ui'
import { wait } from '@/lib/utils'
import '@/styles/code.css'

export default function ThemeSnippet({ code = 'TEST' }: { code: string }) {
    const [isCopied, setIsCopied] = React.useState(false)

    function handleCopy() {
        copyToClipboard(code).then(() => {
            toast.success('Copied to clipboard', {
                classNames: {
                    toast: '[&:has([data-icon])_[data-content]]:!ml-0',
                    icon: 'hidden'
                }
            })
            setIsCopied(true)
            wait(2000).then(() => setIsCopied(false))
        })
    }
    return (
        <Modal>
            <Modal.Trigger className={buttonVariants({ variant: 'outline' })}>
                <IconClipboard /> Copy
            </Modal.Trigger>
            <Modal.Content size='3xl' isBlurred aria-label='Theme Snippet'>
                <Modal.Header>
                    <Modal.Title>Custom Styles</Modal.Title>
                    <Modal.Description>
                        Copy this code to your .css file
                    </Modal.Description>
                </Modal.Header>
                <Modal.Body>
                    <CodeHighlighter code={code} lang='css' withImportCopy={false} />
                </Modal.Body>
                <Modal.Footer>
                    <CopyButton isCopied={isCopied} onPress={() => handleCopy()} />
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    )
}
