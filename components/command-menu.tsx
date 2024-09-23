'use client'

import React from 'react'

import { docs } from '#site/content'
import {
    IconColorSwatch,
    IconHome,
    IconPackage,
    IconPaint,
    IconShapes2,
    IconTemplate
} from 'cleon-icons'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Command } from 'ui'

import type { Doc, HierarchyNode } from '@/components/aside'
import { createHierarchy } from '@/components/aside'
import { titleCase, useMediaQuery } from '@/lib/utils'

export interface OpenCloseProps {
    open: boolean
    setOpen?: (isOpen: boolean) => void
}

export function CommandPalette({ open, setOpen }: OpenCloseProps) {
    const router = useRouter()
    const pathname = usePathname()
    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                // @ts-ignore
                setOpen((open: boolean) => !open)
            }
        }

        document.addEventListener('keydown', down)

        return () => document.removeEventListener('keydown', down)
    }, [pathname, setOpen])

    React.useEffect(() => {
        if (setOpen) {
            setOpen(false)
        }
    }, [pathname, setOpen])

    const isDesktop = useMediaQuery('(min-width: 1024px)')

    const docsPage = docs.filter((doc) => doc.slug.indexOf('blocks') === -1)
    const data = createHierarchy(docsPage)
    const filteredNodeEntries = Object.entries(data).sort(([a], [b]) => {
        const order = ['getting-started', 'dark-mode', 'components']
        return order.indexOf(a) - order.indexOf(b)
    })

    const blocksPage = docs
        .filter((doc) => doc.slug.indexOf('blocks') !== -1)
        .map((doc) => ({
            order: doc.order,
            slug: doc.slugAsParams,
            title: doc.title
        }))

    return (
        <Command isOpen={open} onOpenChange={setOpen}>
            <Command.Input autoFocus={isDesktop} placeholder='Quick search...' />
            <Command.List>
                <Command.Section separator heading='Pages'>
                    <Command.Item value='home' asChild>
                        <Link href='/'>
                            <IconHome /> Home
                        </Link>
                    </Command.Item>
                    <Command.Item value='documenation' asChild>
                        <Link href='/docs/getting-started/installation'>
                            <IconPackage /> Components
                        </Link>
                    </Command.Item>
                    <Command.Item value='components' asChild>
                        <Link href='/blocks'>
                            <IconTemplate /> Blocks
                        </Link>
                    </Command.Item>
                    <Command.Item value='icons' asChild>
                        <Link href='/icons'>
                            <IconShapes2 /> Icons
                        </Link>
                    </Command.Item>
                    <Command.Item value='colors' asChild>
                        <Link href='/colors'>
                            <IconColorSwatch /> Colors
                        </Link>
                    </Command.Item>
                    <Command.Item value='themes' asChild>
                        <Link href='/themes'>
                            <IconPaint /> Themes
                        </Link>
                    </Command.Item>
                </Command.Section>

                {filteredNodeEntries.map(([key, value]) => (
                    <React.Fragment key={key}>
                        <Command.Section
                            key={`${key}-section`}
                            heading={key !== 'components' ? titleCase(key) : undefined}
                        >
                            {Object.entries(value as HierarchyNode).map(
                                ([subKey, subValue]) =>
                                    typeof subValue === 'object' &&
                                    'title' in subValue ? (
                                        <Command.Item
                                            value={titleCase(
                                                key + ' ' + (subValue as Doc).title
                                            )}
                                            className='pl-[2rem] flex justify-between items-center'
                                            key={`${key}-${subKey}`}
                                            onSelect={() =>
                                                router.push(`/${subValue.slug}`)
                                            }
                                        >
                                            {titleCase((subValue as Doc).title)}
                                        </Command.Item>
                                    ) : null
                            )}
                        </Command.Section>

                        {Object.entries(value as HierarchyNode).map(
                            ([subKey, subValue]) =>
                                typeof subValue === 'object' &&
                                'title' in subValue ? null : (
                                    <Command.Section
                                        key={`${key}-${subKey}-section`}
                                        value={titleCase(subKey)}
                                        heading={titleCase(subKey)}
                                    >
                                        {Object.entries(subValue as HierarchyNode).map(
                                            ([childKey, childValue]) =>
                                                typeof childValue === 'object' &&
                                                'title' in childValue ? (
                                                    <Command.Item
                                                        className='justify-between'
                                                        value={
                                                            childValue.title ===
                                                            'Text Field'
                                                                ? 'Text Field Input'
                                                                : titleCase(
                                                                      subKey +
                                                                          ' ' +
                                                                          (
                                                                              childValue as Doc
                                                                          ).title
                                                                  )
                                                        }
                                                        key={`${key}-${subKey}-${childKey}`}
                                                        onSelect={() =>
                                                            router.push(
                                                                `/${childValue.slug}`
                                                            )
                                                        }
                                                    >
                                                        {titleCase(
                                                            (childValue as Doc).title
                                                        )}
                                                    </Command.Item>
                                                ) : null
                                        )}
                                    </Command.Section>
                                )
                        )}
                    </React.Fragment>
                ))}
                <Command.Section heading='Blocks' separator={false}>
                    {blocksPage.map((block) => (
                        <Command.Item
                            key={block.slug}
                            value={block.title}
                            onSelect={() => router.push(`/blocks/${block.slug}`)}
                        >
                            {block.title}
                        </Command.Item>
                    ))}
                </Command.Section>
            </Command.List>
        </Command>
    )
}
