'use client'

import React from 'react'

import * as cleonicons from 'cleon-icons'
import { renderToStaticMarkup } from 'react-dom/server'
import { toast } from 'sonner'

import { Button, Icon, Loader, Menu, Tooltip } from '@/components/ui'
import icons from '@/lib/icons.json'
import { cn, convertSvgToJsx, kebabToPascal, kebabToTitle } from '@/lib/utils'

export function IconsList({
    query,
    size,
    stroke
}: {
    query: string
    size: 'size-4' | 'size-5' | 'size-6' | 'size-7'
    stroke: '1' | '2'
}) {
    const [selectedCategory, setSelectedCategory] = React.useState<string>('')
    const [filteredIcons, setFilteredIcons] = React.useState(icons)

    React.useMemo(() => {
        if (query || selectedCategory !== '') {
            setFilteredIcons(
                icons
                    .filter(
                        (icon) =>
                            icon.name.includes(query) ||
                            icon.tags.some((tag) => tag.includes(query))
                    )
                    .filter(
                        (icon) =>
                            selectedCategory === '' || icon.category === selectedCategory
                    )
            )
        } else {
            setFilteredIcons(icons)
        }
    }, [query, selectedCategory])

    const categories = Array.from(
        new Set(filteredIcons.map((icon) => icon.category))
    ).sort()

    return (
        <>
            <React.Suspense
                fallback={
                    <div className='flex justify-center items-center min-h-96'>
                        <Loader />
                    </div>
                }
            >
                <div className='flex gap-2 rounded-lg border p-4 flex-col min-w-56 relative'>
                    <div className='text-xl font-bold mb-2'>
                        Categories{' '}
                        {selectedCategory !== '' && (
                            <Button
                                className='absolute top-2 right-2'
                                onPress={() => setSelectedCategory('')}
                                variant='outline'
                                size='icon'
                            >
                                <cleonicons.IconTrash className='size-4' />
                            </Button>
                        )}
                    </div>
                    {categories.map((category, i) => (
                        <div
                            className={cn(
                                'text-sm font-medium transition text-foreground hover:text-primary pressed:text-primary cursor-pointer',
                                selectedCategory === category &&
                                    'text-primary font-semibold'
                            )}
                            key={i}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {kebabToTitle(category)}
                        </div>
                    ))}
                </div>
                <div className='sm:-mx-2 flex justify-around flex-wrap gap-4'>
                    {filteredIcons.map((item, i) => (
                        <Tooltip delay={0} key={i}>
                            <Menu>
                                <Tooltip.Trigger className='bg-transparent focus:outline-none flex items-center justify-center cursor-pointer hover:bg-muted pressed:bg-primary pressed:text-primary-foreground size-10 rounded-lg'>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: renderToStaticMarkup(
                                                <Icon
                                                    icon={
                                                        kebabToPascal(
                                                            item.name
                                                        ) as keyof typeof cleonicons
                                                    }
                                                />
                                            )
                                                .replace('size-5', `${size}`)
                                                .replace(
                                                    'stroke-width="2"',
                                                    `stroke-width="${stroke}"`
                                                )
                                        }}
                                    />
                                </Tooltip.Trigger>
                                <Menu.Content showArrow>
                                    <Menu.Item
                                        onAction={() =>
                                            copySvgToClipboard({
                                                name: item.name,
                                                size: size,
                                                stroke: stroke
                                            })
                                        }
                                    >
                                        Copy SVG
                                    </Menu.Item>
                                    <Menu.Item
                                        onAction={() =>
                                            copyJsxSvgToClipboard({
                                                name: item.name,
                                                size: size,
                                                stroke: stroke
                                            })
                                        }
                                    >
                                        Copy JSX
                                    </Menu.Item>
                                    <Menu.Item
                                        onAction={() => copyJsxToClipboard(item.name)}
                                    >
                                        Copy Name
                                    </Menu.Item>
                                </Menu.Content>
                            </Menu>
                            <Tooltip.Content aria-label={item.name}>
                                {kebabToTitle(item.name).replace('Icon ', '')}
                            </Tooltip.Content>
                        </Tooltip>
                    ))}
                </div>
            </React.Suspense>
        </>
    )
}

interface IconProps {
    name: string
    size?: 'size-4' | 'size-5' | 'size-6' | 'size-7'
    stroke?: '1' | '2'
}

const copySvgToClipboard = ({ name, size, stroke }: IconProps) => {
    const svgString = renderToStaticMarkup(
        <Icon icon={kebabToPascal(name) as keyof typeof cleonicons} />
    )
    navigator.clipboard
        .writeText(
            svgString
                .replace('size-5', `${size}`)
                .replace('stroke-width="2"', `stroke-width="${stroke}"`)
        )
        .then(() => {
            toast('SVG copied to clipboard')
        })
}

const copyJsxSvgToClipboard = ({ name, size, stroke }: IconProps) => {
    const svgString = renderToStaticMarkup(
        <Icon icon={kebabToPascal(name) as keyof typeof cleonicons} />
    )
    navigator.clipboard
        .writeText(
            convertSvgToJsx(
                svgString
                    .replace('size-4', `${size}`)
                    .replace('stroke-width="2"', `stroke-width="${stroke}"`)
            )
        )
        .then(() => {
            toast('JSX copied to clipboard')
        })
}

const copyJsxToClipboard = (name: string) => {
    navigator.clipboard.writeText(`<${kebabToPascal(name)}  />`).then(() => {
        toast(`<${kebabToPascal(name)} /> copied to clipboard`)
    })
}
