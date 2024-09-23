import { Hero } from '@/app/(docs)/icons/hero'

import ListIcons from './controller/list-icons'
import SearchIcon from './controller/search-icon'
import SelectColor from './controller/select-color'
import SelectSize from './controller/select-size'
import SelectStroke from './controller/select-stroke'

export default async function IconsPage({
    searchParams
}: {
    searchParams: {
        q?: string
        s?: string
        stroke?: string
        c?: string
        category?: string
    }
}) {
    const size = searchParams.s || '5'
    const stroke = searchParams.stroke || '2'
    const query = searchParams.q || ''
    const color = searchParams.c || '#52525b'
    const category = searchParams.category || 'all'
    return (
        <main className='min-h-screen flex flex-col'>
            <Hero />
            <div className='rounded-b-lg w-full bg-background/60 backdrop-blur-xl sticky top-12 lg:top-14 py-6 z-10'>
                <div className='container flex flex-col-reverse sm:flex-row gap-3 justify-between items-center '>
                    <SearchIcon />
                    <div className='flex gap-2 items-center w-full sm:w-auto'>
                        <SelectColor />
                        <SelectStroke />
                        <SelectSize />
                    </div>
                </div>
            </div>
            <div className='container py-4 flex w-full flex-col lg:flex-row gap-8 items-start'>
                <ListIcons
                    category={category}
                    color={color}
                    size={size}
                    stroke={stroke}
                    query={query}
                />
            </div>
        </main>
    )
}
