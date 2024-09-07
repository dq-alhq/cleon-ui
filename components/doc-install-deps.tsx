'use client'

import React from 'react'

import { IconBrandBun, IconBrandNpm, IconBrandPnpm, IconBrandYarn } from 'cleon-icons'
import { toast } from 'sonner'

import { CopyButton, Menu } from '@/components/ui'
import { wait } from '@/lib/utils'

interface InstallProps {
    items?: string[]
    message?: string
}

const DocInstallDeps: React.FC<InstallProps> = ({ items, message }) => {
    const getInstallCommand = (packageManager: string) => {
        switch (packageManager) {
            case 'bun':
                return `bun add ${items?.join(' ')}`
            case 'yarn':
                return `yarn add ${items?.join(' ')}`
            case 'pnpm':
                return `pnpm add ${items?.join(' ')}`
            case 'npm':
            default:
                return `npm i ${items?.join(' ')}`
        }
    }

    const [currentPackageManager, setCurrentPackageManager] = React.useState('npm')

    const [copied, setCopied] = React.useState(false)

    const handleCopy = async (packageManager: string) => {
        setCurrentPackageManager(packageManager)
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(getInstallCommand(packageManager))
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
                    : 'Make sure you install the dependencies with the following command:'}
            </p>
            <div className='text-zinc-200 bg-zinc-900 font-mono text-sm border flex items-center justify-between p-4 rounded-lg w-full h-12'>
                {getInstallCommand(currentPackageManager)}
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

export { DocInstallDeps }
