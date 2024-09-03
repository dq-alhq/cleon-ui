'use client'

import { motion } from 'framer-motion'
import { ProgressBar, type ProgressBarProps } from 'react-aria-components'

import { cn } from '@/lib/utils'

import { Label } from './field'

interface ProgressProps extends ProgressBarProps {
    label?: string
}

const Progress = ({ label, ...props }: ProgressProps) => {
    return (
        <ProgressBar {...props} className={cn('flex flex-col gap-1', props.className)}>
            {({ percentage, valueText, isIndeterminate }) => (
                <>
                    <div className='flex justify-between gap-2'>
                        <Label>{label}</Label>
                        <span className='text-sm text-muted-foreground'>{valueText}</span>
                    </div>
                    <div className='relative h-2 min-w-64 overflow-hidden rounded-full bg-secondary outline outline-1 -outline-offset-1 outline-transparent'>
                        {!isIndeterminate ? (
                            <motion.div
                                className='absolute left-0 top-0 h-full rounded-full bg-primary forced-colors:bg-[Highlight]'
                                initial={{ width: '0%' }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 0.5, ease: 'easeInOut' }}
                            />
                        ) : (
                            <motion.div
                                className='absolute top-0 h-full rounded-full bg-primary forced-colors:bg-[Highlight]'
                                initial={{ left: '0%', width: '40%' }}
                                animate={{ left: ['0%', '100%', '0%'] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 2,
                                    ease: 'easeInOut'
                                }}
                            />
                        )}
                    </div>
                </>
            )}
        </ProgressBar>
    )
}

export { Progress, type ProgressProps }
