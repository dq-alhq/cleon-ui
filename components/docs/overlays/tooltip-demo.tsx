'use client'

import { IconBrandFacebook, IconBrandGithub } from 'cleon-icons'

import { buttonVariants, Tooltip } from '@/components/ui'

export default function TooltipDemo() {
    return (
        <div className='flex gap-2'>
            <Tooltip>
                <Tooltip.Trigger
                    aria-label='Add My Facebook'
                    className={buttonVariants({
                        variant: 'outline',
                        size: 'icon'
                    })}
                >
                    <IconBrandFacebook className='h-4 w-4' />
                </Tooltip.Trigger>
                <Tooltip.Content>Add me on Facebook @DiqiNahdliyan</Tooltip.Content>
            </Tooltip>
            <Tooltip>
                <Tooltip.Trigger
                    aria-label='Follow My Github'
                    className={buttonVariants({
                        variant: 'outline',
                        size: 'icon'
                    })}
                >
                    <IconBrandGithub className='h-4 w-4' />
                </Tooltip.Trigger>
                <Tooltip.Content>Follow me on Github @dq-alhq</Tooltip.Content>
            </Tooltip>
        </div>
    )
}
