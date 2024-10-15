'use client'

import type { FC, SVGProps } from 'react'

import {
    IconBell,
    IconBrandAdobe,
    IconBrandAstro,
    IconBrandCleon,
    IconBrandEmbla,
    IconBrandFramer,
    IconBrandGithub,
    IconBrandInertia,
    IconBrandLaravel,
    IconBrandNextjs,
    IconBrandRemix,
    IconBrandTailwind,
    IconBrandVite,
    IconChartBar,
    IconCommand
} from 'cleon-icons'
import { Menu, MenuItem } from 'react-aria-components'
import { buttonVariants } from 'ui'

import { cn } from '@/lib/utils'

const IconTiptap = ({...props}) => (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 22 22' fill='none' {...props}>
        <path
            d='M10.9999 0C8.97378 0 7.07561 0.547792 5.44543 1.50334C5.11704 1.69583 4.97302 2.12364 5.25193 2.38269C5.49733 2.61062 5.82611 2.75 6.18743 2.75H15.8123C16.1737 2.75 16.5024 2.61062 16.7478 2.38269C17.0267 2.12364 16.8827 1.69583 16.5543 1.50334C14.9242 0.547792 13.026 0 10.9999 0Z'
            fill='currentColor'
        ></path>
        <path
            d='M21.9998 11C21.9998 10.2406 21.3842 9.625 20.6248 9.625H1.37499C0.615588 9.625 0 10.2406 0 11C0 11.7594 0.615588 12.375 1.37499 12.375H20.6248C21.3842 12.375 21.9998 11.7594 21.9998 11Z'
            fill='currentColor'
        ></path>
        <path
            d='M16.7478 19.6173C17.0267 19.8764 16.8827 20.3042 16.5543 20.4967C14.9242 21.4522 13.026 22 10.9999 22C8.97378 22 7.0756 21.4522 5.44542 20.4967C5.11704 20.3042 4.97302 19.8764 5.25192 19.6173C5.49732 19.3894 5.8261 19.25 6.18743 19.25H15.8123C16.1737 19.25 16.5024 19.3894 16.7478 19.6173Z'
            fill='currentColor'
        ></path>
        <path
            d='M1.37499 6.1875C1.37499 5.42809 1.99057 4.8125 2.74997 4.8125H19.2498C20.0092 4.8125 20.6248 5.42809 20.6248 6.1875C20.6248 6.94691 20.0092 7.5625 19.2498 7.5625H2.74997C1.99057 7.5625 1.37499 6.94691 1.37499 6.1875Z'
            fill='currentColor'
        ></path>
        <path
            d='M1.37499 15.8125C1.37499 15.0531 1.99057 14.4375 2.74997 14.4375H19.2498C20.0092 14.4375 20.6248 15.0531 20.6248 15.8125C20.6248 16.5719 20.0092 17.1875 19.2498 17.1875H2.74997C1.99057 17.1875 1.37499 16.5719 1.37499 15.8125Z'
            fill='currentColor'
        ></path>
    </svg>
)

export function DocRefs({ references }: any) {
    const urls = references.map((url: string) => {
        let title = ''
        let icon: FC<SVGProps<SVGSVGElement>>

        switch (true) {
            case url.includes('react-spectrum'):
                title = 'Props Reference'
                icon = IconBrandAdobe
                break
            case url.includes('laravel'):
                title = 'Laravel'
                icon = IconBrandLaravel
                break
            case url.includes('vite'):
                title = 'Vite'
                icon = IconBrandVite
                break
            case url.includes('inertia'):
                title = 'Inertia.Js'
                icon = IconBrandInertia
                break
            case url.includes('recharts'):
                title = 'Recharts'
                icon = IconChartBar
                break
            case url.includes('remix.run'):
                title = 'Remix'
                icon = IconBrandRemix
                break
            case url.includes('nextjs'):
                title = 'Next.Js'
                icon = IconBrandNextjs
                break
            case url.includes('astro'):
                title = 'Astro'
                icon = IconBrandAstro
                break
            case url.includes('cleon'):
                title = 'Cleon Icons'
                icon = IconBrandCleon
                break
            case url.includes('framer'):
                title = 'Framer Motion'
                icon = IconBrandFramer
                break
            case url.includes('docs/components'):
                title = 'Internal'
                icon = IconBrandCleon
                break
            case url.includes('tailwind'):
                title = 'Tailwind CSS'
                icon = IconBrandTailwind
                break
            case url.includes('github'):
                title = 'Github'
                icon = IconBrandGithub
                break
            case url.includes('cmdk'):
                title = 'CMDK'
                icon = IconCommand
                break
            case url.includes('sonner'):
                title = 'Sonner'
                icon = IconBell
                break
            case url.includes('embla'):
                title = 'Embla Carousel'
                icon = IconBrandEmbla
                break
            case url.includes('tiptap'):
                title = 'Tiptap'
                icon = IconTiptap
                break
            default:
                icon = () => null
        }

        return {
            url,
            title,
            icon
        }
    })

    return (
        <Menu
            className='not-prose flex gap-x-2'
            aria-label='Link References'
            items={urls}
        >
            {(item: any) => (
                <MenuItem
                    target='_blank'
                    className={cn(
                        buttonVariants({
                            variant: 'outline',
                            size: 'sm',
                            className: 'focus:outline-0'
                        })
                    )}
                    id={item.url}
                    href={item.url}
                >
                    <item.icon />
                    {item.title === 'Props Reference' ? (
                        <span>
                            Props <span className='hidden sm:inline'>Reference</span>
                        </span>
                    ) : (
                        <span>{item.title}</span>
                    )}
                </MenuItem>
            )}
        </Menu>
    )
}
