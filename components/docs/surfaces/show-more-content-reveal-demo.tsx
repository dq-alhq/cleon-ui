'use client'

import Image from 'next/image'

import { ContentReveal } from '@/components/ui'

export default function ShowMoreContentRevealDemo() {
    return (
        <ContentReveal>
            <Image
                className='rounded-xl'
                src='https://picsum.photos/1920/1080'
                alt='Image'
                width={1920}
                height={1080}
            />
        </ContentReveal>
    )
}
