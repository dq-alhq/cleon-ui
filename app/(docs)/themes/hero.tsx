'use client'

import { Header, Text } from 'react-aria-components'

import { Link } from '@/components/ui'

export function Hero() {
    return (
        <div className='relative isolate overflow-hidden bg-background'>
            <div
                aria-hidden='true'
                className='absolute sm:block hidden inset-x-0 -top-10 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-56'
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
                    }}
                    className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-info to-primary opacity-10 dark:opacity-[0.17] sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
                />
            </div>
            <svg
                aria-hidden='true'
                className='absolute sm:block hidden inset-0 -z-10 h-full w-full stroke-muted [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]'
            >
                <defs>
                    <pattern
                        x='50%'
                        y={-1}
                        id='0787a7c5-978c-4f66-83c7-11c213f99cb7'
                        width={200}
                        height={200}
                        patternUnits='userSpaceOnUse'
                    >
                        <path d='M.5 200V.5H200' fill='none' />
                    </pattern>
                </defs>
                <rect
                    fill='url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)'
                    width='100%'
                    height='100%'
                    strokeWidth={0}
                />
            </svg>
            <div className='pt-10 pb-6 lg:py-16 border-b'>
                <div className='container'>
                    <Header>
                        <h1 className='max-w-xl text-2xl font-bold lg:text-5xl mb-2 lg:mb-6'>
                            THEMES
                        </h1>
                        <Text className='text-base lg:text-xl max-w-2xl block leading-relaxed text-muted-foreground'>
                            You can always fully customize this UI design with your favor
                            <br />
                            head to{' '}
                            <code className='font-semibold text-primary'>.css</code> file
                            and add your own styles
                        </Text>
                        <Text className='text-base mt-2 lg:text-xl max-w-2xl block leading-relaxed text-muted-foreground'>
                            Feel free to find an inspiration from{' '}
                            <Link variant='danger' href='/colors'>
                                Colors Page
                            </Link>
                        </Text>
                    </Header>
                </div>
            </div>
        </div>
    )
}
