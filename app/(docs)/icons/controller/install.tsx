'use client'

import React from 'react'

import {
    IconBrandBun,
    IconBrandNpm,
    IconBrandPnpm,
    IconBrandYarn,
    IconCheck,
    IconClipboard
} from 'cleon-icons'
import { AnimatePresence, motion } from 'framer-motion'

import { Button, Menu } from '@/components/ui'

type Tool = 'Bun' | 'Yarn' | 'PNPM' | 'NPM'

export default function Install() {
    const [isCopied, setIsCopied] = React.useState(false)
    const [command, setCommand] = React.useState('')
    const commandArgs = 'cleon-icons'

    const installMap: Record<Tool, string> = {
        Bun: 'bun add',
        Yarn: 'yarn add',
        PNPM: 'pnpm add',
        NPM: 'npm i'
    }

    const handleCopy = async (tool: Tool) => {
        const newCommand = `${installMap[tool]} ${commandArgs}`
        setCommand(newCommand)
        await navigator.clipboard.writeText(newCommand)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
    }

    return (
        <div className='pl-3 bg-background font-mono text-sm border flex items-center justify-between p-1 rounded-lg w-full h-12 sm:w-72'>
            {command || 'npm i cleon-icons'}
            <Menu>
                <Button size='icon' variant='outline' aria-label='Copy npm command'>
                    <AnimatePresence mode='wait' initial={false}>
                        {isCopied ? (
                            <motion.span
                                key='checkmark-import'
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <IconCheck />
                            </motion.span>
                        ) : (
                            <motion.span
                                key='copy'
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <IconClipboard />
                            </motion.span>
                        )}
                    </AnimatePresence>
                </Button>
                <Menu.Content showArrow placement='bottom end'>
                    <Menu.Item onAction={() => handleCopy('NPM')}>
                        <IconBrandNpm />
                        NPM
                    </Menu.Item>
                    <Menu.Item onAction={() => handleCopy('Bun')}>
                        <IconBrandBun />
                        Bun
                    </Menu.Item>
                    <Menu.Item onAction={() => handleCopy('Yarn')}>
                        <IconBrandYarn />
                        Yarn
                    </Menu.Item>
                    <Menu.Item onAction={() => handleCopy('PNPM')}>
                        <IconBrandPnpm />
                        PNPM
                    </Menu.Item>
                </Menu.Content>
            </Menu>
        </div>
    )
}
