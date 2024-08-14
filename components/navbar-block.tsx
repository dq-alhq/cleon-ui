'use client'

import { docs } from '#site/content'
import { usePathname } from 'next/navigation'
import { NavLink } from './navbar'

export interface Doc {
    slug: string
    title: string
}

export interface HierarchyNode {
    [key: string]: HierarchyNode | Doc
}
export default function NavbarBlock() {
    const blocksPage = docs
        .filter((doc) => doc.slug.indexOf('blocks') !== -1)
        .map((doc) => ({
            order: doc.order,
            slug: doc.slugAsParams,
            title: doc.title
        }))
    const pathname = usePathname()
    return (
        <nav className='w-full h-[53px] border-b overflow-x-auto overflow-y-hidden no-scrollbar'>
            <div className='mx-auto max-w-screen-xl px-4 w-full flex items-center gap-6'>
                {blocksPage.map((doc) => (
                    <NavLink
                        key={doc.order}
                        href={doc.slug}
                        isActive={pathname.indexOf(doc.slug) !== -1}
                    >
                        {doc.title}
                    </NavLink>
                ))}
            </div>
        </nav>
    )
}
