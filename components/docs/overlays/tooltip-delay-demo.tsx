'use client'

import { IconBrandGithub } from 'justd-icons'

import { buttonVariants, Tooltip } from '@/components/ui'

export default function TooltipDelayDemo() {
    return (
        <div className='flex gap-2'>
            <Tooltip delay={0}>
                <Tooltip.Trigger
                    aria-label='Follow My Twitter'
                    className={buttonVariants({
                        variant: 'outline',
                        size: 'icon'
                    })}
                >
                    <IconBrandGithub />
                </Tooltip.Trigger>
                <Tooltip.Content>Follow me on Github @dq-alhq</Tooltip.Content>
            </Tooltip>
        </div>
    )
}
