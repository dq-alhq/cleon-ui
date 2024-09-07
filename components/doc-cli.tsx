'use client'

import React from 'react'

import { IconBrandBun, IconBrandNpm, IconBrandPnpm, IconBrandYarn } from 'cleon-icons'
import { toast } from 'sonner'

import { CopyButton, Menu } from '@/components/ui'
import { wait } from '@/lib/utils'

interface CliProps {
    add?: string
    init?: boolean
    message?: string
}

const DocCli: React.FC<CliProps> = ({ add, init = false, message }) => {
    const getInstallCommand = (packageManager: string) => {
        switch (packageManager) {
            case 'bun':
                return `bunx cleon`
            case 'yarn':
                return `npx cleon`
            case 'pnpm':
                return `pnpm dlx cleon`
            case 'npm':
            default:
                return `npx cleon`
        }
    }

    const [currentPackageManager, setCurrentPackageManager] = React.useState('npm')

    const [copied, setCopied] = React.useState(false)

    const handleCopy = async (packageManager: string) => {
        setCurrentPackageManager(packageManager)
        const text = init
            ? `${getInstallCommand(currentPackageManager)} init`
            : `${getInstallCommand(currentPackageManager)} add ${add}`
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            wait(2000).then(() => setCopied(false))
        } else {
            toast.error('Failed to copy to clipboard')
        }
    }

    return (
        <section>
            <p className='mt-2 mb-4 text-base prose max-w-none'>
                {message
                    ? message
                    : 'In the terminal, run the following command to begin:'}
            </p>
            <div className='text-zinc-200 bg-zinc-900 font-mono text-sm border flex items-center justify-between p-4 rounded-lg w-full h-12'>
                {init
                    ? `${getInstallCommand(currentPackageManager)} init`
                    : `${getInstallCommand(currentPackageManager)} add ${add}`}
                <Menu>
                    <CopyButton isCopied={copied} />
                    <Menu.Content showArrow placement='bottom end'>
                        <Menu.Item onAction={() => handleCopy('npm')}>
                            <IconBrandNpm />
                            NPM
                        </Menu.Item>
                        <Menu.Item onAction={() => handleCopy('bun')}>
                            <IconBrandBun />
                            Bun
                        </Menu.Item>
                        <Menu.Item onAction={() => handleCopy('yarn')}>
                            <IconBrandYarn />
                            Yarn
                        </Menu.Item>
                        <Menu.Item onAction={() => handleCopy('pnpm')}>
                            <IconBrandPnpm />
                            PNPM
                        </Menu.Item>
                    </Menu.Content>
                </Menu>
            </div>
        </section>
    )
}

export { DocCli }
