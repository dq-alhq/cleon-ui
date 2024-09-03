'use client'

import React from 'react'

import { motion } from 'framer-motion'
import {
    composeRenderProps,
    Slider,
    SliderOutput,
    SliderStateContext,
    SliderTrack,
    TextContext,
    type LabelProps,
    type SliderOutputProps,
    type SliderProps,
    type SliderTrackProps,
    type TextProps
} from 'react-aria-components'
import { tv, type VariantProps } from 'tailwind-variants'

import { cn } from '@/lib/utils'
import { useSlotId } from '@react-aria/utils'

import { Description, Label } from './field'

const ratingVariants = tv({
    base: 'text-transparent bg-clip-text select-none',
    variants: {
        size: {
            sm: 'text-sm',
            md: 'text-base',
            lg: 'text-lg',
            xl: 'text-xl',
            '2xl': 'text-2xl',
            '3xl': 'text-3xl',
            '4xl': 'text-4xl',
            '5xl': 'text-5xl'
        }
    },
    defaultVariants: {
        size: 'md'
    }
})

interface RatingProps extends RatingRootProps, VariantProps<typeof ratingVariants> {
    label?: LabelProps['children']
    description?: TextProps['children']
    showValue?: boolean | ((value: number[]) => string)
    shape?: 'star' | 'circle' | 'square' | 'heart' | 'triangle' | 'diamond'
}

const Rating = ({
    label,
    size,
    description,
    showValue = false,
    shape = 'star',
    maxValue = 5,
    step = 0.5,
    ...props
}: RatingProps) => {
    return (
        <RatingRoot maxValue={maxValue} step={step} {...props}>
            <div className='flex items-center justify-between w-auto gap-2'>
                {label && <Label>{label}</Label>}
                {(showValue || typeof showValue === 'function') && <RatingValueLabel />}
            </div>
            <SliderControl size={size} shape={shape} />
            {description && <Description>{description}</Description>}
        </RatingRoot>
    )
}

interface SliderControlProps
    extends SliderTrackProps,
        VariantProps<typeof ratingVariants> {
    shape?: 'star' | 'circle' | 'square' | 'heart' | 'triangle' | 'diamond'
}

const SliderControl = ({ shape = 'star', size, ...props }: SliderControlProps) => {
    const getColor = (percentage: number) => {
        if (percentage < 40) {
            return 'hsl(var(--danger))'
        }
        if (percentage < 80) {
            return 'hsl(var(--warning))'
        }
        return 'hsl(var(--success))'
    }
    const shapeCharacter = {
        star: '★',
        circle: '●',
        square: '■',
        heart: '♥',
        triangle: '▲',
        diamond: '◆'
    }
    const { values, getThumbMaxValue } = React.useContext(SliderStateContext)
    return (
        <SliderTrack
            {...props}
            className={cn(
                ratingVariants({ size }),
                'bg-muted relative flex items-center justify-start'
            )}
        >
            <motion.div
                initial={{ width: '0%', backgroundColor: getColor(0) }}
                animate={{
                    width: `${(values[0] / getThumbMaxValue(0)) * 100}%`,
                    backgroundColor: getColor((values[0] / getThumbMaxValue(0)) * 100)
                }}
                transition={{ duration: 0.4 }}
                className={cn(
                    ratingVariants({ size }),
                    'absolute left-0 top-0 flex gap-0 justify-end w-full flex-row-reverse cursor-pointer'
                )}
            >
                {Array.from({ length: getThumbMaxValue(0) }).map((_, index) => (
                    <span
                        key={index}
                        className={cn(
                            `cursor-pointer`,
                            (index / getThumbMaxValue(0)) * 100 < 40
                                ? 'hover:text-success peer-hover:text-success'
                                : (index / getThumbMaxValue(0)) * 100 < 80
                                  ? 'hover:text-warning peer-hover:text-warning'
                                  : 'hover:text-danger peer-hover:text-danger'
                        )}
                    >
                        {shapeCharacter[shape]}
                    </span>
                ))}
            </motion.div>
            {Array.from({ length: getThumbMaxValue(0) }).map((_, index) => (
                <span className='cursor-pointer' key={index}>
                    {shapeCharacter[shape]}
                </span>
            ))}
        </SliderTrack>
    )
}

interface RatingRootProps extends SliderProps {}

const RatingRoot = (props: RatingRootProps) => {
    const descriptionId = useSlotId()
    return (
        <TextContext.Provider value={{ slots: { description: { id: descriptionId } } }}>
            <Slider
                data-slot='root'
                aria-describedby={descriptionId}
                className={cn('flex flex-col gap-0 w-auto', props.className)}
                {...props}
            />
        </TextContext.Provider>
    )
}

interface RatingValueProps extends SliderOutputProps {}

const RatingValueLabel = ({ className, ...props }: RatingValueProps) => {
    return (
        <SliderOutput {...props} className='text-muted-foreground text-sm'>
            {composeRenderProps(
                props.children,
                (children, { state }) => children ?? Number(state.values[0]).toFixed(2)
            )}
        </SliderOutput>
    )
}

Rating.Root = RatingRoot
Rating.ValueLabel = RatingValueLabel

export { Rating }
