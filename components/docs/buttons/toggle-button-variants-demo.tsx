'use client'

import { IconCircle, IconCircleX, IconSquare } from 'cleon-icons'
import { Toggle } from 'ui'

export default function ToggleButtonDemo() {
    return (
        <div className='flex justify-center items-center flex-col gap-2'>
            <div className='flex flex-row gap-2'>
                <Toggle size='xs'>
                    {({ isSelected }) => <>Extra Small is {isSelected ? 'on' : 'off'}</>}
                </Toggle>
                <Toggle size='sm'>
                    {({ isSelected }) => <>Small is {isSelected ? 'on' : 'off'}</>}
                </Toggle>
                <Toggle size='md'>
                    {({ isSelected }) => <>Medium is {isSelected ? 'on' : 'off'}</>}
                </Toggle>
                <Toggle size='lg'>
                    {({ isSelected }) => <>Large is {isSelected ? 'on' : 'off'}</>}
                </Toggle>
                <Toggle size='icon'>
                    {({ isSelected }) => (
                        <>{isSelected ? <IconCircleX /> : <IconCircle />}</>
                    )}
                </Toggle>
            </div>
            <div className='flex flex-row gap-2'>
                <Toggle>
                    {({ isSelected }) => <>Unstyled is {isSelected ? 'on' : 'off'}</>}
                </Toggle>
                <Toggle variant='ghost'>
                    {({ isSelected }) => <>Ghost is {isSelected ? 'on' : 'off'}</>}
                </Toggle>
                <Toggle variant='outline'>
                    {({ isSelected }) => <>Outline is {isSelected ? 'on' : 'off'}</>}
                </Toggle>
                <Toggle variant='solid'>
                    {({ isSelected }) => <>Solid is {isSelected ? 'on' : 'off'}</>}
                </Toggle>
            </div>
            <div className='flex flex-row gap-2'>
                <Toggle shape='square'>
                    {({ isSelected }) => (
                        <>
                            <IconSquare /> is {isSelected ? 'on' : 'off'}
                        </>
                    )}
                </Toggle>
                <Toggle shape='circle'>
                    {({ isSelected }) => (
                        <>
                            <IconCircle /> is {isSelected ? 'on' : 'off'}
                        </>
                    )}
                </Toggle>
            </div>
        </div>
    )
}
