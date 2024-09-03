'use client'

import * as React from 'react'

import { Button } from 'react-aria-components'

import { Card, Carousel, type CarouselApi } from '@/components/ui'
import { cn } from '@/lib/utils'

export default function CarouselDApiDemo() {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)
        api.on('select', () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    const handleSelect = (index: number) => {
        if (api) {
            api.scrollTo(index)
            setCurrent(index + 1)
        }
    }

    return (
        <Carousel setApi={setApi} className='w-full max-w-sm'>
            <Carousel.Content
                items={Array.from({ length: 10 }, (_, id) => ({ id: id + 1 }))}
            >
                {({ id }) => (
                    <Carousel.Item id={id}>
                        <Card>
                            <Card.Content className='flex aspect-square items-center justify-center p-6'>
                                <span className='text-4xl font-semibold'>{id}</span>
                            </Card.Content>
                        </Card>
                    </Carousel.Item>
                )}
            </Carousel.Content>
            <div className='flex justify-between mt-4 items-center'>
                <div className='py-2 gap-1 flex text-center text-sm text-muted-foreground'>
                    {Array.from({ length: 10 }).map((_, index) => (
                        <Button
                            className={cn(
                                'focus:outline-none transition rounded-xl',
                                current === index + 1
                                    ? 'w-5 h-3 transition-all bg-primary hover:bg-primary/80'
                                    : 'bg-foreground/10 hover:bg-foreground/15 w-3 h-3'
                            )}
                            aria-label={`Slide ${current} of ${count}`}
                            onPress={() => handleSelect(index)}
                            key={index}
                        />
                    ))}
                </div>

                <div className='space-x-2'>
                    <Carousel.Button slot='previous' />
                    <Carousel.Button slot='next' />
                </div>
            </div>
        </Carousel>
    )
}
