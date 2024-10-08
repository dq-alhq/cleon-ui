'use client'

import { IconAlertTriangle } from 'cleon-icons'
import { motion } from 'framer-motion'
import {
    Meter as MeterPrimitive,
    type MeterProps as AriaMeterProps
} from 'react-aria-components'

import { cn } from '@/lib/utils'

import { Label } from './field'

export interface MeterProps extends AriaMeterProps {
    label?: string
}

const Meter = ({ label, ...props }: MeterProps) => {
    return (
        <MeterPrimitive {...props} className={cn('flex flex-col gap-1', props.className)}>
            {({ percentage, valueText }) => (
                <>
                    <div className='flex w-full justify-between gap-2'>
                        <Label>{label}</Label>
                        <span
                            className={`text-sm ${percentage >= 80 ? 'text-danger' : 'text-muted-foreground'}`}
                        >
                            {percentage >= 80 && (
                                <IconAlertTriangle
                                    aria-label='Alert'
                                    className='inline-block size-4 align-text-bottom'
                                />
                            )}
                            {' ' + valueText}
                        </span>
                    </div>
                    <div className='relative h-2 min-w-64 rounded-full bg-muted outline outline-1 -outline-offset-1 outline-transparent'>
                        <motion.div
                            className='absolute left-0 top-0 h-full rounded-full forced-colors:bg-[Highlight]'
                            initial={{ width: '0%', backgroundColor: getColor(0) }}
                            animate={{
                                width: `${percentage}%`,
                                backgroundColor: getColor(percentage)
                            }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </>
            )}
        </MeterPrimitive>
    )
}

const getColor = (percentage: number) => {
    if (percentage < 30) {
        return 'hsl(var(--primary))'
    }
    if (percentage < 50) {
        return 'hsl(var(--info))'
    }
    if (percentage < 70) {
        return 'hsl(var(--success))'
    }
    if (percentage < 80) {
        return 'hsl(var(--warning))'
    }
    return 'hsl(var(--danger))'
}

export { getColor, Meter }
