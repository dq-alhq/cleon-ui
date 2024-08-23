'use client'

import * as React from 'react'

import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react'
import { IconChevronLeft, IconChevronRight } from 'justd-icons'
import {
    ListBox,
    ListBoxItem,
    Section,
    type ListBoxItemProps,
    type SectionProps
} from 'react-aria-components'

import { cn } from '@/lib/utils'
import { Button, type ButtonProps } from './button'

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselContextProps = {
    carouselRef: ReturnType<typeof useEmblaCarousel>[0]
    api: ReturnType<typeof useEmblaCarousel>[1]
    scrollPrev: () => void
    scrollNext: () => void
    canScrollPrev: boolean
    canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

const useCarousel = () => {
    const context = React.useContext(CarouselContext)

    if (!context) {
        throw new Error('useCarousel must be used within a <Carousel />')
    }

    return context
}

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
    opts?: CarouselOptions
    plugins?: CarouselPlugin
    orientation?: 'horizontal' | 'vertical'
    setApi?: (api: CarouselApi) => void
}

const Carousel = ({
    orientation = 'horizontal',
    opts,
    setApi,
    plugins,
    className,
    children,
    ...props
}: CarouselProps) => {
    const [carouselRef, api] = useEmblaCarousel(
        {
            ...opts,
            axis: orientation === 'horizontal' ? 'x' : 'y'
        },
        plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const onSelect = React.useCallback((api: CarouselApi) => {
        if (!api) {
            return
        }

        setCanScrollPrev(api.canScrollPrev())
        setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => {
        api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
        api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
            if (event.key === 'ArrowLeft') {
                event.preventDefault()
                scrollPrev()
            } else if (event.key === 'ArrowRight') {
                event.preventDefault()
                scrollNext()
            }
        },
        [scrollPrev, scrollNext]
    )

    React.useEffect(() => {
        if (!api || !setApi) {
            return
        }

        setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
        if (!api) {
            return
        }

        onSelect(api)
        api.on('reInit', onSelect)
        api.on('select', onSelect)

        return () => {
            api?.off('select', onSelect)
        }
    }, [api, onSelect])

    return (
        <CarouselContext.Provider
            value={{
                carouselRef,
                api: api,
                opts,
                orientation:
                    orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
                scrollPrev,
                scrollNext,
                canScrollPrev,
                canScrollNext
            }}
        >
            <div
                onKeyDownCapture={handleKeyDown}
                className={cn('relative', className)}
                role='region'
                aria-roledescription='carousel'
                {...props}
            >
                {children}
            </div>
        </CarouselContext.Provider>
    )
}

const CarouselContent = <T extends object>({ className, ...props }: SectionProps<T>) => {
    const { carouselRef, orientation } = useCarousel()

    return (
        <ListBox
            layout={orientation === 'vertical' ? 'stack' : 'grid'}
            aria-label='Slides'
            orientation={orientation}
            ref={carouselRef}
            className='overflow-hidden'
        >
            <Section
                className={cn(
                    'flex',
                    orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
                    className
                )}
                {...props}
            />
        </ListBox>
    )
}

const CarouselItem = ({ className, ...props }: ListBoxItemProps) => {
    const { orientation } = useCarousel()

    return (
        <ListBoxItem
            aria-label={`Slide ${props.id}`}
            aria-roledescription='slide'
            className={cn(
                'min-w-0 shrink-0 focus:outline-none grow-0 basis-full focus-visible:outline-none',
                orientation === 'horizontal' ? 'pl-4' : 'pt-4',
                className
            )}
            {...props}
        />
    )
}

const CarouselHandler = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const { orientation } = useCarousel()
    return (
        <div
            ref={ref}
            className={cn(
                'mt-6 z-20 relative flex items-center gap-x-2',
                orientation === 'horizontal' ? 'justify-end' : 'justify-center',
                className
            )}
            {...props}
        />
    )
})
CarouselHandler.displayName = 'CarouselHandler'

const CarouselButton = ({
    slot,
    className,
    variant = 'outline',
    shape = 'circle',
    size = 'icon',
    ...props
}: ButtonProps & { slot: 'previous' | 'next' }) => {
    const { orientation, scrollPrev, canScrollPrev, scrollNext, canScrollNext } =
        useCarousel()
    const isNext = slot === 'next'
    const canScroll = isNext ? canScrollNext : canScrollPrev
    const scroll = isNext ? scrollNext : scrollPrev
    const Icon = isNext ? IconChevronRight : IconChevronLeft

    return (
        <Button
            aria-label={isNext ? 'Next slide' : 'Previous slide'}
            slot={slot}
            variant={variant}
            size={size}
            shape={shape}
            className={cn(orientation === 'vertical' ? 'rotate-90' : '', className)}
            isDisabled={!canScroll}
            onPress={scroll}
            {...props}
        >
            <Icon className='size-4' />
        </Button>
    )
}

Carousel.Button = CarouselButton
Carousel.Content = CarouselContent
Carousel.Handler = CarouselHandler
Carousel.Item = CarouselItem

export { Carousel, type CarouselApi }
