'use client'

import * as React from 'react'

import { IconChevronDown } from 'justd-icons'

import { ShowMore } from '@/components/ui'

export default function ShowMoreControlledDemo() {
    const [isExpanded, setIsExpanded] = React.useState(false)
    return (
        <div className='py-6'>
            <ShowMore onChange={setIsExpanded} isSelected={isExpanded}>
                {isExpanded ? 'Expand' : 'Collapse'}
                <IconChevronDown
                    className={`${isExpanded ? 'rotate-180' : ''} size-4 transition-transform duration-200`}
                />
            </ShowMore>
        </div>
    )
}
