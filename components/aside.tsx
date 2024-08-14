'use client'

import React from 'react'

import { type Docs, docs } from '#site/content'
import { cn, sortDocs, titleCase } from '@/lib/utils'
import { LayoutGroup, motion } from 'framer-motion'
import { BoxIcon, EclipseIcon, KeyRoundIcon } from 'lucide-react'
import type { LinkProps as NextLinkProps } from 'next/link'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Accordion } from 'ui'

export interface Doc {
    slug: string
    title: string
}

export interface HierarchyNode {
    [key: string]: HierarchyNode | Doc
}

export const createHierarchy = (docs: Array<Docs>): HierarchyNode => {
    const hierarchy: HierarchyNode = {}

    sortDocs(docs).forEach((doc) => {
        const parts = doc.slug.split('/').slice(1)
        let currentLevel = hierarchy

        parts.forEach((part, index) => {
            if (index === parts.length - 1) {
                // @ts-ignore
                currentLevel[part] = doc
            } else {
                if (!currentLevel[part]) {
                    currentLevel[part] = {}
                }
                currentLevel = currentLevel[part] as HierarchyNode
            }
        })
    })

    return hierarchy
}

const renderHierarchy = (node: HierarchyNode, defaultValues: string[]) => {
    const filteredNodeEntries = Object.entries(node).sort(([a], [b]) => {
        const order = ['getting-started', 'dark-mode', 'components']
        return order.indexOf(a) - order.indexOf(b)
    })
    return (
        <Accordion
            defaultExpandedKeys={['getting-started', 'components']}
            className='w-full [&_.accordion-content]:p-0 [&_.accordion-item]:p-0 [&_.accordion-item]:border-none'
        >
            {filteredNodeEntries.map(([key, value]) => (
                <Accordion.Item key={key} currentId={key}>
                    <Trigger className='text-foreground group-data-[open=true]:text-primary'>
                        {key === 'getting-started' ? (
                            <KeyRoundIcon className='aside-icon' />
                        ) : key === 'dark-mode' ? (
                            <EclipseIcon className='aside-icon' />
                        ) : (
                            <BoxIcon className='aside-icon' />
                        )}
                        {titleCase(key)}
                    </Trigger>
                    <Accordion.Content className='py-0'>
                        {typeof value === 'object' && 'title' in value ? (
                            <AsideLink href={`/${(value as Doc).slug}`}>
                                {titleCase((value as Doc).title)}
                            </AsideLink>
                        ) : (
                            <Accordion
                                defaultExpandedKeys={defaultValues}
                                className='w-full relative'
                            >
                                <div className='h-full absolute left-0 bg-border w-px ml-2' />
                                {Object.entries(value as HierarchyNode).map(
                                    ([subKey, subValue]) =>
                                        typeof subValue === 'object' &&
                                        'title' in subValue ? (
                                            <AsideLink
                                                className='pl-8 flex justify-between items-center'
                                                key={subKey}
                                                href={`/${subValue.slug}`}
                                            >
                                                {(subValue as Doc).title}
                                            </AsideLink>
                                        ) : (
                                            <Accordion.Item
                                                key={subKey}
                                                currentId={subKey}
                                                className='[&[data-open]_.ex]:text-danger'
                                            >
                                                <Trigger className='pl-8'>
                                                    {titleCase(subKey)}
                                                </Trigger>
                                                <Accordion.Content className='py-0'>
                                                    {Object.entries(
                                                        subValue as HierarchyNode
                                                    ).map(([childKey, childValue]) =>
                                                        typeof childValue === 'object' &&
                                                        'title' in childValue ? (
                                                            <AsideLink
                                                                className={cn(
                                                                    'ml-[0rem] flex justify-between items-center pl-[3rem]',
                                                                    defaultValues.length >
                                                                        0 && 'aside-link'
                                                                )}
                                                                key={childKey}
                                                                href={`/${childValue.slug}`}
                                                                indicatorClassName=''
                                                            >
                                                                {titleCase(
                                                                    (childValue as Doc)
                                                                        .title
                                                                )}
                                                            </AsideLink>
                                                        ) : null
                                                    )}
                                                </Accordion.Content>
                                            </Accordion.Item>
                                        )
                                )}
                            </Accordion>
                        )}
                    </Accordion.Content>
                </Accordion.Item>
            ))}
        </Accordion>
    )
}

export const Aside = () => {
    const pathname = usePathname()
    const id = React.useId()
    const docsPage = docs.filter((doc) => doc.slug.indexOf('blocks') === -1)

    const hierarchicalDocs = createHierarchy(docsPage)

    const computeDefaultValuesFromURL = (): string[] => {
        const pathParts = pathname.split('/').filter(Boolean)
        const relevantKey = pathParts[2]
        if (relevantKey) {
            return [relevantKey]
        }
        return []
    }

    const defaultValues = computeDefaultValuesFromURL()

    React.useEffect(() => {
        const activeElement = document.querySelector('.aside-link')

        if (activeElement) {
            activeElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
        }
    }, [])
    return (
        <LayoutGroup id={id}>
            <aside>{renderHierarchy(hierarchicalDocs, defaultValues)}</aside>
        </LayoutGroup>
    )
}

const Trigger = ({
    children,
    className
}: {
    children: React.ReactNode
    className?: string
}) => {
    return (
        <Accordion.Trigger
            className={cn(
                'pt-0 py-1.5 outline-0 outline-offset-0 font-normal px lg:text-sm',
                className
            )}
        >
            {children}
        </Accordion.Trigger>
    )
}

interface AsideLinkProps extends NextLinkProps {
    active?: boolean
    children: React.ReactNode
    className?: string
    indicatorClassName?: string
}

function AsideLink({
    indicatorClassName,
    className,
    children,
    active,
    ...props
}: AsideLinkProps) {
    const pathname = usePathname()
    const isActive = pathname === props.href
    return (
        <Link
            data-active={isActive}
            className={cn(
                'relative block rounded-md px-2.5 py-2 text-base font-medium transition-colors hover:text-primary focus:outline-none focus-visible:text-primary lg:text-sm',
                isActive ? 'text-primary' : 'text-foreground',
                className
            )}
            {...props}
        >
            {children}
            {isActive && (
                <motion.span
                    layoutId='current-indicator-sidebar'
                    className={cn(
                        'absolute inset-y-0 left-1.5 w-0.5 rounded-full bg-accent',
                        indicatorClassName
                    )}
                />
            )}
        </Link>
    )
}
