'use client'

import { Header, Text } from 'react-aria-components'

import { Link } from './ui'

export default function IconPageHeader() {
    return (
        <Header>
            <h1 className='max-w-xl text-2xl font-bold lg:text-5xl mb-2 lg:mb-6'>
                CLEON ICONS
            </h1>
            <Text className='text-base lg:text-xl max-w-2xl block leading-relaxed text-muted-foreground'>
                This UI Icon Library for Project, currently only for
                <strong className='text-foreground'> React</strong>, most of these icons
                are forked from{' '}
                <Link
                    target='_blank'
                    className='text-foreground font-semibold hover:text-primary'
                    href='https://tabler.io/icons'
                >
                    Tabler Icons
                </Link>{' '}
                and{' '}
                <Link
                    target='_blank'
                    className='text-foreground font-semibold hover:text-primary'
                    href='https://lucide.dev/icons/'
                >
                    Lucide Icons
                </Link>
            </Text>
            <Text className='text-base lg:text-xl max-w-2xl block leading-relaxed text-muted-foreground mt-4'>
                This Icon Libray used for{' '}
                <Link target='_blank' href='/'>
                    CLEON UI
                </Link>
            </Text>
        </Header>
    )
}
