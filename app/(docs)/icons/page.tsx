import { IconBrandFigma, IconBrandGithub } from 'cleon-icons'
import { Link } from 'ui'

import { DocInstallDeps } from '@/components/doc-install-deps'
import IconPageHeader from '@/components/icon-page-header'

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
            <div className='pt-10 lg:pt-24 flex container justify-between'>
                <div>
                    <IconPageHeader />
                    <div className='mt-8 flex sm:h-14 items-center gap-2 flex-col sm:flex-row'>
                        <DocInstallDeps
                            className='max-w-sm'
                            withMessage={false}
                            items={['cleon-icons']}
                        />
                        <Link
                            target='_blank'
                            className='text-dark-foreground focus:outline-none bg-dark w-full sm:w-auto flex px-6 gap-3 justify-center items-center h-12 rounded-lg border border-border font-semibold transition hover:ring hover:ring-dark/40 shadow-sm outline-none'
                            href='https://github.com/dq-alhq/cleon-icons'
                        >
                            <IconBrandGithub className='size-5' />
                            Source
                        </Link>
                        <Link
                            target='_blank'
                            className='text-foreground focus:outline-none bg-background w-full sm:w-auto flex px-6 gap-3 justify-center items-center h-12 rounded-lg border border-border font-semibold transition hover:ring hover:ring-foreground/40 shadow-sm outline-none'
                            href='https://www.figma.com/design/LyFwmlkNXFWIkCUMvxTLQm/Cleon-UI-Icons?m=auto&t=9IvlYFDBF75mOpKf-6'
                        >
                            <IconBrandFigma className='size-5 [&_*]:stroke-1' />
                            Figma
                        </Link>
                    </div>
                </div>
            </div>
            <div className='container rounded-b-lg bg-background/60 backdrop-blur-xl flex flex-col-reverse sm:flex-row gap-3 justify-between items-center sticky top-12 lg:top-14 py-6 z-10'>
                <SearchIcon />
                <div className='flex gap-2 items-center w-full sm:w-auto'>
                    <SelectColor />
                    <SelectStroke />
                    <SelectSize />
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
