'use client'

import Image from 'next/image'

import { Carousel } from '@/components/ui'

export default function CarouselDemo() {
    return (
        <Carousel className='w-full [&_.card]:h-56 [&_.card]:overflow-hidden [&_.card]:flex [&_.card]:flex-col max-w-xs'>
            <Carousel.Content>
                <Carousel.Item className='basis-1/2'>
                    <Image
                        className='rounded-xl'
                        src='https://picsum.photos/id/61/512/512'
                        alt='image 1'
                        width={400}
                        height={300}
                    />
                </Carousel.Item>
                <Carousel.Item className='basis-1/2'>
                    <Image
                        className='rounded-xl'
                        src='https://picsum.photos/id/62/512/512'
                        alt='image 2'
                        width={400}
                        height={300}
                    />
                </Carousel.Item>
                <Carousel.Item className='basis-1/2'>
                    <Image
                        className='rounded-xl'
                        src='https://picsum.photos/id/63/512/512'
                        alt='image 3'
                        width={400}
                        height={300}
                    />
                </Carousel.Item>
                <Carousel.Item className='basis-1/2'>
                    <Image
                        className='rounded-xl'
                        src='https://picsum.photos/id/64/512/512'
                        alt='image 4'
                        width={400}
                        height={300}
                    />
                </Carousel.Item>
                <Carousel.Item className='basis-1/2'>
                    <Image
                        className='rounded-xl'
                        src='https://picsum.photos/id/65/512/512'
                        alt='image 5'
                        width={400}
                        height={300}
                    />
                </Carousel.Item>
                <Carousel.Item className='basis-1/2'>
                    <Image
                        className='rounded-xl'
                        src='https://picsum.photos/id/66/512/512'
                        alt='image 6'
                        width={400}
                        height={300}
                    />
                </Carousel.Item>
                <Carousel.Item className='basis-1/2'>
                    <Image
                        className='rounded-xl'
                        src='https://picsum.photos/id/67/512/512'
                        alt='image 7'
                        width={400}
                        height={300}
                    />
                </Carousel.Item>
            </Carousel.Content>

            <Carousel.Handler>
                <Carousel.Button slot='previous' />
                <Carousel.Button slot='next' />
            </Carousel.Handler>
        </Carousel>
    )
}
