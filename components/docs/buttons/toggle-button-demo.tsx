'use client'

import { Toggle } from 'ui'

export default function ToggleButtonDemo() {
    return (
        <div className='flex gap-2'>
            <Toggle>{({ isSelected }) => <>{isSelected ? 'Unpin' : 'Pin'}</>}</Toggle>
            <Toggle variant='ghost'>
                {({ isSelected }) => <>{isSelected ? 'Unpin' : 'Pin'}</>}
            </Toggle>
            <Toggle variant='outline'>
                {({ isSelected }) => <>{isSelected ? 'Unpin' : 'Pin'}</>}
            </Toggle>
            <Toggle variant='solid'>
                {({ isSelected }) => <>{isSelected ? 'Unpin' : 'Pin'}</>}
            </Toggle>
        </div>
    )
}
