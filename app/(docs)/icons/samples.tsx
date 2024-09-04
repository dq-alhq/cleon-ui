'use client'

import type * as cleonicons from 'cleon-icons'
import { renderToStaticMarkup } from 'react-dom/server'

import { Icon } from '@/components/ui'
import icons from '@/lib/icons.json'
import { kebabToPascal } from '@/lib/utils'

export default function IconsList({
    query = '',
    size = 'size-5',
    stroke = '2'
}: {
    query: string
    size: 'size-4' | 'size-5' | 'size-6' | 'size-7'
    stroke: '1' | '2'
}) {
    // const [selectedCategory, setSelectedCategory] = React.useState<string>('')
    // const [filteredIcons, setFilteredIcons] = React.useState(icons)

    // React.useMemo(() => {
    //     if (query || selectedCategory !== '') {
    //         setFilteredIcons(
    //             icons
    //                 .filter(
    //                     (icon) =>
    //                         icon.name.includes(query) ||
    //                         icon.tags.some((tag) => tag.includes(query))
    //                 )
    //                 .filter(
    //                     (icon) =>
    //                         selectedCategory === '' || icon.category === selectedCategory
    //                 )
    //         )
    //     } else {
    //         setFilteredIcons(icons)
    //     }
    // }, [query, selectedCategory])

    // const categories = Array.from(
    //     new Set(filteredIcons.map((icon) => icon.category))
    // ).sort()

    return (
        <>
            {/* <div className='flex gap-2 rounded-lg border p-4 flex-col min-w-56 relative'>
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
                            selectedCategory === category && 'text-primary font-semibold'
                        )}
                        key={i}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {kebabToTitle(category)}
                    </div>
                ))}
            </div> */}
            <div className='sm:-mx-2 flex justify-around flex-wrap gap-4'>
                {icons.map((item, i) => (
                    <div
                        key={i}
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
                                .replace('stroke-width="2"', `stroke-width="${stroke}"`)
                        }}
                    />
                ))}
            </div>
        </>
    )
}
