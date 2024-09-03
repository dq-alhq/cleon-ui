'use client'

import React from 'react'

import {
    IconBrandBun,
    IconBrandGithub,
    IconBrandNpm,
    IconBrandPnpm,
    IconBrandYarn,
    IconCheck,
    IconClipboard
} from 'cleon-icons'
import { AnimatePresence, motion } from 'framer-motion'
import { Header, Text } from 'react-aria-components'
import { Button, buttonVariants, Link, Menu, SearchField, Select } from 'ui'

import { Footer } from '@/components/footer'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'

import { IconsList } from './icon-list'

export default function IconsPage() {
    const [size, setSize] = React.useState<'size-4' | 'size-5' | 'size-6'>('size-5')
    const [search, setSearch] = React.useState('')
    const [strokeWidth, setStrokeWidth] = React.useState<'1' | '2'>('2')

    function handleSearch(value: string) {
        setSearch(value)
    }
    return (
        <main className='min-h-screen flex flex-col'>
            <div className='pt-10 lg:pt-24 flex container justify-between'>
                <div>
                    <Header>
                        <h1 className='max-w-xl text-2xl font-bold lg:text-5xl mb-2 lg:mb-6'>
                            CLEON ICONS
                        </h1>
                        <Text className='text-base lg:text-xl max-w-2xl block leading-relaxed text-muted-foreground'>
                            This UI Icon Library for Project, currently only for
                            <strong className='text-foreground'> React</strong>, most of
                            these icons are forked from{' '}
                            <a
                                target='_blank'
                                className='text-foreground font-semibold hover:text-primary'
                                href='https://tabler.io/icons'
                            >
                                Tabler Icons
                            </a>{' '}
                            and{' '}
                            <a
                                target='_blank'
                                className='text-foreground font-semibold hover:text-primary'
                                href='https://lucide.dev/icons/'
                            >
                                Lucide Icons
                            </a>
                        </Text>
                        <Text className='text-base lg:text-xl max-w-2xl block leading-relaxed text-muted-foreground mt-4'>
                            This Icon Libray used as default icon for{' '}
                            <a
                                target='_blank'
                                className='text-foreground font-semibold hover:text-primary'
                                href='/'
                            >
                                CLEON UI
                            </a>
                        </Text>
                    </Header>
                    <div className='mt-8 flex items-center gap-3 flex-col sm:flex-row'>
                        <Install />
                        <Link
                            target='_blank'
                            className={cn(
                                buttonVariants({ size: 'lg', variant: 'dark' }),
                                'w-full sm:w-auto'
                            )}
                            href='https://github.com/dq-alhq/cleon-icons'
                        >
                            <IconBrandGithub />
                            Source
                        </Link>
                    </div>
                </div>
            </div>
            <div className='container bg-background backdrop-blur-sm flex flex-col-reverse sm:flex-row gap-3 justify-between items-center lg:sticky lg:top-14 py-6 z-10'>
                <SearchField
                    aria-label='Search Icon'
                    value={search}
                    onChange={handleSearch}
                    className='w-full max-w-xl'
                />
                <div className='flex gap-2 w-full sm:w-auto'>
                    <Select
                        aria-label='Stroke Width'
                        className='w-28'
                        selectedKey={strokeWidth}
                        onSelectionChange={(value) => setStrokeWidth(value as '1' | '2')}
                    >
                        <Select.Item id='1'>Stroke 1</Select.Item>
                        <Select.Item id='2'>Stroke 2</Select.Item>
                    </Select>
                    <Select
                        aria-label='Icon Size'
                        className='w-full sm:w-36'
                        selectedKey={size}
                        onSelectionChange={(value) =>
                            setSize(value as 'size-4' | 'size-5' | 'size-6')
                        }
                    >
                        <Select.Item id='size-4'>Size 4 (20px)</Select.Item>
                        <Select.Item id='size-5'>Size 5 (24px)</Select.Item>
                        <Select.Item id='size-6'>Size 6 (28px)</Select.Item>
                        <Select.Item id='size-7'>Size 7 (32px)</Select.Item>
                    </Select>
                    <ThemeToggle />
                </div>
            </div>
            <div className='container py-4 flex gap-8 items-start'>
                <IconsList query={search} size={size} stroke={strokeWidth} />
            </div>
            <Footer />
        </main>
    )
}

type Tool = 'Bun' | 'Yarn' | 'PNPM' | 'NPM'

function Install() {
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
