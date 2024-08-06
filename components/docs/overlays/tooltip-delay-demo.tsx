'use client'

import { GithubLogo } from '@/components/logo'
import { buttonVariants, Tooltip } from 'ui'

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
                    <GithubLogo />
                </Tooltip.Trigger>
                <Tooltip.Content>Follow me on Github @dq-alhq</Tooltip.Content>
            </Tooltip>
        </div>
    )
}
